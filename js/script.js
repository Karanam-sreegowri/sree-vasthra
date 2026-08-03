function showToast(message){

    const toast = document.getElementById("toast");

    if(!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function(){

        toast.classList.remove("show");

    },2500);

}
// =======================
// Wishlist
// =======================

const wishlistIcons = document.querySelectorAll(".wishlist");

wishlistIcons.forEach(icon => {

    icon.addEventListener("click", function () {

        this.classList.toggle("fa-solid");
        this.classList.toggle("fa-regular");

        if (this.classList.contains("fa-solid")) {
            this.style.color = "red";
        } else {
            this.style.color = "#c2185b";
        }

    });

});

// =======================
// Cart Counter
// =======================

const cartButtons = document.querySelectorAll(".cart-btn");
const cartCount = document.getElementById("cart-count");

// Get saved cart count
let count = localStorage.getItem("cartCount");

if(count === null){
    count = 0;
}else{
    count = Number(count);
}

if(cartCount){
    cartCount.textContent = count;
}

cartButtons.forEach(button=>{

    button.addEventListener("click",function(){

        count++;

        localStorage.setItem("cartCount",count);

        if(cartCount){
            cartCount.textContent = count;
        }

        showToast("🛒 Product Added to Cart!");

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

    });

}
if(document.body.classList.contains("dark-mode")){
    darkBtn.textContent = "☀️";
}else{
    darkBtn.textContent = "🌙";
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

window.onscroll = function(){

    if(document.body.scrollTop > 300 || document.documentElement.scrollTop > 300){

        topBtn.style.display = "block";

    }
    else{

        topBtn.style.display = "none";

    }

};

topBtn.addEventListener("click", function(){

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

});
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

document.querySelector(".close-popup").addEventListener("click", function(){

    popup.style.display = "none";

});

window.addEventListener("click", function(e){

    if(e.target == popup){

        popup.style.display = "none";

    }

});
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button=>{

    button.addEventListener("click",function(){

        filterButtons.forEach(btn=>btn.classList.remove("active"));

        this.classList.add("active");

        const category = this.dataset.filter;

        document.querySelectorAll(".product-card").forEach(card=>{

            if(category==="all" || card.dataset.category===category){

                card.style.display="block";

            }else{

                card.style.display="none";

            }

        });

    });

});
// =======================
// Checkout Form
// =======================

const checkoutForm = document.getElementById("checkoutForm");

if(checkoutForm){

    checkoutForm.addEventListener("submit", function(e){

        e.preventDefault();

        showToast("🎉 Your order has been placed successfully!");

        window.location.href = "index.html";

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
const clearCart = document.getElementById("clearCart");

if(clearCart){

    clearCart.addEventListener("click",function(){

        localStorage.removeItem("cartCount");

        count = 0;

        if(cartCount){
            cartCount.textContent = 0;
        }

        showToast("🗑️ Cart Cleared!");

    });

}
// =======================
// Coupon Code
// =======================

const couponBtn = document.getElementById("applyCoupon");

if(couponBtn){

    couponBtn.addEventListener("click",function(){

        const code = document.getElementById("coupon").value.toUpperCase();

        const total = document.getElementById("grandTotal");

        if(code==="SREE10"){

            total.textContent="Grand Total : ₹2068";

            showToast("🎉 Coupon Applied Successfully!");

        }

        else if(code==="WELCOME20"){

            total.textContent="Grand Total : ₹1838";

            showToast("🎉 Coupon Applied Successfully!");

        }

        else{

            showToast("❌ Invalid Coupon Code");

        }

    });

}
const recentContainer = document.getElementById("recentProducts");
document.querySelectorAll(".quick-view").forEach(product=>
    product.addEventListener("click",function(){
        if(!recentContainer) return;
        recentContainer.innerHTML = "";
        recentContainer.innerHTML += `
            <div class="recent-card">
                <img src="${this.dataset.image}">
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
if(trackBtn){
trackBtn.addEventListener("click",function(){
const id=document.getElementById("orderId").value;
const status=document.getElementById("orderStatus");
if(id==="SV12345"){
status.innerHTML="📦 Your order has been shipped and will arrive in 2 days.";
status.style.color="green";
}
else{
status.innerHTML="❌ Order ID not found.";
status.style.color="red";
}
});
}
const submitReview = document.getElementById("submitReview");
if(submitReview){
    submitReview.addEventListener("click",function(){
        const name = document.getElementById("reviewName").value;
        const review = document.getElementById("reviewText").value;
        if(name==="" || review===""){
            showToast("Please fill all fields!");
            return;
        }
        const reviewList = document.getElementById("reviewList");
        reviewList.innerHTML += `
            <div class="review">
                <h4>${name} ⭐⭐⭐⭐⭐</h4>
                <p>${review}</p>
            </div>
        `;
        document.getElementById("reviewName").value="";
        document.getElementById("reviewText").value="";
        showToast("Review Submitted!");
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