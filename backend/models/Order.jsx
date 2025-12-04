import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  image: String,
  color: String,
  size: String,
  quantity: Number,
  customColor: String,
  category: String,
  displayName: String
});

const customerInfoSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  suburb: String,
  city: String,
  province: String,
  postalCode: String
});

const deliveryMethodSchema = new mongoose.Schema({
  id: String,
  name: String,
  time: String,
  cost: Number
});

const orderSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: [true, 'Clerk user ID is required'],
    index: true
  },
  orderNumber: {
    type: String,
    required: [true, 'Order number is required'],
    unique: true,
    index: true
  },
  items: [orderItemSchema],
  customerInfo: customerInfoSchema,
  deliveryMethod: deliveryMethodSchema,
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: ['bank-transfer', 'capitec', 'payshap', 'layby']
  },
  subtotal: {
    type: Number,
    required: [true, 'Subtotal is required'],
    min: 0
  },
  deliveryCost: {
    type: Number,
    required: [true, 'Delivery cost is required'],
    min: 0
  },
  total: {
    type: Number,
    required: [true, 'Total is required'],
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Indexes for better query performance
orderSchema.index({ clerkUserId: 1, createdAt: -1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ status: 1 });

// Virtual for formatted order date
orderSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Ensure virtual fields are serialized
orderSchema.set('toJSON', { virtuals: true });

// Pre-save middleware to ensure order number format
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.orderNumber = `KPA${timestamp}${random}`;
  }
  next();
});

export default mongoose.model('Order', orderSchema);