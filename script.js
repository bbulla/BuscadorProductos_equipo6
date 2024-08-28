const title = document.getElementById("titulo");

const searchInput = document.getElementById("searchInput");

const cardsContainer = document.getElementById("productos");
const carrito = document.getElementById("listaCarrito");

let webColor = "#c6c7ff";

const products = [
  {
    name: "Mouse Inalámbrico",
    description: "Mouse ergonómico inalámbrico con DPI ajustable.",
    price: 29.99,
    image: "https://f.fcdn.app/imgs/3e4c97/www.zonatecno.com.uy/zoteuy/6f3c/original/catalogo/100041_100041_1/2000-2000/mouse-inalambrico-havit-hv-ms76gt-1600dpi-black-mouse-inalambrico-havit-hv-ms76gt-1600dpi-black.jpg",
    category: "Accesorios",
  },
  {
    name: "Teclado Mecánico",
    description: "Teclado mecánico retroiluminado RGB con interruptores Cherry MX.",
    price: 89.99,
    image: "https://http2.mlstatic.com/D_NQ_NP_667185-MLU73412738232_122023-O.webp",
    category: "Periféricos",
  },
  {
    name: "Auriculares Gaming",
    description: "Auriculares gaming con sonido envolvente y micrófono con cancelación de ruido.",
    price: 59.99,
    image: "https://f.fcdn.app/imgs/46c2e8/www.covercompany.com.uy/coveuy/c5b2/original/catalogo/2-4551_11535_1/2000-2000/auriculares-inalambricos-jbl-tune-770nc-c-cancelacion-de-ruido-black.jpg",
    category: "Audio",
  },
  {
    name: "Monitor de 27 pulgadas",
    description: "Monitor 4K UHD con pantalla IPS y tasa de refresco de 144Hz.",
    price: 329.99,
    image: "https://http2.mlstatic.com/D_NQ_NP_735145-MLA48131216536_112021-O.webp",
    category: "Pantallas",
  },
  {
    name: "Soporte para Laptop",
    description: "Soporte ajustable de aluminio para una configuración ergonómica.",
    price: 39.99,
    image: "https://clever.uy/cdn/shop/products/D_797687-MLU48505835167_122021-O_600x600.jpg?v=1639603123",
    category: "Accesorios",
  },
  {
    name: "Hub USB-C",
    description: "Hub multi-puerto USB-C con HDMI, USB 3.0 y lector de tarjetas SD.",
    price: 24.99,
    image: "https://m.media-amazon.com/images/I/61S7Asj36AL._AC_SL1500_.jpg",
    category: "Periféricos",
  },
  {
    name: "SSD Externo",
    description: "SSD externo portátil con 1TB de almacenamiento y USB 3.1.",
    price: 129.99,
    image: "https://pronet.uy/wp-content/uploads/SSD-Externo-1TB-Kingston-XS1000-pronet.jpg",
    category: "Almacenamiento",
  },
  {
    name: "Soporte para Smartphone",
    description: "Soporte ajustable para smartphone con rotación de 360 grados.",
    price: 19.99,
    image: "https://http2.mlstatic.com/D_NQ_NP_821020-MLU77736270331_072024-O.webp",
    category: "Accesorios",
  },
  {
    name: "Altavoz Bluetooth",
    description: "Altavoz Bluetooth portátil con 10 horas de autonomía.",
    price: 49.99,
    image: "https://circuit.com.uy/images/thumbs/0099742_parlante-bluetooth-doble-8-luces-40w-j2808_550.jpeg",
    category: "Audio",
  },
  {
    name: "Cámara Web",
    description: "Cámara web HD 1080p con micrófono incorporado y cubierta de privacidad.",
    price: 34.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXs8o1qWTFTaGVERaMIo4FKP6CkbkYD7xv_g&s",
    category: "Periféricos",
  },
  {
    name: "Cargador Inalámbrico",
    description: "Cargador inalámbrico rápido con compatibilidad Qi.",
    price: 25.99,
    image: "https://f.fcdn.app/imgs/a2390c/zonalaptop.com.uy/zlapuy/39f2/original/catalogo/848061060119_848061060119_1/2000-2000/cargador-inalambrico-anker-powerwave-pad-cargador-inalambrico-anker-powerwave-pad.jpg",
    category: "Accesorios",
  },
  {
    name: "Auriculares con Cancelación de Ruido",
    description: "Auriculares con cancelación de ruido y conectividad Bluetooth.",
    price: 199.99,
    image: "https://m.media-amazon.com/images/I/51Ltm3tbH2L.jpg",
    category: "Audio",
  },
  {
    name: "Reloj Inteligente",
    description: "Reloj inteligente con monitor de ritmo cardíaco y GPS.",
    price: 149.99,
    image: "https://prod-resize.tiendainglesa.com.uy/images/medium/P571137-2.jpg?20240219094552,Smartwatch-S8-Negro-en-Tienda-Inglesa",
    category: "Wearables",
  },
];


window.onload = () => {
  renderProducts(products);
};

document.getElementById("searchButton").addEventListener("click", () => {
  const text = searchInput.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(text)
  );
  renderProducts(filteredProducts);
});


searchInput.addEventListener("input", (event) => {
  const text = searchInput.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(text)
  );
  renderProducts(filteredProducts);
});

document.getElementById("dropdown").addEventListener("click", () => {
  document.getElementById("dropdown").classList.toggle("is-active");
});

document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    const sortType = item.getAttribute("data-sort");
    let sortedProducts = [...products];
    if (sortType === "price-asc")
      sortedProducts.sort((a, b) => a.price - b.price);
    else if (sortType === "price-desc")
      sortedProducts.sort((a, b) => b.price - a.price);
    renderProducts(sortedProducts);
  });
});

document.getElementById("dropdown-categoria").addEventListener("click", () => {
  document.getElementById("dropdown-categoria").classList.toggle("is-active");
});

document.querySelectorAll(".item-categoria").forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    const category = item.getAttribute("data-sort");
    const filteredProducts =
      category === "Todas"
        ? products
        : products.filter((product) => product.category === category);
    renderProducts(filteredProducts);
  });
});

function renderProducts(products) {
  cardsContainer.innerHTML =
    products.length === 0
      ? `<div class="notification has-text-centered"><p class="title is-4">No se encontraron productos</p></div>`
      : products.map((product) => renderCard(product)).join("");
  attachDragEvents();
}

function renderCard(product) {
  return `
    <div class="cell product" draggable="true" data-product-id="${product.name}">
      <div class="card accent-shadow">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${product.image}" alt="${product.name}" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">${product.name}</p>
              <p class="subtitle is-4">${product.price}</p>
            </div>
          </div>
          <div class="content">${product.description}</div>
        </div>
      </div>
    </div>`;
}

function attachDragEvents() {
  document.querySelectorAll(".product").forEach((product) => {
    product.addEventListener("dragstart", drag);
  });
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.dataset.productId);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const productId = event.dataTransfer.getData("text");
  const product = products.find(p => p.name === productId);

  // Siempre añadir el producto al carrito, permitiendo duplicados
  if (product) {
    const item = document.createElement("div");
    item.className = "box my-3 accent-color";
    item.innerHTML = `<b>${product.name}</b> - $${product.price}`;
    carrito.appendChild(item);
  }
}

document.getElementById("carrito").addEventListener("dragover", allowDrop);
document.getElementById("carrito").addEventListener("drop", drop);

const categorias = [
  "Accesorios",
  "Periféricos",
  "Audio",
  "Pantallas",
  "Almacenamiento",
  "Wearables",
];

const productCategorySelect = document.getElementById("productCategory");

categorias.forEach(categoria => {
  const option = document.createElement("option");
  option.value = categoria;
  option.textContent = categoria;
  productCategorySelect.appendChild(option);
});

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  attachEventListeners();
});

function attachEventListeners() {
  document.getElementById("searchButton").addEventListener("click", filterAndRenderProducts);
  searchInput.addEventListener("input", filterAndRenderProducts);
  document.getElementById("dropdown").addEventListener("click", toggleDropdown);
  document.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", sortProducts);
  });
  document.getElementById("dropdown-categoria").addEventListener("click", toggleDropdown);
  document.querySelectorAll(".item-categoria").forEach((item) => {
    item.addEventListener("click", filterByCategory);
  });
  document.getElementById("carrito").addEventListener("dragover", allowDrop);
  document.getElementById("carrito").addEventListener("drop", drop);
  title.addEventListener('click', toggleConfetti);
}

function toggleDropdown() {
  this.classList.toggle("is-active");
}

function renderProducts(products) {
  cardsContainer.innerHTML = products.length === 0
    ? `<div class="notification has-text-centered"><p class="title is-4">No se encontraron productos</p></div>`
    : products.map(product => renderCard(product)).join("");
  attachDragEvents();
}

function attachDragEvents() {
  document.querySelectorAll(".product").forEach(product => {
    product.addEventListener("dragstart", drag);
  });
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.dataset.productId);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const productId = event.dataTransfer.getData("text");
  const product = products.find(p => p.name === productId);
  
  if (product) {
    const existingItem = carrito.querySelector(`div[data-product-id="${productId}"]`);
    if (existingItem) {
      // Si el producto ya existe en el carrito, aumenta la cantidad
      const quantityElement = existingItem.querySelector('.quantity');
      let quantity = parseInt(quantityElement.textContent);
      quantityElement.textContent = quantity + 1;
    } else {
      // Si no está en el carrito, lo añade por primera vez
      addItemToCart(product);
    }
  }
}

function addItemToCart(product) {
  const item = document.createElement("div");
  item.setAttribute('data-product-id', product.name);
  item.className = "box my-3 accent-color";
  item.innerHTML = `
    <b>${product.name}</b> - $${product.price}
    <span class="quantity">1</span> unidad(es)
    <button onclick="increaseQuantity('${product.name}', 1)">+</button>
    <button onclick="increaseQuantity('${product.name}', -1)">-</button>
  `;
  carrito.appendChild(item);
}

function increaseQuantity(productId, change) {
  const productElement = carrito.querySelector(`div[data-product-id="${productId}"]`);
  const quantityElement = productElement.querySelector('.quantity');
  let quantity = parseInt(quantityElement.textContent);
  quantity = Math.max(1, quantity + change); // Asegura que la cantidad no sea menor que 1
  quantityElement.textContent = quantity;
}


function sortProducts(event) {
  event.preventDefault();
  const sortType = this.getAttribute("data-sort");
  let sortedProducts = [...products];
  if (sortType === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortType === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  renderProducts(sortedProducts);
}

function filterByCategory(event) {
  event.preventDefault();
  const category = this.getAttribute("data-sort");
  const filteredProducts = category === "Todas"
    ? products
    : products.filter(product => product.category === category);
  renderProducts(filteredProducts);
}

function filterAndRenderProducts() {
  const text = searchInput.value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(text)
  );
  renderProducts(filteredProducts);
}

function renderCard(product) {
  return `
    <div class="cell product" draggable="true" data-product-id="${product.name}">
      <div class="card accent-shadow">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${product.image}" alt="${product.name}" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">${product.name}</p>
              <p class="subtitle is-6">$${product.price}</p>
            </div>
          </div>
          <div class="content">${product.description}</div>
        </div>
      </div>
    </div>`;
}

function toggleConfetti(e) {
  e.preventDefault();
  const rect = title.getBoundingClientRect();
  const x = (rect.left + rect.right) / 2 / window.innerWidth;
  const y = (rect.top + rect.bottom) / 2 / window.innerHeight;
  confetti({
    particleCount: 20,
    spread: 200,
    origin: { x: x, y: y }
  });
  toggleAccentColor();
}

function toggleAccentColor() {
  webColor = `hsl(${Math.random() * 360}, 100%, 80%)`;
  setAccentColors(webColor);
  title.textContent = "Humildify " + getEmoji();
}

function setAccentColors(color) {
  document.querySelectorAll(".accent-color").forEach(element => element.style.color = color);
  document.querySelectorAll(".accent-background").forEach(element => element.style.backgroundColor = color);
  document.querySelectorAll(".accent-shadow").forEach(element => element.style.boxShadow = `0px 0px 20px -8px ${color}`);
}

function getEmoji() {
  const emojis = ['🚀', '🌈', '🦄', '🌟', '🎉', '🎈', '🎊', '🔥', '💥', '🌲'];
  return emojis[Math.floor(Math.random() * emojis.length)];
}
