function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(function () {
        toast.classList.remove("show");
    }, 2500);
}
// =======================
// Wishlist
// =======================
const wishlistIcons = document.querySelectorAll(".wishlist");
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
wishlistIcons.forEach(icon => {
    const card = icon.closest(".product-card");
    const nameElement = card ? card.querySelector("h3") : null;
    const productName = nameElement
        ? nameElement.textContent.trim()
        : "";
    // Restore wishlist after page refresh
    if (wishlist.includes(productName)) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
    }
    icon.addEventListener("click", function () {
        if (wishlist.includes(productName)) {
            // Remove from wishlist
            wishlist = wishlist.filter(
                item => item !== productName
            );
            this.classList.remove("fa-solid");
            this.classList.add("fa-regular");
        } else {
            // Add to wishlist
            wishlist.push(productName);
            this.classList.remove("fa-regular");
            this.classList.add("fa-solid");
        }
        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );
    });
});
// =======================
// Cart Counter (Local Storage)
// =======================
let count = parseInt(localStorage.getItem("cartCount")) || 0;
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartButtons = document.querySelectorAll(".cart-btn");
const cartCount = document.getElementById("cart-count");
if (cartCount) {
    cartCount.textContent = count;
}
cartButtons.forEach(button => {
    button.addEventListener("click", function (e) {
        e.preventDefault();
        const card = this.closest(".product-card");
        const image = card ? card.querySelector("img") : null;
        const nameElement = card ? card.querySelector("h3") : null;
        const priceElement = card ? card.querySelector("p") : null;
        const product = {
            name: this.dataset.name || nameElement?.textContent.trim(),
            price: Number(
                this.dataset.price ||
                card?.dataset.price ||
                priceElement?.textContent.replace(/[₹,]/g, "").trim()
            ),
            image: this.dataset.image || image?.getAttribute("src"),
            quantity: 1
        };
        console.log("Product added:", product);
        const existingProduct = cart.find(
            item => item.name === product.name
        );
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        count++;
        localStorage.setItem("cartCount", count);
        if (cartCount) {
            cartCount.textContent = count;
        }
        showToast("✅ Product Added to Cart!");
    });
});
// =======================
// Product Search
// =======================

const search = document.getElementById("search");
if(search){
search.addEventListener("keyup", function(){
    const value = search.value.toLowerCase();
    const products = document.querySelectorAll(".product-card");
    products.forEach(product=>{
        const name = product.querySelector("h3").textContent.toLowerCase();
        if(name.includes(value)){
            product.style.display="block";
        }
        else{
            product.style.display="none";
        }
    });
});
}
// =======================
// Dark Mode
// =======================
const darkBtn = document.getElementById("darkModeBtn");
if(darkBtn){
    darkBtn.addEventListener("click", function(){
        document.body.classList.toggle("dark-mode");
        if(document.body.classList.contains("dark-mode")){
            darkBtn.textContent = "☀️";
        }else{
            darkBtn.textContent = "🌙";
        }
    });
}
// =======================
// Newsletter
// =======================
const newsletterForm = document.getElementById("newsletterForm");
if(newsletterForm){
newsletterForm.addEventListener("submit", function(e){
    e.preventDefault();
    showToast("🎉 Thank you for subscribing!");
    newsletterForm.reset();
});
}
// =======================
// Back To Top Button
// =======================
const topBtn = document.getElementById("topBtn");
if(topBtn){
    window.onscroll = function(){
        if(
            document.body.scrollTop > 300 ||
            document.documentElement.scrollTop > 300
        ){
            topBtn.style.display = "block";
        }else{
            topBtn.style.display = "none";
        }
    };
    topBtn.addEventListener("click", function(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
// =======================
// Hero Slider
// =======================
const slides = document.querySelectorAll(".banner-slider .slide");
let current = 0;
if (slides.length > 0) {
    setInterval(() => {
        slides[current].classList.remove("active");
        current = (current + 1) % slides.length;
        slides[current].classList.add("active");
    }, 3000);
}
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupName = document.getElementById("popup-name");
const popupPrice = document.getElementById("popup-price");
const popupDescription = document.getElementById("popup-description");
const quickViews = document.querySelectorAll(".quick-view");
quickViews.forEach(img => {
    img.addEventListener("click", function(){
        popup.style.display = "flex";
        popupImg.src = this.dataset.image;
        popupName.textContent = this.dataset.name;
        popupPrice.textContent = this.dataset.price;
        popupDescription.textContent = this.dataset.description;
    });
});
const closePopup = document.querySelector(".close-popup");
if(closePopup){
    closePopup.addEventListener("click", function(){
        popup.style.display = "none";
    });
}
window.addEventListener("click", function(e){
    if(e.target == popup){
        popup.style.display = "none";
    }
});
// =======================
// Checkout Form & Order Details
// =======================
const checkoutForm = document.getElementById("checkoutForm");
if (checkoutForm) {
    checkoutForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const cartItems =
            JSON.parse(localStorage.getItem("cart")) || [];
        const order = {
            orderId: "SV" + Date.now(),
            name:
                document.getElementById("customerName").value,
            email:
                document.getElementById("customerEmail").value,
            phone:
                document.getElementById("customerPhone").value,
            address:
                document.getElementById("customerAddress").value,
            paymentMethod:
                document.getElementById("paymentMethod").value,
            products: cartItems,
            total: cartItems.reduce(
                (sum, item) =>
                    sum +
                    Number(item.price) *
                    Number(item.quantity),
                0
            ),
            status: "Order Placed",
            date: new Date().toLocaleString()
        };
        // =======================
        // Save Latest Order
        // =======================
        localStorage.setItem(
            "lastOrder",
            JSON.stringify(order)
        );
        // =======================
        // Save Order History
        // =======================
        let orderHistory =
            JSON.parse(
                localStorage.getItem("orderHistory")
            ) || [];
        orderHistory.push(order);
        localStorage.setItem(
            "orderHistory",
            JSON.stringify(orderHistory)
        );
        // Clear cart after successful order
         localStorage.removeItem("cart");
         localStorage.removeItem("cartCount");
        // Success message
        showToast(
            "🎉 Your order has been placed successfully!"
        );
        setTimeout(function() {
            window.location.href =
                "order-success.html";
        }, 2500);
    });
}
const sortSelect = document.getElementById("sortProducts");
if(sortSelect){
sortSelect.addEventListener("change", function(){
    const productsContainer = document.querySelector(".products");
    const cards = Array.from(document.querySelectorAll(".product-card"));
    if(this.value==="low"){
        cards.sort((a,b)=>
        a.dataset.price-b.dataset.price);

    }
    else if(this.value==="high"){
        cards.sort((a,b)=>
        b.dataset.price-a.dataset.price);
    }
    else if(this.value==="name"){
        cards.sort((a,b)=>
        a.querySelector("h3").textContent.localeCompare(
        b.querySelector("h3").textContent)
        );
    }
    cards.forEach(card=>productsContainer.appendChild(card));
});
}
const recentContainer = document.getElementById("recentProducts");
document.querySelectorAll(".quick-view").forEach(product => {
    product.addEventListener("click", function () {
        if (!recentContainer) return;
        recentContainer.innerHTML = "";
        recentContainer.innerHTML += `
            <div class="recent-card">
                <img src="${this.dataset.image}" alt="${this.dataset.name}">
                <h4>${this.dataset.name}</h4>
                <p>${this.dataset.price}</p>
            </div>
        `;
    });
});
document.querySelectorAll(".rating").forEach(rating=>{
    const stars = rating.querySelectorAll(".star");
    stars.forEach((star,index)=>{
        star.addEventListener("click",function(){
            stars.forEach(s=>{
                s.classList.remove("fa-solid","active");
                s.classList.add("fa-regular");
            });
            for(let i=0;i<=index;i++){
                stars[i].classList.remove("fa-regular");
                stars[i].classList.add("fa-solid","active");
            }
        });
    });
});
const checkBtn=document.getElementById("checkDelivery");
if(checkBtn){
checkBtn.onclick=function(){
const pin=document.getElementById("pincode").value;
const result=document.getElementById("deliveryResult");
if(pin.length===6){
result.innerHTML="✅ Delivery Available";
result.style.color="green";
}else{
result.innerHTML="❌ Invalid Pincode";
result.style.color="red";
}
}
}
// =======================
// Order Tracking
// =======================
const trackBtn = document.getElementById("trackBtn");
if (trackBtn) {
    trackBtn.addEventListener("click", function () {
        const id =
            document.getElementById("orderId").value.trim();
        const status =
            document.getElementById("orderStatus");
        const order =
            JSON.parse(localStorage.getItem("lastOrder"));
        if (!order) {
            status.innerHTML = "❌ No order found.";
            return;
        }
        if (id !== order.orderId) {
            status.innerHTML = "❌ Order ID not found.";
            status.style.color = "red";
            return;
        }
        status.style.color = "";
const statuses = [
    "Order Placed",
    "Order Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled"
];
const currentStatus = order.status || "Order Placed";
const currentIndex = statuses.indexOf(currentStatus);
let timelineHTML = "";
if (currentStatus === "Cancelled") {
    timelineHTML = `
        <div class="tracking-step active">
            <span>✓</span>
            <div>
                <strong>Order Placed</strong>
                <p>Your order was placed successfully.</p>
            </div>
        </div>
        <div class="tracking-line"></div>
        <div class="tracking-step active">
            <span>✕</span>
            <div>
                <strong>Order Cancelled</strong>
                <p>Your order has been cancelled.</p>
            </div>
        </div>
    `;
} else {
statuses.forEach(function(statusName, index) {
                const isCompleted = index <= currentIndex;
                const isCurrent = index === currentIndex;
    timelineHTML += `
        <div class="tracking-step ${isCompleted ? "active" : ""}">
            <span>
                ${isCompleted ? "✓" : index + 1}
            </span>
            <div>
                <strong>
                    ${statusName}
                    ${isCurrent ? " (Current)" : ""}
                </strong>
                <p>
                    ${
                        statusName === "Order Placed"
                        ? "Your order has been placed successfully."
                        : statusName === "Order Confirmed"
                        ? "Your order has been confirmed."
                        : statusName === "Shipped"
                        ? "Your order has been shipped."
                        : statusName === "Out for Delivery"
                        ? "Your order is out for delivery."
                        : "Your order has been delivered."
                    }
                </p>
            </div>
        </div>
    `;
    if (index < statuses.length - 1) {
        timelineHTML += `
            <div class="tracking-line"></div>
        `;
    }
});
}
status.innerHTML = `
    <div class="tracking-box">
        <h2>📦 Order Found</h2>
        <p>
            <strong>Order ID:</strong>
            ${order.orderId}
        </p>
        <div class="tracking-timeline">
            ${timelineHTML}
        </div>
        <p>
            <strong>Current Status:</strong>
            ${currentStatus}
        </p>
        <p>
            <strong>Total:</strong>
            ₹${order.total}
        </p>
    </div>
    `;
    });
}
// =======================
// Coupon Code
// =======================
const couponBtn = document.getElementById("applyCoupon");
if(couponBtn){
    couponBtn.addEventListener("click",function(){
        const code = document.getElementById("couponCode").value.toUpperCase();
        const message = document.getElementById("couponMessage");
        if(code === "SREE10"){
            message.innerHTML = "🎉 Coupon Applied! You got 10% OFF.";
            message.style.color = "green";
        }
        else if(code === "WELCOME20"){
            message.innerHTML = "🎉 Coupon Applied! You got 20% OFF.";
            message.style.color = "green";
        }
        else{
            message.innerHTML = "❌ Invalid Coupon Code";
            message.style.color = "red";
        }
    });
}
// =======================
// Active Navigation Link
// =======================
const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".nav a");
navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
        link.classList.add("active");
    }
});
// =======================
// Product Category Filter
// =======================
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            const filter = this.dataset.filter;
            productCards.forEach(card => {
                if (filter === "all" || card.dataset.category === filter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}