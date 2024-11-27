let cart = JSON.parse(localStorage.getItem('cart')) || [];

export const getCartItems = () => cart;

export const addToCart = (product, size, varian) => {
    const existingItem = cart.find((item) => item.id === product.id && item.size === size && item.varian === varian);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, size, varian, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const increaseCartItem = (productId) => {
    const item = cart.find((item) => item.id === productId);
    if (item) {
        item.quantity += 1; // Menambah jumlah item
        localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    }
};

export const decreaseCartItem = (productId) => {
    const item = cart.find((item) => item.id === productId);
    if (item) {
        item.quantity -= 1; // Mengurangi jumlah item
        if (item.quantity <= 0) {
            removeFromCart(productId); // Hapus item jika jumlahnya 0
        } else {
            localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
        }
    }
};

export const removeFromCart = (productId) => {
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
};
