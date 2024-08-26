const searchInput = document.getElementById("searchInput");
const cardsContainer = document.getElementById("productos");
const carrito = document.getElementById("listaCarrito");
const products = [
  // ... (lista de productos)
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

const dropdownCategoria = document.getElementById("dropdown-categoria");
const dropdownMenuCategoria = document.getElementById(
  "dropdown-menu-categoria"
);
const dropdownItemsCategorias = document.querySelectorAll(".item-categoria");

dropdownCategoria.addEventListener("click", () => {
  dropdownCategoria.classList.toggle("is-active");
});

dropdownItemsCategorias.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    const sortType = item.getAttribute("data-sort");
    filterProductsByCategory(sortType);
  });
});

const filterProductsByCategory = (category) => {
  if (category === "todas") {
    renderProducts(products);
    return;
  } else {
    const filteredProducts = products.filter((product) => {
      return product.category === category;
    });

    renderProducts(filteredProducts);
  }
};
document.getElementById("carrito").addEventListener("dragover", allowDrop);
document.getElementById("carrito").addEventListener("drop", drop);
