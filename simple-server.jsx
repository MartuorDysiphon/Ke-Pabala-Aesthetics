const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock database
let carts = {};

app.get('/api/health', (req, res) => {
  res.json({ status: 'Local server running!', timestamp: new Date().toISOString() });
});

app.get('/api/cart/:userId', (req, res) => {
  const { userId } = req.params;
  if (!carts[userId]) {
    carts[userId] = { userId, items: [] };
  }
  res.json(carts[userId]);
});

app.post('/api/cart/:userId/items', (req, res) => {
  const { userId } = req.params;
  const { product, color, size, quantity, customColor } = req.body;
  
  if (!carts[userId]) {
    carts[userId] = { userId, items: [] };
  }
  
  const existingItemIndex = carts[userId].items.findIndex(item => 
    item.productId === product.id && item.color === color && item.size === size
  );
  
  if (existingItemIndex > -1) {
    carts[userId].items[existingItemIndex].quantity += quantity;
  } else {
    carts[userId].items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      color,
      size,
      customColor: customColor || '',
      quantity,
      length: product.length || ''
    });
  }
  
  res.json(carts[userId]);
});

app.listen(PORT, () => {
  console.log(`🛠️ Local backend running on http://localhost:${PORT}`);
});