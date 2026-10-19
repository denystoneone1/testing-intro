const PROMO_CODE = 'SAVE10';
const PROMO_DISCOUNT_RATE = 0.1;
const PROMO_MIN_SUBTOTAL = 20000;
const DELIVERY_PRICE = 30000;
const FREE_DELIVERY_MIN_SUBTOTAL = 50000;

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

function calculateDiscount(subtotal, promoCode) {
  if (promoCode !== PROMO_CODE || subtotal < PROMO_MIN_SUBTOTAL) return 0;
  return Math.round(subtotal * PROMO_DISCOUNT_RATE);
}

function calculateDelivery(subtotal) {
  return subtotal < FREE_DELIVERY_MIN_SUBTOTAL ? DELIVERY_PRICE : 0;
}

function calculateOrderTotal(cart, promoCode = '') {
  const subtotal = calculateCartSubtotal(cart);
  const discount = calculateDiscount(subtotal, promoCode);
  const delivery = calculateDelivery(subtotal);

  return { subtotal, discount, delivery, total: subtotal - discount + delivery };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
