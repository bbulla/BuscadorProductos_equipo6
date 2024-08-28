const title = document.getElementById("titulo");

const searchInput = document.getElementById("searchInput");

const cardsContainer = document.getElementById("productos");
const carrito = document.getElementById("listaCarrito");
const modalDetail = document.getElementById("modal-detail");

let webColor = "#c6c7ff";

const products = [
  {
    name: "Mouse Inalámbrico",
    description: "Mouse ergonómico inalámbrico con DPI ajustable.",
    price: 29.99,
    image:
      "https://f.fcdn.app/imgs/3e4c97/www.zonatecno.com.uy/zoteuy/6f3c/original/catalogo/100041_100041_1/2000-2000/mouse-inalambrico-havit-hv-ms76gt-1600dpi-black-mouse-inalambrico-havit-hv-ms76gt-1600dpi-black.jpg",
    category: "Accesorios",
  },
  {
    name: "Teclado Mecánico",
    description:
      "Teclado mecánico retroiluminado RGB con interruptores Cherry MX.",
    price: 89.99,
    image:
      "https://http2.mlstatic.com/D_NQ_NP_667185-MLU73412738232_122023-O.webp",
    category: "Periféricos",
  },
  {
    name: "Auriculares Gaming",
    description:
      "Auriculares gaming con sonido envolvente y micrófono con cancelación de ruido.",
    price: 59.99,
    image:
      "https://f.fcdn.app/imgs/46c2e8/www.covercompany.com.uy/coveuy/c5b2/original/catalogo/2-4551_11535_1/2000-2000/auriculares-inalambricos-jbl-tune-770nc-c-cancelacion-de-ruido-black.jpg",
    category: "Audio",
  },
  {
    name: "Monitor de 27 pulgadas",
    description: "Monitor 4K UHD con pantalla IPS y tasa de refresco de 144Hz.",
    price: 329.99,
    image:
      "https://http2.mlstatic.com/D_NQ_NP_735145-MLA48131216536_112021-O.webp",
    category: "Pantallas",
  },
  {
    name: "Soporte para Laptop",
    description:
      "Soporte ajustable de aluminio para una configuración ergonómica.",
    price: 39.99,
    image:
      "https://clever.uy/cdn/shop/products/D_797687-MLU48505835167_122021-O_600x600.jpg?v=1639603123",
    category: "Accesorios",
  },
  {
    name: "Hub USB-C",
    description:
      "Hub multi-puerto USB-C con HDMI, USB 3.0 y lector de tarjetas SD.",
    price: 24.99,
    image: "https://m.media-amazon.com/images/I/61S7Asj36AL._AC_SL1500_.jpg",
    category: "Periféricos",
  },
  {
    name: "SSD Externo",
    description: "SSD externo portátil con 1TB de almacenamiento y USB 3.1.",
    price: 129.99,
    image:
      "https://pronet.uy/wp-content/uploads/SSD-Externo-1TB-Kingston-XS1000-pronet.jpg",
    category: "Almacenamiento",
  },
  {
    name: "Soporte para Smartphone",
    description:
      "Soporte ajustable para smartphone con rotación de 360 grados.",
    price: 19.99,
    image:
      "https://http2.mlstatic.com/D_NQ_NP_821020-MLU77736270331_072024-O.webp",
    category: "Accesorios",
  },
  {
    name: "Altavoz Bluetooth",
    description: "Altavoz Bluetooth portátil con 10 horas de autonomía.",
    price: 49.99,
    image:
      "https://circuit.com.uy/images/thumbs/0099742_parlante-bluetooth-doble-8-luces-40w-j2808_550.jpeg",
    category: "Audio",
  },
  {
    name: "Cámara Web",
    description:
      "Cámara web HD 1080p con micrófono incorporado y cubierta de privacidad.",
    price: 34.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXs8o1qWTFTaGVERaMIo4FKP6CkbkYD7xv_g&s",
    category: "Periféricos",
  },
  {
    name: "Cargador Inalámbrico",
    description: "Cargador inalámbrico rápido con compatibilidad Qi.",
    price: 25.99,
    image:
      "https://f.fcdn.app/imgs/a2390c/zonalaptop.com.uy/zlapuy/39f2/original/catalogo/848061060119_848061060119_1/2000-2000/cargador-inalambrico-anker-powerwave-pad-cargador-inalambrico-anker-powerwave-pad.jpg",
    category: "Accesorios",
  },
  {
    name: "Auriculares con Cancelación de Ruido",
    description:
      "Auriculares con cancelación de ruido y conectividad Bluetooth.",
    price: 199.99,
    image: "https://m.media-amazon.com/images/I/51Ltm3tbH2L.jpg",
    category: "Audio",
  },
  {
    name: "Reloj Inteligente",
    description: "Reloj inteligente con monitor de ritmo cardíaco y GPS.",
    price: 149.99,
    image:
      "https://prod-resize.tiendainglesa.com.uy/images/medium/P571137-2.jpg?20240219094552,Smartwatch-S8-Negro-en-Tienda-Inglesa",
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

function openDetailModal(product) {
  product.stopPropagation();

  modalDetail.classList.add("is-active");
  const productDetail = products.find((p) => p.name === product.target.id);

  modalDetail.querySelector(".modal-card-title").textContent =
    productDetail.name;
  document.getElementById("modal-image").src = productDetail.image;
  document.getElementById("modal-description").textContent =
    productDetail.description;
  document.getElementById(
    "modal-price"
  ).textContent = `${productDetail.price} USD`;
}

function renderProducts(products) {
  cardsContainer.innerHTML =
    products.length === 0
      ? `<div class="notification has-text-centered"><p class="title is-4">No se encontraron productos</p></div>`
      : products.map((product) => renderCard(product)).join("");
  attachDragEvents();

  document.querySelectorAll(".product").forEach(($product) => {
    $product.addEventListener("click", openDetailModal);
  });
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
    const item = document.createElement("div");
    item.innerHTML = `<div class="box my-3 accent-color"><b>${product.name}</b></div>`;
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

categorias.forEach((categoria) => {
  const option = document.createElement("option");
  option.value = categoria;
  option.textContent = categoria;
  productCategorySelect.appendChild(option);
});

document.addEventListener("DOMContentLoaded", () => {
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  document.querySelectorAll(".js-modal-trigger").forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  document
    .querySelectorAll(".modal-background, .delete, .modal-card-foot .button")
    .forEach(($close) => {
      const $target = $close.closest(".modal");

      $close.addEventListener("click", () => {
        closeModal($target);
      });
    });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });

  const saveProductButton = document.getElementById("saveProductButton");
  const productForm = document.getElementById("productForm");

  saveProductButton.addEventListener("click", () => {
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
      alert("Por favor, completa todos los campos.");
    }
  });

  function addProductToList(product) {
    products.push(product);
    renderProducts(products);
  }
});

// Confetti: https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js
title.addEventListener("click", function (e) {
  e.preventDefault();

  const rect = this.getBoundingClientRect();

  const x = (rect.left + rect.right) / 2 / window.innerWidth;
  const y = (rect.top + rect.bottom) / 2 / window.innerHeight;

  confetti({
    particleCount: 20,
    spread: 200,
    origin: { x: x, y: y },
  });
});

title.addEventListener("click", function () {
  webColor = `hsl(${Math.random() * 360}, 100%, 80%)`;
  setAccentColors(webColor);

  const emojis = ["🚀", "🌈", "🦄", "🌟", "🎉", "🎈", "🎊", "🔥", "💥", "🌲"];

  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  this.textContent = "Humildify " + randomEmoji;
});

function setAccentColors(color) {
  const elementsColor = Array.from(
    document.getElementsByClassName("accent-color")
  );
  const elementsBackground = Array.from(
    document.getElementsByClassName("accent-background")
  );
  const elementsShadow = Array.from(
    document.getElementsByClassName("accent-shadow")
  );

  elementsColor.forEach((element) => {
    element.style.color = color;
  });

  elementsBackground.forEach((element) => {
    element.style.backgroundColor = color;
  });

  elementsShadow.forEach((element) => {
    element.style.boxShadow = `0px 0px 20px -8px ${color}`;
  });

  elementsShadow.forEach((element) => {
    element.addEventListener("focus", () => {
      element.style.borderColor = color;
    });

    element.addEventListener("blur", () => {
      element.style.borderColor = "";
    });
  });
}

function renderCard(product) {
  return `
    <div class="cell product" draggable="true" id="${product.name}" data-product-id="${product.name}">
      <div class="card accent-shadow">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${product.image}" class=""full-width alt="${product.name}" />
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
