import { useState } from 'react'
import './App.css'

function App() {
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [user, setUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const products = [
  {
    id: 1,
    name: 'Pink Kurta',
    price: 999,
    category: 'Kurtis',
    image: '/images/pink kurta.webp',
    description: 'Beautiful pink kurta for everyday elegance.',
  },
  {
    id: 2,
    name: 'Kurti Set',
    price: 1799,
    category: 'Kurtis',
    image: '/images/kurti set1.jpg',
    description: 'Stylish kurti set with a graceful design.',
  },
  {
    id: 3,
    name: 'Party Wear Saree',
    price: 1299,
    category: 'Sarees',
    image: '/images/party-wear saree.jpg',
    description: 'Elegant saree for special occasions.',
  },
  {
    id: 4,
    name: 'Saree Party',
    price: 1899,
    category: 'Sarees',
    image: '/images/saree party.jpg',
    description: 'Traditional style with a festive touch.',
  },
  {
    id: 5,
    name: 'Saree Party 2',
    price: 1999,
    category: 'Sarees',
    image: '/images/saree party2.jpg',
    description: 'Beautiful ethnic wear for celebrations.',
  },
  {
    id: 6,
    name: 'Kalamkari Lehenga',
    price: 1499,
    category: 'Lehengas',
    image: '/images/kalamkari-lehenga.jpg',
    description: 'Traditional Kalamkari-inspired elegance.',
  },
  {
    id: 7,
    name: 'Designer Lehenga',
    price: 2999,
    category: 'Lehengas',
    image: '/images/lehenga.jpg',
    description: 'A beautiful designer look for special events.',
  },
  {
    id: 8,
    name: 'Lehenga Choli',
    price: 3299,
    category: 'Lehengas',
    image: '/images/lehenga-choli.jpg',
    description: 'Graceful lehenga choli for celebrations.',
  },
  {
    id: 9,
    name: 'Party Gown',
    price: 2499,
    category: 'Party Wear',
    image: '/images/party-gown.jpg',
    description: 'Stylish gown for memorable occasions.',
  },
  {
    id: 10,
    name: 'Sharara Set',
    price: 2199,
    category: 'Ethnic Wear',
    image: '/images/sharara-set.jpg',
    description: 'Charming ethnic sharara outfit.',
  },
  {
    id: 11,
    name: 'Sharara Set Combo',
    price: 2799,
    category: 'Ethnic Wear',
    image: '/images/sharara-set combo.jpg',
    description: 'Complete ethnic look for celebrations.',
  },
  {
    id: 12,
    name: 'Indo-Western Wear',
    price: 2499,
    category: 'Indo-Western',
    image: '/images/indo-western wear.jpg',
    description: 'Traditional style with modern fashion.',
  },
  {
    id: 13,
    name: 'Indo-Western Set',
    price: 1999,
    category: 'Indo-Western',
    image: '/images/indo-western set.jpg',
    description: 'Modern ethnic outfit for every occasion.',
  },
  {
    id: 14,
    name: 'Indo-Western 1',
    price: 2299,
    category: 'Indo-Western',
    image: '/images/indo-western 1.jpg',
    description: 'Elegant fusion fashion.',
  },
  {
    id: 15,
    name: 'Indo-Western 2',
    price: 2399,
    category: 'Indo-Western',
    image: '/images/indo-western 2.jpg',
    description: 'Stylish fusion wear.',
  },
  {
    id: 16,
    name: 'Indo-Western 3',
    price: 2599,
    category: 'Indo-Western',
    image: '/images/indo-western3.jpg',
    description: 'Fashionable traditional-modern combination.',
  },
  {
    id: 17,
    name: 'Gown Collection',
    price: 2999,
    category: 'Party Wear',
    image: '/images/gown.jpg',
    description: 'Elegant gown for special events.',
  },
  {
    id: 18,
    name: 'Gown Style 1',
    price: 2799,
    category: 'Party Wear',
    image: '/images/gown1.jpg',
    description: 'Beautiful party wear design.',
  },
  {
    id: 19,
    name: 'Gown Style 2',
    price: 2899,
    category: 'Party Wear',
    image: '/images/gown2.jpg',
    description: 'Stylish gown for celebrations.',
  },
  {
    id: 20,
    name: 'Lehenga Choli 2',
    price: 3499,
    category: 'Lehengas',
    image: '/images/lehenga-choli2.jpg',
    description: 'Traditional lehenga for festive occasions.',
  },
]
const categories = [
  'All',
  'Sarees',
  'Kurtis',
  'Lehengas',
  'Party Wear',
  'Ethnic Wear',
  'Indo-Western',
]

const filteredProducts =
  selectedCategory === 'All'
    ? products
    : products.filter(
        (product) => product.category === selectedCategory,
      )
  function addToCart(product) {
    setCart((previousCart) => {
      const existing = previousCart.find((item) => item.id === product.id)

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...previousCart, { ...product, quantity: 1 }]
    })
  }

  function removeFromCart(productId) {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== productId),
    )
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const handleLogin = () => {
  if (!loginEmail || !loginPassword) {
    alert('Please enter your email and password.')
    return
  }

  if (loginEmail === 'admin@sreevasthra.com' && loginPassword === 'admin123') {
  setUser({ name: 'Admin', role: 'admin' })
  setShowLogin(false)
  setShowAdmin(true)
  alert('Admin login successful!')
  } else {
    setUser({ name: loginEmail.split('@')[0], role: 'user' })
    setShowLogin(false)
    alert('User login successful!')
  }
}
  return (
    <div className="website">
   {showAdmin && (
  <div style={{
    position: 'fixed',
    inset: 0,
    background: 'white',
    zIndex: 9999999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }}>
    <h1>ADMIN DASHBOARD OPENED!</h1>
    <p>Welcome to SREE VASTHRA</p>
    <button onClick={() => setShowAdmin(false)}>
      Close
    </button>
  </div>
)}
      {showLogin && (
  <div className="login-overlay">
    <div className="login-box">
      <button
        className="login-close"
        onClick={() => setShowLogin(false)}
      >
        ×
      </button>
      <h2>{isRegistering ? 'Create Account' : 'Login to SREE VASTHRA'}</h2>
      <input
        type="email"
        placeholder="Email address"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>
  {isRegistering ? 'Already have an account?' : 'New customer?'}
  <button
    className="register-link"
    onClick={() => setIsRegistering(!isRegistering)}
  >
    {isRegistering ? 'Login' : 'Create Account'}
  </button>
</p>
    </div>
  </div>
)}
      <nav className="navbar">
        <h1>SREE VASTHRA</h1>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#products">Collections</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
  
        <a href="#cart" className="cart-btn">
          🛒 Cart ({cartCount})
        </a>
        {user ? (
  <div className="user-menu">
    <span>Welcome, {user.name}!</span>
    <button
      className="login-nav-btn"
      onClick={() => setUser(null)}
    >
      Logout
    </button>
  </div>
) : (
  <button
    className="login-nav-btn"
    onClick={() => setShowLogin(true)}
  >
    Login
  </button>
)}
      </nav>

<section className="hero">
  <div className="hero-content">
    <button
      onClick={() =>
        document.getElementById('products').scrollIntoView({
          behavior: 'smooth',
        })
      }
    >
      Shop Collection
    </button>
  </div>
</section>

      <section id="products" className="products">
        <h2>Our Collection</h2>
        <p>Discover elegance in every design.</p>
        <div className="category-buttons">
          {categories.map((category) => (
            <button
             key={category}
             className={selectedCategory === category ? 'active' : ''}
             onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <div className="product-info">
                <span className="category">{product.category}</span>

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <h4>₹{product.price.toLocaleString('en-IN')}</h4>

                <button onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="cart" className="cart-section">
        <h2>Your Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty. Explore our collections!</p>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    ₹{item.price.toLocaleString('en-IN')} × {item.quantity}
                  </p>
                </div>

                <button onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}

            <h3>
              Total: ₹{total.toLocaleString('en-IN')}
            </h3>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        )}
      </section>

      <section id="about" className="about">
        <h2>About Sree Vasthra</h2>

        <p>
          Sree Vasthra brings together tradition and modern elegance.
          Explore beautiful clothing designed to make every occasion special.
        </p>
      </section>

      <footer id="contact">
        <h2>SREE VASTHRA</h2>

        <p>Elegance woven into every thread.</p>

        <p>© 2026 Sree Vasthra | All Rights Reserved</p>
      </footer>
    </div>
  )
}

export default App