function validateQuantity(quantity, stock) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Количество должно быть положительным целым числом');
  }
  if (quantity > stock) {
    throw new RangeError('Количество не может превышать остаток на складе');
  }
}

function addToCart(cart, product, quantity = 1) {
  const existingItem = cart.find((item) => item.id === product.id);
  const nextQuantity = (existingItem ? existingItem.quantity : 0) + quantity;
  validateQuantity(quantity, product.stock);
  validateQuantity(nextQuantity, product.stock);

  if (!existingItem) return [...cart, { ...product, quantity }];
  return cart.map((item) => (item.id === product.id ? { ...item, quantity: nextQuantity } : item));
}

function changeQuantity(cart, productId, quantity) {
  const item = cart.find(({ id }) => id === productId);
  if (!item) return cart;

  validateQuantity(quantity, item.stock);
  return cart.map((cartItem) => (cartItem.id === productId ? { ...cartItem, quantity } : cartItem));
}

function removeFromCart(cart, productId) {
  return cart.filter(({ id }) => id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, { price, quantity }) => sum + price * quantity, 0);
}

function calculateOrderTotal(cart, promoCode = '') {
  const subtotal = calculateCartSubtotal(cart);
  const discount = promoCode === 'SAVE10' && subtotal >= 20000 ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal < 50000 ? 30000 : 0;

  return { subtotal, discount, delivery, total: subtotal - discount + delivery };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
