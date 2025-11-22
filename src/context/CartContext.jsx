import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const CartContext = createContext();

// Use your Render backend URL
const API_BASE = 'https://pabala-backend.onrender.com/api';

const cartReducer = (state, action) => {
  console.log('🛒 Cart Action:', action.type);
  
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items || [],
        isLoading: false
      };
    
    case 'ADD_TO_CART':
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => 
        item.productId === newItem.productId && 
        item.color === newItem.color &&
        item.size === newItem.size
      );
      
      let updatedItems;
      if (existingItemIndex > -1) {
        updatedItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, newItem];
      }
      
      return {
        ...state,
        items: updatedItems
      };
    
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
      return {
        ...state,
        items: []
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    
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
  const { user, isSignedIn, isLoaded } = useUser();

  console.log('👤 User State:', { isLoaded, isSignedIn, userId: user?.id });

  // Load cart when component mounts or user changes
  useEffect(() => {
    if (!isLoaded) {
      console.log('⏳ Waiting for user to load...');
      return;
    }

    if (isSignedIn && user) {
      console.log('🔐 Loading cart for LOGGED-IN user:', user.id);
      loadUserCart();
    } else {
      console.log('👤 Loading cart for GUEST user');
      loadGuestCart();
    }
  }, [isLoaded, isSignedIn, user]);

  const loadGuestCart = () => {
    try {
      const guestCart = localStorage.getItem('guestCart');
      if (guestCart) {
        const items = JSON.parse(guestCart);
        console.log('📂 Loaded guest cart:', items.length, 'items');
        dispatch({ type: 'SET_CART', payload: { items } });
      } else {
        dispatch({ type: 'SET_CART', payload: { items: [] } });
      }
    } catch (error) {
      console.error('Error loading guest cart:', error);
      dispatch({ type: 'SET_CART', payload: { items: [] } });
    }
  };

  const loadUserCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      console.log(`📡 Fetching user cart from: ${API_BASE}/cart/${user.id}`);
      
      const response = await fetch(`${API_BASE}/cart/${user.id}`);
      console.log('📨 Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('✅ Backend response:', result);
        
        if (result.success) {
          console.log('🛒 User cart loaded:', result.items.length, 'items');
          dispatch({ type: 'SET_CART', payload: { items: result.items } });
        } else {
          console.log('⚠️ No items in user cart');
          dispatch({ type: 'SET_CART', payload: { items: [] } });
        }
      } else {
        console.error('❌ Failed to load user cart');
        loadGuestCart(); // Fallback to guest cart
      }
    } catch (error) {
      console.error('💥 Error loading user cart:', error);
      loadGuestCart(); // Fallback to guest cart
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
      quantity: quantity,
      length: product.length || ''
    };

    console.log('🛍️ Adding to cart:', item);

    // Update local state immediately
    dispatch({ type: 'ADD_TO_CART', payload: item });

    if (isSignedIn && user) {
      // Sync with backend for LOGGED-IN users
      try {
        console.log(`📡 Syncing with backend for user: ${user.id}`);
        const response = await fetch(`${API_BASE}/cart/${user.id}/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product: {
              id: product.id.toString(),
              name: product.name,
              price: parseFloat(product.price),
              image: product.image,
              category: product.category,
              length: product.length || ''
            },
            color: color || '',
            size: size || '',
            quantity: quantity,
            customColor: customColor || ''
          })
        });

        if (response.ok) {
          const result = await response.json();
          console.log('✅ Backend sync successful');
          if (result.success) {
            // Update with backend response
            dispatch({ type: 'SET_CART', payload: { items: result.items } });
          }
        } else {
          console.error('❌ Backend sync failed');
        }
      } catch (error) {
        console.error('💥 Error syncing with backend:', error);
      }
    } else {
      // Save to localStorage for GUEST users
      saveGuestCart();
    }
  };

  const removeFromCart = async (productId, color, size) => {
    console.log('🗑️ Removing from cart:', { productId, color, size });

    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { productId: productId.toString(), color: color || '', size: size || '' }
    });

    if (isSignedIn && user) {
      try {
        await fetch(`${API_BASE}/cart/${user.id}/items/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ color: color || '', size: size || '' })
        });
      } catch (error) {
        console.error('Error removing from backend:', error);
      }
    } else {
      saveGuestCart();
    }
  };

  const updateQuantity = async (productId, color, size, quantity) => {
    console.log('📊 Updating quantity:', { productId, color, size, quantity });

    if (quantity < 1) {
      removeFromCart(productId, color, size);
      return;
    }

    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId: productId.toString(), color: color || '', size: size || '', quantity }
    });

    if (isSignedIn && user) {
      try {
        await fetch(`${API_BASE}/cart/${user.id}/items/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ color: color || '', size: size || '', quantity })
        });
      } catch (error) {
        console.error('Error updating quantity in backend:', error);
      }
    } else {
      saveGuestCart();
    }
  };

  const clearCart = async () => {
    console.log('🧹 Clearing cart');

    dispatch({ type: 'CLEAR_CART' });

    if (isSignedIn && user) {
      try {
        await fetch(`${API_BASE}/cart/${user.id}/clear`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error('Error clearing cart in backend:', error);
      }
    } else {
      localStorage.removeItem('guestCart');
    }
  };

  const saveGuestCart = () => {
    if (!isSignedIn) {
      localStorage.setItem('guestCart', JSON.stringify(state.items));
    }
  };

  // Migrate guest cart to user when logging in
  useEffect(() => {
    if (isSignedIn && user) {
      const guestCart = localStorage.getItem('guestCart');
      if (guestCart) {
        console.log('🚚 Migrating guest cart to user account...');
        const guestItems = JSON.parse(guestCart);
        
        // Add each guest item to user's backend cart
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
        console.log('✅ Guest cart migrated to user account');
      }
    }
  }, [isSignedIn, user]);

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

  const value = {
    cart: state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    refreshCart: isSignedIn ? loadUserCart : loadGuestCart
  };

  return (
    <CartContext.Provider value={value}>
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