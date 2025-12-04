import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: [true, 'Product ID is required'] 
  },
  name: { 
    type: String, 
    required: [true, 'Product name is required'] 
  },
  price: { 
    type: Number, 
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  image: { 
    type: String, 
    required: [true, 'Product image is required'] 
  },
  color: { 
    type: String, 
    required: [true, 'Product color is required'] 
  },
  size: { 
    type: String, 
    required: [true, 'Product size is required'] 
  },
  quantity: { 
    type: Number, 
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
    max: [99, 'Quantity cannot exceed 99']
  },
  customColor: { 
    type: String, 
    default: null 
  },
  category: { 
    type: String, 
    required: [true, 'Product category is required'] 
  },
  displayName: { 
    type: String, 
    required: [true, 'Display name is required'] 
  }
}, { 
  timestamps: true,
  _id: true 
});

const cartSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: [true, 'Clerk user ID is required'],
    unique: true,
    index: true
  },
  items: [cartItemSchema]
}, {
  timestamps: true
});

// Index for better query performance
cartSchema.index({ clerkUserId: 1 });
cartSchema.index({ updatedAt: 1 });

// Virtual for total items count
cartSchema.virtual('totalItems').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Virtual for total price
cartSchema.virtual('totalPrice').get(function() {
  return this.items.reduce((total, item) => {
    const basePrice = item.price;
    const customColorCost = item.customColor ? 100 : 0;
    return total + (basePrice + customColorCost) * item.quantity;
  }, 0);
});

// Ensure virtual fields are serialized
cartSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Cart', cartSchema);