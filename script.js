// Create search bar
function createSearchBar(callback) {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Search products...";
  input.addEventListener("input", (e) =>
    debounce(() => callback(e.target.value), 300)
  );
  document.body.appendChild(input);
}

// Create single product card with Add to Cart button
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;

  const title = document.createElement("h3");
  title.innerText = product.title;

  const price = document.createElement("p");
  price.innerText = `₹${Math.floor(product.price * 83)}`;

  const button = document.createElement("button");
  button.innerText = "Add to Cart";
  button.addEventListener("click", () => {
    alert(`Added "${product.title}" to cart`);
  });

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(button);
  return card;
}

// Render product list
function renderProducts(list) {
  const existing = document.querySelector(".grid-container");
  if (existing) existing.remove();

  const grid = document.createElement("div");
  grid.className = "grid-container";

  list.forEach((p) => grid.appendChild(createProductCard(p)));
  document.body.appendChild(grid);
}

// Debounce function
let timer;
function debounce(fn, delay) {
  clearTimeout(timer);
  timer = setTimeout(fn, delay);
}

// Fetch and display
let allProducts = [];

function fetchAndDisplay() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;
      renderProducts(allProducts);
    })
    .catch((err) => {
      alert("Failed to load products");
      console.error(err);
    });
}

// Filter logic
function filterProducts(query) {
  const filtered = allProducts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );
  renderProducts(filtered);
}

// Init
function init() {
  createSearchBar(filterProducts);
  fetchAndDisplay();
}

init();
