// Get cart data from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const grandTotal = document.getElementById("grand-total");

function loadCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price * item.quantity}</td>
        </tr>
        `;
    });

    grandTotal.textContent = total;
}

loadCart();