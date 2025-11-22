import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const CartContext = createContext();

// API base URL - use environment variable with fallback
const API_BASE = process.env.REACT_APP_API_URL || 'https://pabala-aesthetics.onrender.com/api';

console.log('🔄 CartContext - API Base:', API_BASE);

const cartReducer = (state, action) => {
  console.log('🛒 Cart Reducer - Action:', action.type, action.payload);
  
  switch (action.type) {
    case 'SET_CART':
      const newItems = action.payload.items || [];
      console.log('📥 Setting cart items:', newItems.length);
      return {
        ...state,
        items: newItems,
        isLoading: false,
        lastUpdated: Date.now()
      };
    
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => 
        item.productId === action.payload.productId && 
        item.color === action.payload.color &&
        item.size === action.payload.size
      );
      
      let updatedItems;
      if (existingItem) {
        updatedItems = state.items.map(item =>
          item.productId === action.payload.productId && 
          item.color === action.payload.color &&
          item.size === action.payload.size
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        console.log('➕ Updated existing item quantity');
      } else {
        updatedItems = [...state.items, action.payload];
        console.log('🆕 Added new item to cart');
      }
      
      return {
        ...state,
        items: updatedItems,
        lastUpdated: Date.now()
      };
    
    case 'REMOVE_FROM_CART':
      const filteredItems = state.items.filter(item => 
        !(item.productId === action.payload.productId && 
          item.color === action.payload.color &&
          item.size === action.payload.size)
      );
      console.log('🗑️ Removed item, remaining:', filteredItems.length);
      
      return {
        ...state,
        items: filteredItems,
        lastUpdated: Date.now()
      };
    
    case 'UPDATE_QUANTITY':
      const quantityUpdatedItems = state.items.map(item =>
        item.productId === action.payload.productId && 
        item.color === action.payload.color &&
        item.size === action.payload.size
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      console.log('📊 Updated item quantity');
      
      return {
        ...state,
        items: quantityUpdatedItems,
        lastUpdated: Date.now()
      };
    
    case 'CLEAR_CART':
      console.log('🧹 Cleared entire cart');
      return {
        ...state,
        items: [],
        lastUpdated: Date.now()
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    
    default:
      return state;
  }
};

const initialState = {
  items: [],
  isLoading: true,
  error: null,
  lastUpdated: null
};

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const guestCart = localStorage.getItem('guestCart');
    if (guestCart) {
      const parsed = JSON.parse(guestCart);
      console.log('📂 Loaded from localStorage:', parsed.length, 'items');
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error('❌ Error loading from localStorage:', error);
  }
  return [];
};

// Save cart to localStorage
const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('guestCart', JSON.stringify(items));
    console.log('💾 Saved to localStorage:', items.length, 'items');
  } catch (error) {
    console.error('❌ Error saving to localStorage:', error);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, isSignedIn } = useUser();

  console.log('👤 User state:', { isSignedIn, userId: user?.id });

  // Load initial cart from localStorage for guests
  useEffect(() => {
    if (!isSignedIn) {
      const guestItems = loadCartFromStorage();
      dispatch({ type: 'SET_CART', payload: { items: guestItems } });
    }
  }, []);

  // Fetch cart from backend when user signs in
  useEffect(() => {
    if (isSignedIn && user) {
      console.log('🔄 User signed in, fetching cart from backend...');
      fetchCart();
    } else if (!isSignedIn && state.items.length > 0) {
      // User signed out, ensure guest cart is saved
      console.log('👋 User signed out, saving guest cart...');
      saveCartToStorage(state.items);
    }
  }, [isSignedIn, user]);

  const fetchCart = async () => {
    if (!user?.id) {
      console.log('❌ No user ID available for fetching cart');
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      console.log(`📡 Fetching cart from: ${API_BASE}/cart/${user.id}`);
      
      const response = await fetch(`${API_BASE}/cart/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📨 Backend response status:', response.status);
      
      if (response.ok) {
        const cartData = await response.json();
        console.log('✅ Cart data received:', cartData);
        
        if (cartData.data && cartData.data.items) {
          dispatch({ type: 'SET_CART', payload: { items: cartData.data.items } });
          console.log('🛒 Cart loaded from backend:', cartData.data.items.length, 'items');
        } else {
          console.log('⚠️ No cart data in response, using empty cart');
          dispatch({ type: 'SET_CART', payload: { items: [] } });
        }
      } else {
        console.error('❌ Backend returned error status:', response.status);
        // Try to load from localStorage as fallback
        const guestItems = loadCartFromStorage();
        dispatch({ type: 'SET_CART', payload: { items: guestItems } });
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch cart from server' });
      }
    } catch (error) {
      console.error('💥 Network error fetching cart:', error);
      // Fallback to localStorage
      const guestItems = loadCartFromStorage();
      dispatch({ type: 'SET_CART', payload: { items: guestItems } });
      dispatch({ type: 'SET_ERROR', payload: 'Network error - using local cart' });
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
      // Sync with backend for logged-in users
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
          console.log('✅ Successfully synced with backend');
          const updatedCart = await response.json();
          if (updatedCart.data && updatedCart.data.items) {
            dispatch({ type: 'SET_CART', payload: { items: updatedCart.data.items } });
          }
        } else {
          console.error('❌ Backend sync failed:', response.status);
        }
      } catch (error) {
        console.error('💥 Error syncing with backend:', error);
        // Item was already added to local state, so we continue
      }
    } else {
      // Save to local storage for guest users
      const currentItems = state.items;
      const existingIndex = currentItems.findIndex(i => 
        i.productId === item.productId && i.color === color && i.size === size
      );
      
      let updatedItems;
      if (existingIndex > -1) {
        updatedItems = currentItems.map((item, index) =>
          index === existingIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedItems = [...currentItems, item];
      }
      
      saveCartToStorage(updatedItems);
    }
  };

  const removeFromCart = async (productId, color, size) => {
    console.log('🗑️ Removing from cart:', { productId, color, size });

    // Update local state immediately
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
        console.log('✅ Removed from backend');
      } catch (error) {
        console.error('💥 Error removing from backend:', error);
      }
    } else {
      // Update local storage for guest users
      const updatedItems = state.items.filter(item => 
        !(item.productId === productId.toString() && 
          item.color === (color || '') && 
          item.size === (size || ''))
      );
      saveCartToStorage(updatedItems);
    }
  };

  const updateQuantity = async (productId, color, size, quantity) => {
    console.log('📊 Updating quantity:', { productId, color, size, quantity });

    if (quantity < 1) {
      removeFromCart(productId, color, size);
      return;
    }

    // Update local state immediately
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { 
        productId: productId.toString(), 
        color: color || '', 
        size: size || '', 
        quantity 
      }
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
        console.log('✅ Quantity updated in backend');
      } catch (error) {
        console.error('💥 Error updating quantity in backend:', error);
      }
    } else {
      // Update local storage for guest users
      const updatedItems = state.items.map(item => 
        item.productId === productId.toString() && 
        item.color === (color || '') && 
        item.size === (size || '')
          ? { ...item, quantity }
          : item
      );
      saveCartToStorage(updatedItems);
    }
  };

  const clearCart = async () => {
    console.log('🧹 Clearing entire cart');

    dispatch({ type: 'CLEAR_CART' });

    if (isSignedIn && user) {
      try {
        await fetch(`${API_BASE}/cart/${user.id}/clear`, {
          method: 'DELETE',
        });
        console.log('✅ Cart cleared in backend');
      } catch (error) {
        console.error('💥 Error clearing cart in backend:', error);
      }
    } else {
      // Clear local storage for guest users
      localStorage.removeItem('guestCart');
      console.log('✅ Cart cleared from localStorage');
    }
  };

  const getTotalItems = () => {
    const total = state.items.reduce((total, item) => total + item.quantity, 0);
    console.log('🔢 Total items in cart:', total);
    return total;
  };

  const getTotalPrice = () => {
    const total = state.items.reduce((total, item) => {
      const basePrice = parseFloat(item.price);
      const customColorCost = item.customColor ? 100 : 0;
      return total + (basePrice + customColorCost) * item.quantity;
    }, 0);
    console.log('💰 Total price:', total);
    return total;
  };

  // Function to migrate guest cart to user cart when user logs in
  const migrateGuestCart = async () => {
    const guestCart = localStorage.getItem('guestCart');
    if (guestCart && isSignedIn && user) {
      try {
        const guestItems = JSON.parse(guestCart);
        console.log('🚚 Migrating guest cart to user account:', guestItems.length, 'items');
        
        // Add each guest item to user's backend cart
        for (const item of guestItems) {
          await fetch(`${API_BASE}/cart/${user.id}/items`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              product: {
                id: item.productId,
                name: item.name,
                price: item.price,
                image: item.image,
                category: item.category,
                length: item.length
              },
              color: item.color,
              size: item.size,
              quantity: item.quantity,
              customColor: item.customColor
            })
          });
        }
        
        // Clear guest cart
        localStorage.removeItem('guestCart');
        console.log('✅ Guest cart migrated successfully');
        
        // Refresh cart from backend
        fetchCart();
      } catch (error) {
        console.error('❌ Error migrating guest cart:', error);
      }
    }
  };

  // Auto-migrate guest cart when user signs in
  useEffect(() => {
    if (isSignedIn && user) {
      migrateGuestCart();
    }
  }, [isSignedIn, user]);

  // Debug: Log cart state changes
  useEffect(() => {
    console.log('🛒 Cart state updated:', {
      items: state.items.length,
      isLoading: state.isLoading,
      error: state.error,
      lastUpdated: state.lastUpdated
    });
  }, [state]);

  const value = {
    cart: state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    refreshCart: fetchCart,
    migrateGuestCart
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