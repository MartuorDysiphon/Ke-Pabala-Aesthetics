import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const CartContext = createContext();

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload.items || [], isLoading: false };
    
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => 
        item.productId === action.payload.productId && 
        item.color === action.payload.color &&
        item.size === action.payload.size
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.productId === action.payload.productId && 
            item.color === action.payload.color &&
            item.size === action.payload.size
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => 
          !(item.productId === action.payload.productId && 
            item.color === action.payload.color &&
            item.size === action.payload.size)
        )
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.productId === action.payload.productId && 
          item.color === action.payload.color &&
          item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, items: [] };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    default:
      return state;
  }
};

const initialState = {
  items: [],
  isLoading: true
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, isSignedIn } = useUser();

  // Load cart when component mounts or user changes
  useEffect(() => {
    if (isSignedIn && user) {
      // Logged in user - load from backend
      fetchCartFromBackend();
    } else {
      // Guest user - load from localStorage
      const guestCart = localStorage.getItem('guestCart');
      if (guestCart) {
        dispatch({ type: 'SET_CART', payload: { items: JSON.parse(guestCart) } });
      } else {
        dispatch({ type: 'SET_CART', payload: { items: [] } });
      }
    }
  }, [isSignedIn, user]);

  const fetchCartFromBackend = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await fetch(`${API_BASE}/cart/${user.id}`);
      
      if (response.ok) {
        const cartData = await response.json();
        dispatch({ type: 'SET_CART', payload: cartData });
      }
    } catch (error) {
      console.log('Backend not available, using localStorage');
      const guestCart = localStorage.getItem('guestCart');
      if (guestCart) {
        dispatch({ type: 'SET_CART', payload: { items: JSON.parse(guestCart) } });
      }
    }
  };

  const addToCart = async (product, color, size, quantity = 1, customColor = '') => {
    const item = {
      productId: product.id.toString(),
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
      category: product.category,
      color: color || '',
      size: size || '',
      customColor: customColor || '',
      quantity,
      length: product.length || ''
    };

    // Update local state immediately
    dispatch({ type: 'ADD_TO_CART', payload: item });

    if (isSignedIn && user) {
      // Sync with backend
      try {
        await fetch(`${API_BASE}/cart/${user.id}/items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product, color, size, quantity, customColor })
        });
      } catch (error) {
        console.log('Backend sync failed, but item added locally');
      }
    } else {
      // Save to localStorage for guests
      const updatedItems = [...state.items];
      const existingIndex = updatedItems.findIndex(i => 
        i.productId === item.productId && i.color === color && i.size === size
      );
      
      if (existingIndex > -1) {
        updatedItems[existingIndex].quantity += quantity;
      } else {
        updatedItems.push(item);
      }
      
      localStorage.setItem('guestCart', JSON.stringify(updatedItems));
    }
  };

  const removeFromCart = async (productId, color, size) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { productId: productId.toString(), color: color || '', size: size || '' }
    });

    if (isSignedIn && user) {
      try {
        await fetch(`${API_BASE}/cart/${user.id}/items/${productId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ color, size })
        });
      } catch (error) {
        console.log('Backend sync failed');
      }
    } else {
      const updatedItems = state.items.filter(item => 
        !(item.productId === productId.toString() && item.color === color && item.size === size)
      );
      localStorage.setItem('guestCart', JSON.stringify(updatedItems));
    }
  };

  const updateQuantity = async (productId, color, size, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId: productId.toString(), color: color || '', size: size || '', quantity }
    });

    if (isSignedIn && user) {
      try {
        await fetch(`${API_BASE}/cart/${user.id}/items/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ color, size, quantity })
        });
      } catch (error) {
        console.log('Backend sync failed');
      }
    } else {
      const updatedItems = state.items.map(item => 
        item.productId === productId.toString() && item.color === color && item.size === size
          ? { ...item, quantity }
          : item
      );
      localStorage.setItem('guestCart', JSON.stringify(updatedItems));
    }
  };

  const clearCart = async () => {
    dispatch({ type: 'CLEAR_CART' });

    if (isSignedIn && user) {
      try {
        await fetch(`${API_BASE}/cart/${user.id}/clear`, { method: 'DELETE' });
      } catch (error) {
        console.log('Backend sync failed');
      }
    } else {
      localStorage.removeItem('guestCart');
    }
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      const basePrice = parseFloat(item.price);
      const customColorCost = item.customColor ? 100 : 0;
      return total + (basePrice + customColorCost) * item.quantity;
    }, 0);
  };

  // Migrate guest cart to user account when logging in
  useEffect(() => {
    if (isSignedIn && user) {
      const guestCart = localStorage.getItem('guestCart');
      if (guestCart) {
        const guestItems = JSON.parse(guestCart);
        
        // Add each item to backend
        guestItems.forEach(item => {
          addToCart(
            {
              id: item.productId,
              name: item.name,
              price: item.price,
              image: item.image,
              category: item.category,
              length: item.length
            },
            item.color,
            item.size,
            item.quantity,
            item.customColor
          );
        });
        
        // Clear guest cart
        localStorage.removeItem('guestCart');
      }
    }
  }, [isSignedIn, user]);

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};