const title = document.getElementById("titulo");

const searchInput = document.getElementById("searchInput");

const cardsContainer = document.getElementById("productos");
const carrito = document.getElementById("listaCarrito");

let webColor = "#c6c7ff";

const products = [
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with adjustable DPI.",
    price: 29.99,
    image: "https://via.placeholder.com/150?text=Wireless+Mouse",
    category: "Accessories",
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with Cherry MX switches.",
    price: 89.99,
    image: "https://via.placeholder.com/150?text=Mechanical+Keyboard",
    category: "Peripherals",
  },
  {
    name: "Gaming Headset",
    description:
      "Surround sound gaming headset with noise-cancelling microphone.",
    price: 59.99,
    image: "https://via.placeholder.com/150?text=Gaming+Headset",
    category: "Audio",
  },
  {
    name: "27-inch Monitor",
    description: "4K UHD monitor with IPS display and 144Hz refresh rate.",
    price: 329.99,
    image: "https://via.placeholder.com/150?text=27-inch+Monitor",
    category: "Displays",
  },
  {
    name: "Laptop Stand",
    description: "Adjustable aluminum laptop stand for ergonomic work setup.",
    price: 39.99,
    image: "https://via.placeholder.com/150?text=Laptop+Stand",
    category: "Accessories",
  },
  {
    name: "USB-C Hub",
    description: "Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.",
    price: 24.99,
    image: "https://via.placeholder.com/150?text=USB-C+Hub",
    category: "Peripherals",
  },
  {
    name: "External SSD",
    description:
      "Portable external SSD with 1TB storage and USB 3.1 interface.",
    price: 129.99,
    image: "https://via.placeholder.com/150?text=External+SSD",
    category: "Storage",
  },
  {
    name: "Smartphone Stand",
    description: "Adjustable smartphone stand with 360-degree rotation.",
    price: 19.99,
    image: "https://via.placeholder.com/150?text=Smartphone+Stand",
    category: "Accessories",
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 10-hour battery life.",
    price: 49.99,
    image: "https://via.placeholder.com/150?text=Bluetooth+Speaker",
    category: "Audio",
  },
  {
    name: "Webcam",
    description: "1080p HD webcam with built-in microphone and privacy cover.",
    price: 34.99,
    image: "https://via.placeholder.com/150?text=Webcam",
    category: "Peripherals",
  },
  {
    name: "Wireless Charger",
    description: "Fast wireless charger with Qi compatibility.",
    price: 25.99,
    image: "https://via.placeholder.com/150?text=Wireless+Charger",
    category: "Accessories",
  },
  {
    name: "Noise-Cancelling Headphones",
    description:
      "Over-ear noise-cancelling headphones with Bluetooth connectivity.",
    price: 199.99,
    image: "https://via.placeholder.com/150?text=Noise-Cancelling+Headphones",
    category: "Audio",
  },
  {
    name: "Smartwatch",
    description: "Smartwatch with heart rate monitor and GPS.",
    price: 149.99,
    image: "https://via.placeholder.com/150?text=Smartwatch",
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
      category === "todas"
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
      <div class="card">
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
  const product = products.find((p) => p.name === productId);
  if (product) {
    const item = document.createElement("li");
    item.textContent = product.name;
    carrito.appendChild(item);
  }
}

document.getElementById("carrito").addEventListener("dragover", allowDrop);
document.getElementById("carrito").addEventListener("drop", drop);

const categorias = ["Accessories", "Peripherals", "Audio", "Displays", "Storage", "Wearables"];

const productCategorySelect = document.getElementById("productCategory");

categorias.forEach(categoria => {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    productCategorySelect.appendChild(option);
});

document.addEventListener('DOMContentLoaded', () => {
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  document.querySelectorAll('.js-modal-trigger').forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  document.querySelectorAll('.modal-background, .delete, .modal-card-foot .button').forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });

  const saveProductButton = document.getElementById("saveProductButton");
  const productForm = document.getElementById("productForm");

  saveProductButton.addEventListener('click', () => {
    if (productForm.checkValidity()) {
      const name = document.getElementById("productName").value;
      const description = document.getElementById("productDescription").value;
      const image = document.getElementById("productImage").value;
      const price = parseFloat(document.getElementById("productPrice").value);

      const newProduct = {
        name,
        description,
        image,
        price,
        category: "Accessories",
      };

      addProductToList(newProduct);
      closeAllModals();
      productForm.reset();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  });

  function addProductToList(product) {
    products.push(product);
    renderProducts(products);
  }
});


/* Title effects */

// Confetti: https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js
title.addEventListener('click', function(e) {
  e.preventDefault();

  const rect = this.getBoundingClientRect();
  
  const x = (rect.left + rect.right) / 2 / window.innerWidth;
  const y = (rect.top + rect.bottom) / 2 / window.innerHeight;
  
  confetti({
    particleCount: 20,
    spread: 200,
    origin: { x: x, y: y }
  });
});

title.addEventListener('mouseenter', function() {
  this.style.cursor = 'pointer';
});

title.addEventListener('click', function() {
  // Genera un color random de color claro
  webColor = `hsl(${Math.random() * 360}, 100%, 80%)`;
  setAccentColors(webColor)

  const emojis = ['🚀', '🌈', '🦄', '🌟', '🎉', '🎈', '🎊', '🔥', '🎆', '💥'];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  this.textContent = "Humildify"+randomEmoji;
  
});

function setAccentColors(color) {
  const elementsColor = Array.from(document.getElementsByClassName("accent-color"));
  const elementsBackground = Array.from(document.getElementsByClassName("accent-background"));
  elementsColor.forEach(element => {
    element.style.color = color;
  });

  elementsBackground.forEach(element => {
    element.style.backgroundColor = color;
  });


}


