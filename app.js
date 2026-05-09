const categoryBrands = {
  "Shoes": ["Nike", "Adidas", "Puma", "Reebok"],
  "Clothing": ["Zara", "H&M", "Uniqlo", "Levi's"],
  "Electronics": ["Apple", "Samsung", "Sony", "Dell"],
  "Accessories": ["Ray-Ban", "Fossil", "Michael Kors"],
  "Home": ["IKEA", "Philips", "Samsung Home"],
  "Beauty": ["Dior", "Fenty", "Maybelline"],
  "Sports": ["Nike", "Adidas", "Under Armour"],
  "Books": ["Penguin", "HarperCollins"],
  "Toys": ["Lego", "Hasbro"],
  "Automotive": ["Tesla", "BMW", "Toyota"],
  "Gaming": ["Sony", "Microsoft", "Nintendo"],
  "Fitness": ["Decathlon", "ProForm"],
  "Jewelry": ["Cartier", "Pandora"],
  "Watches": ["Rolex", "Casio", "Apple"],
  "Bags": ["Gucci", "Louis Vuitton", "Prada"],
  "Office": ["HP", "Canon"],
  "Garden": ["Bosch", "Gardena"],
  "Pet Supplies": ["Pedigree", "Purina"],
  "Health": ["NatureMade", "Centrum"],
  "Music": ["Yamaha", "Fender"],
  "Baby Products": ["Johnson's", "Pampers"],
  "Groceries": ["Nestle", "Coca-Cola"],
  "Furniture": ["Ashley", "IKEA"],
  "Lighting": ["Philips", "GE"],
  "Tools": ["DeWalt", "Makita"],
  "Stationery": ["Staples", "PaperMate"],
  "Travel": ["Samsonite", "American Tourister"],
  "Outdoor": ["Columbia", "The North Face"],
  "Kitchen": ["Tefal", "KitchenAid"],
  "Appliances": ["LG", "Whirlpool"],
  "Phones": ["Apple", "Samsung", "Xiaomi"],
  "Laptops": ["Dell", "HP", "Apple"],
  "Tablets": ["Apple", "Samsung"],
  "Cameras": ["Canon", "Nikon", "Sony"],
  "Smart Home": ["Google", "Amazon", "Philips"],
  "Gaming Accessories": ["Razer", "Logitech"],
  "Footwear": ["Nike", "Adidas"],
  "Luxury": ["Gucci", "Rolex"],
  "Streaming": ["Amazon", "Roku"],
  "Networking": ["TP-Link", "Cisco"]
};


const products = [];
let id = 1;

Object.keys(categoryBrands).forEach(category => {
  const brands = categoryBrands[category];

  for (let i = 1; i <= 12; i++) {   // 12 per category (adjust if needed)
    const brand = brands[Math.floor(Math.random() * brands.length)];

    products.push({
      id: id++,
      name: `${brand} ${category} Model ${i}`,
      price: Math.floor(Math.random() * 1000) + 20,
      category: category,
      brand: brand,
      image: `https://source.unsplash.com/300x300/?${category.toLowerCase()}`,
      stock: Math.random() > 0.15,
      rating: (Math.random() * 5).toFixed(1),
      reviews: Math.floor(Math.random() * 500)
    });
  }
});

/* DISPLAY PRODUCTS */
if (document.getElementById("product-list")) {
  displayProducts(products);
}

function displayProducts(list) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  list.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <a href="product.html?id=${p.id}">
          <img src="${p.image}">
          <h3>${p.name}</h3>
        </a>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

function displayProducts(list) {

    const container = document.getElementById("product-list");

    if (!container) return;

    container.innerHTML = "";

    list.forEach(p => {

        container.innerHTML += `

        <div class="product">

            <span class="badge">Hot</span>

            <a href="product.html?id=${p.id}">
                <img src="${p.image}">
            </a>

            <div class="product-content">

                <h3>${p.name}</h3>

                <p>${p.brand}</p>

                <div class="rating">
                    ⭐ ${p.rating} (${p.reviews})
                </div>

                <p class="price">$${p.price}</p>

                <button onclick="addToCart(${p.id})">
                    Add to Cart
                </button>

            </div>

        </div>

        `;
    });
}

/* SEARCH */
function searchProducts() {
  const value = document.getElementById("search").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(value));
  displayProducts(filtered);
}

/* FILTERS */
function applyFilters() {
  let filtered = [...products];

  const category = document.getElementById("categoryFilter").value;
  const price = document.getElementById("priceFilter").value;

  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }

  if (price) {
    const [min, max] = price.split("-").map(Number);
    filtered = filtered.filter(p => p.price >= min && p.price <= (max || 10000));
  }

  displayProducts(filtered);
}

/* CART */
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function addToCart(id) {
  let cart = getCart();
  const item = cart.find(p => p.id === id);

  if (item) item.qty++;
  else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

/* PRODUCT DETAILS */
if (document.getElementById("product-details")) {
  const id = new URLSearchParams(window.location.search).get("id");
  const p = products.find(x => x.id == id);

  document.getElementById("product-details").innerHTML = `
    <div class="product">
      <img src="${p.image}">
      <h2>${p.name}</h2>
      <p>$${p.price}</p>
      <p>${p.stock ? "In Stock" : "Out of Stock"}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `;
}

//   CART SYSTEM

// GET CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SAVE CART
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ADD TO CART
function addToCart(id) {

    const product = products.find(p => p.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            ...product,
            qty: 1
        });
    }

    saveCart();

    alert(product.name + " added to cart");
}

// DISPLAY CART
function displayCart() {

    const container = document.getElementById("cart-items");

    if (!container) return;

    container.innerHTML = "";

    let total = 0;

    cart.forEach((item, i) => {

        total += item.price * item.qty;

        container.innerHTML += `

        <div class="cart-item">

            <div class="cart-info">

                <img src="${item.image}">

                <div class="cart-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                </div>

            </div>

            <div class="cart-controls">

                <button class="qty-btn" onclick="updateQty(${i}, -1)">
                    -
                </button>

                <span class="qty">${item.qty}</span>

                <button class="qty-btn" onclick="updateQty(${i}, 1)">
                    +
                </button>

                <button class="remove-btn" onclick="removeItem(${i})">
                    Remove
                </button>

            </div>

        </div>

        `;
    });

    document.getElementById("total").innerText =
        `Total: $${total}`;
}

// UPDATE QUANTITY
function updateQty(index, change) {

    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    saveCart();

    displayCart();
}

// REMOVE ITEM
function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();
}

// CHECKOUT
function goToCheckout() {
    window.location.href = "checkout.html";
}

// PLACE ORDER
function placeOrder() {

    alert("Payment Successful!");

    localStorage.removeItem("cart");

    window.location.href = "index.html";
}

// LOAD CART PAGE
displayCart();

/* CHECKOUT */
function goToCheckout() {
  window.location.href = "checkout.html";
}

function placeOrder() {
  localStorage.removeItem("cart");
  alert("Payment Successful!");
  window.location.href = "index.html";
}

// AUTO-FILL CATEGORY DROPDOWN
const categoryFilter = document.getElementById("categoryFilter");

if (categoryFilter) {
  Object.keys(categoryBrands).forEach(cat => {
    categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}

container.innerHTML += `
<div class="product">

    <span class="badge">Hot</span>

    <a href="product.html?id=${p.id}">
        <img src="${p.image}">
    </a>

    <div class="product-content">

        <h3>${p.name}</h3>

        <p>${p.brand}</p>

        <div class="rating">
            ⭐ ${p.rating} (${p.reviews})
        </div>

        <p class="price">$${p.price}</p>

        <button onclick="addToCart(${p.id})">
            Add to Cart
        </button>

    </div>

</div>
`;

