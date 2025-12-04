import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
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
            return {
                ...state,
                items: []
            };
        
        default:
            return state;
    }
};

const initialState = {
    items: []
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product, color, size, quantity = 1) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                ...product,
                color,
                size,
                quantity,
                customColor: color === 'custom' ? product.customColor : null
            }
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