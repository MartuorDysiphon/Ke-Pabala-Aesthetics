import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
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
    required: true,
    min: [1, 'Quantity must be at least 1']
  }
}, {
  timestamps: true
});

const customerInfoSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  suburb: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postalCode: { type: String, required: true }
});

const deliveryMethodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: String, required: true },
  cost: { type: Number, required: true, min: 0 }
});

const orderSchema = new mongoose.Schema({
  orderNumber: { 
    type: String, 
    required: [true, 'Order number is required'], 
    unique: true,
    index: true
  },
  userId: { 
    type: String, 
    required: [true, 'User ID is required'],
    index: true
  },
  items: [orderItemSchema],
  customerInfo: customerInfoSchema,
  deliveryMethod: deliveryMethodSchema,
  paymentMethod: { 
    type: String, 
    required: true,
    enum: ['bank-transfer', 'capitec', 'payshap', 'layby']
  },
  subtotal: { 
    type: Number, 
    required: true,
    min: 0
  },
  deliveryCost: { 
    type: Number, 
    required: true,
    min: 0
  },
  total: { 
    type: Number, 
    required: true,
    min: 0
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  notes: { type: String, default: '' }
}, {
  timestamps: true
});

// Pre-save middleware to generate order number if not provided
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.orderNumber = `KPA${timestamp}${random}`;
  }
  next();
});

// Static method to find orders by user
orderSchema.statics.findByUser = function(userId) {
  return this.find({ userId }).sort({ createdAt: -1 });
};

// Instance method to get order summary
orderSchema.methods.getSummary = function() {
  return {
    orderNumber: this.orderNumber,
    total: this.total,
    status: this.status,
    itemCount: this.items.reduce((sum, item) => sum + item.quantity, 0),
    createdAt: this.createdAt
  };
};

export default mongoose.model('Order', orderSchema);