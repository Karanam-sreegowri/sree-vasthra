// =======================
// Load Cart
// =======================
let cartData = JSON.parse(localStorage.getItem("cart")) || [];
const cartItems = document.getElementById("cart-items");
const grandTotal = document.getElementById("grand-total");
const clearCart = document.getElementById("clearCart");
// =======================
// Display Cart
// =======================
function loadCart() {
    if (!cartItems || !grandTotal) {
        return;
    }
    cartItems.innerHTML = "";
    let total = 0;
    cartData.forEach(function(item) {
        total += Number(item.price) * Number(item.quantity);
        cartItems.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td>${item.quantity}</td>
                <td>₹${Number(item.price) * Number(item.quantity)}</td>
            </tr>
        `;
    });
    grandTotal.textContent = `₹${total}`;
}
// =======================
// Clear Cart
// =======================
if (clearCart) {
    clearCart.addEventListener("click", function() {
        localStorage.removeItem("cart");
        localStorage.removeItem("cartCount");
        cartData = [];
        loadCart();
        const cartCount = document.getElementById("cart-count");
        if (cartCount) {
            cartCount.textContent = "0";
        }
    });
}
// =======================
// Load cart when page opens
// =======================
loadCart();
// =======================
// Coupon
// =======================
const couponInput = document.getElementById("coupon");
const applyCoupon = document.getElementById("applyCoupon");
if (applyCoupon) {
    applyCoupon.addEventListener("click", function () {
        const coupon = couponInput.value.trim().toUpperCase();
        if (coupon === "SREE10") {
            const subtotal = cartData.reduce(
                (total, item) =>
                    total + Number(item.price) * Number(item.quantity),
                0
            );
            const discount = subtotal * 0.10;
            const total = subtotal - discount;
            grandTotal.textContent = `Grand Total : ₹${total.toFixed(2)}`;
            alert("Coupon applied! 10% discount added.");
        } else {
            alert("Invalid coupon code.");
        }
    });
}