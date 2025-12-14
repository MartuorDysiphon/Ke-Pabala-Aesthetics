import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

const CartContext = createContext();

// Storage helpers
const STORAGE_KEYS = {
  GUEST_CART: 'guest_cart',
  USER_CART_PREFIX: 'user_cart_'
};

const getGuestCart = () => {
  try {
    const cart = localStorage.getItem(STORAGE_KEYS.GUEST_CART);
    return cart ? JSON.parse(cart) : { items: [] };
  } catch {
    return { items: [] };
  }
};

const saveGuestCart = (cart) => {
  try {
    localStorage.setItem(STORAGE_KEYS.GUEST_CART, JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to save guest cart:', error);
  }
};

const getUserCartKey = (userId) => `${STORAGE_KEYS.USER_CART_PREFIX}${userId}`;

const getUserCart = (userId) => {
  try {
    const key = getUserCartKey(userId);
    const cart = localStorage.getItem(key);
    return cart ? JSON.parse(cart) : { items: [] };
  } catch {
    return { items: [] };
  }
};

const saveUserCart = (userId, cart) => {
  try {
    const key = getUserCartKey(userId);
    localStorage.setItem(key, JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to save user cart:', error);
  }
};

const clearGuestCart = () => {
  localStorage.removeItem(STORAGE_KEYS.GUEST_CART);
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload.items || [] };
    
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && 
        item.color === action.payload.color &&
        item.size === action.payload.size
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && 
            item.color === action.payload.color &&
            item.size === action.payload.size
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => 
          !(item.id === action.payload.id && 
            item.color === action.payload.color &&
            item.size === action.payload.size)
        )
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && 
          item.color === action.payload.color &&
          item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, items: [] };
    
    default:
      return state;
  }
};

const initialState = {
  items: [],
  isLoading: false
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { userId, isSignedIn } = useAuth();

  // Load cart on mount and when auth state changes
  useEffect(() => {
    const loadCart = () => {
      if (isSignedIn && userId) {
        // Load user cart
        const userCart = getUserCart(userId);
        dispatch({ type: 'SET_CART', payload: { items: userCart.items } });
      } else {
        // Load guest cart
        const guestCart = getGuestCart();
        dispatch({ type: 'SET_CART', payload: { items: guestCart.items } });
      }
    };

    loadCart();
  }, [isSignedIn, userId]);

  // Save cart when items change
  useEffect(() => {
    if (isSignedIn && userId) {
      saveUserCart(userId, { items: state.items });
    } else {
      saveGuestCart({ items: state.items });
    }
  }, [state.items, isSignedIn, userId]);

  // Migrate guest cart to user cart
  const migrateGuestCart = () => {
    if (!isSignedIn || !userId) return;

    const guestCart = getGuestCart();
    const userCart = getUserCart(userId);
    
    if (guestCart.items.length === 0) return;

    // Merge carts
    const mergedItems = [...userCart.items];
    
    guestCart.items.forEach(guestItem => {
      const existingIndex = mergedItems.findIndex(item => 
        item.id === guestItem.id && 
        item.color === guestItem.color &&
        item.size === guestItem.size
      );
      
      if (existingIndex > -1) {
        mergedItems[existingIndex].quantity += guestItem.quantity;
      } else {
        mergedItems.push(guestItem);
      }
    });
    
    // Update state
    dispatch({ type: 'SET_CART', payload: { items: mergedItems } });
    
    // Save merged cart
    saveUserCart(userId, { items: mergedItems });
    
    // Clear guest cart
    clearGuestCart();
    
    return mergedItems;
  };

  const addToCart = (product, color, size, quantity = 1) => {
    const cartItem = {
      ...product,
      color,
      size,
      quantity,
      customColor: color === 'custom' ? product.customColor : null
    };

    dispatch({
      type: 'ADD_TO_CART',
      payload: cartItem
    });
  };

  const removeFromCart = (productId, color, size) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { id: productId, color, size }
    });
  };

  const updateQuantity = (productId, color, size, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: productId, color, size, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    
    if (isSignedIn && userId) {
      localStorage.removeItem(getUserCartKey(userId));
    } else {
      clearGuestCart();
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

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      migrateGuestCart,
      isAuthenticated: isSignedIn
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