// Get cart data from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const grandTotal =
    document.getElementById("grand-total") ||
    document.getElementById("grandTotal");
function loadCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        if (!item.name || !item.price) {
            return;
        }
        total += Number(item.price) * Number(item.quantity);
        cartItems.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price * item.quantity}</td>
        </tr>
        `;
    });
    if (grandTotal) {
        grandTotal.textContent = total;
    }
}
// =======================
// Clear Cart
// =======================

const clearCart = document.getElementById("clearCart");

if (clearCart) {

    clearCart.addEventListener("click", function () {

        localStorage.removeItem("cart");
        localStorage.removeItem("cartCount");

        cart = [];

        loadCart();

        const cartCount = document.getElementById("cart-count");

        if (cartCount) {
            cartCount.textContent = "0";
        }

        showToast("🗑️ Cart Cleared!");

    });

}