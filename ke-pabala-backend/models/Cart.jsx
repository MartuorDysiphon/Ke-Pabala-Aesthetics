import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { 
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
  category: { 
    type: String, 
    required: [true, 'Product category is required'] 
  },
  color: { 
    type: String, 
    default: '' 
  },
  size: { 
    type: String, 
    default: '' 
  },
  customColor: { 
    type: String, 
    default: '' 
  },
  quantity: { 
    type: Number, 
    default: 1,
    min: [1, 'Quantity must be at least 1']
  },
  length: { 
    type: String, 
    default: '' 
  }
}, { 
  timestamps: true,
  _id: true 
});

const cartSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: [true, 'User ID is required'], 
    unique: true,
    index: true
  },
  items: [cartItemSchema],
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

// Update timestamp on save
cartSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to find or create cart
cartSchema.statics.findOrCreate = async function(userId) {
  let cart = await this.findOne({ userId });
  if (!cart) {
    cart = new this({ userId, items: [] });
    await cart.save();
  }
  return cart;
};

// Instance method to calculate total
cartSchema.methods.calculateTotal = function() {
  return this.items.reduce((total, item) => {
    const basePrice = item.price;
    const customColorCost = item.customColor ? 100 : 0;
    return total + (basePrice + customColorCost) * item.quantity;
  }, 0);
};

// Instance method to get total items count
cartSchema.methods.getTotalItems = function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
};

export default mongoose.model('Cart', cartSchema);