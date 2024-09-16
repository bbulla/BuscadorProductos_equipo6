// script.js

// Obtener elementos del DOM
const categoryFilter = document.getElementById("categoryFilter");
const cardsContainer = document.getElementById("productos");
const carritoContainer = document.getElementById("carrito");
const listaCarrito = document.getElementById("listaCarrito");
const modalDetail = document.getElementById("productDetailModal");
const saveProductButton = document.getElementById("saveProductButton");
const productForm = document.getElementById("productForm");
const sortButton = document.getElementById("sortButton");
const addProductButton = document.getElementById("addProductButton");

let products = [];
let carritoItems = [];
let sortAscending = true;
let editingProductId = null;

// URL de la API del backend
const apiUrl = 'http://localhost:3000/api/products'; 

// Cargar los productos al cargar la página
window.onload = () => {
  console.log('Página cargada');
  fetchProducts();
  attachEventListeners();
};

// Función para obtener productos del backend
function fetchProducts(params = {}) {
  let url = apiUrl;
  const queryParams = new URLSearchParams(params);
  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }
  console.log('Solicitando productos con URL:', url);
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Productos obtenidos:', data);
      products = data;
      renderProducts(products);
    })
    .catch(error => console.error('Error al obtener productos:', error));
}

// Función para renderizar los productos
function renderProducts(productsList) {
  console.log('Renderizando productos');
  cardsContainer.innerHTML =
    productsList.length === 0
      ? `<div class="notification has-text-centered"><p class="title is-4">No se encontraron productos</p></div>`
      : productsList.map((product) => renderCard(product)).join("");
  attachDragEvents();

  document.querySelectorAll(".product").forEach(($product) => {
    $product.addEventListener("click", openDetailModal);
  });
}

// Función para renderizar una tarjeta de producto
function renderCard(product) {
  console.log('Renderizando producto:', product.name, 'con imagen:', product.image);
  return `
    <div class="column is-one-quarter">
      <div class="card product accent-shadow" draggable="true" id="${product.id}" data-product-id="${product.id}">
        <div class="card-image" style="height:200px; overflow:hidden;">
          <figure class="image is-4by3">
            <img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">${product.name}</p>
              <p class="subtitle is-4">$${product.price}</p>
            </div>
          </div>
          <div class="content">${product.description}</div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item" onclick="editProduct('${product.id}', event)">Editar</a>
          <a href="#" class="card-footer-item" onclick="deleteProduct('${product.id}', event)">Eliminar</a>
        </footer>
      </div>
    </div>`;
}

// Función para abrir el modal de detalle del producto
function openDetailModal(event) {
  event.stopPropagation();

  modalDetail.classList.add("is-active");
  const productDetail = products.find((p) => p.id.toString() === event.currentTarget.id.toString());

  if (productDetail) {
    modalDetail.querySelector(".modal-card-title").textContent = productDetail.name;
    document.getElementById("modal-image").src = productDetail.image;
    document.getElementById("modal-name").textContent = productDetail.name;
    document.getElementById("modal-description").textContent = productDetail.description;
    document.getElementById("modal-price").textContent = `$${productDetail.price} USD`;
  } else {
    console.error('Producto no encontrado:', event.currentTarget.id);
  }
}

// Definir la función openModal
function openModal(modalElement) {
  modalElement.classList.add("is-active");
}

// Función para alternar el ordenamiento
sortButton.addEventListener("click", () => {
  if (sortAscending) {
    products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); // Orden ascendente
    sortButton.textContent = "Ordenar por precio ↓";
  } else {
    products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)); // Orden descendente
    sortButton.textContent = "Ordenar por precio ↑";
  }
  sortAscending = !sortAscending;
  renderProducts(products); // Renderizamos los productos después de ordenar
});

// Función para filtrar productos por categoría
categoryFilter.addEventListener("change", (event) => {
  const category = event.target.value;
  console.log('Categoría seleccionada:', category);
  if (category === "all") {
    fetchProducts();
  } else {
    fetchProducts({ category: category });
  }
});

// Función para manejar el arrastre (drag)
function attachDragEvents() {
  document.querySelectorAll(".product").forEach((product) => {
    product.addEventListener("dragstart", drag);
  });
}

function drag(event) {
  event.dataTransfer.setData("text/plain", event.currentTarget.id);
}

// Permitir soltar (drop) en el carrito
function allowDrop(event) {
  event.preventDefault();
}

carritoContainer.addEventListener("dragover", allowDrop);
carritoContainer.addEventListener("drop", drop);

// Función para manejar el drop en el carrito
function drop(event) {
  event.preventDefault();
  const productId = event.dataTransfer.getData("text/plain");
  const product = products.find((p) => p.id.toString() === productId);
  if (product) {
    const existingItem = carritoItems.find(item => item.id.toString() === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      carritoItems.push({ ...product, quantity: 1 });
    }
    renderCart();
  } else {
    console.error('Producto no encontrado para agregar al carrito:', productId);
  }
}

// Función para renderizar el carrito
function renderCart() {
  listaCarrito.innerHTML = '';

  carritoItems.forEach((item) => {
    const cartItem = `
      <div class="box my-3 accent-color" data-product-id="${item.id}">
        <div class="is-flex is-justify-content-space-between">
          <div>
            <b>${item.name}</b> - $${item.price}
            <span class="quantity">${item.quantity}</span> unidad(es)
          </div>
          <div>
            <button onclick="increaseQuantity('${item.id}', 1)">+</button>
            <button onclick="increaseQuantity('${item.id}', -1)">-</button>
          </div>
        </div>
      </div>
    `;
    listaCarrito.innerHTML += cartItem;
  });
}

// Función para incrementar o disminuir la cantidad de un producto en el carrito
function increaseQuantity(productId, change) {
  const item = carritoItems.find(item => item.id.toString() === productId);
  if (item) {
    item.quantity = Math.max(1, item.quantity + change);
    renderCart();
  }
}

// Evento para abrir el modal de agregar producto
addProductButton.addEventListener("click", () => {
  openModal(document.getElementById("productFormModal"));
  saveProductButton.textContent = "Agregar Producto";
  productForm.reset();
  editingProductId = null;
});

// Función para guardar un nuevo producto o actualizar uno existente
saveProductButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (productForm.checkValidity()) {
    const name = document.getElementById("productName").value;
    const description = document.getElementById("productDescription").value;
    const image = document.getElementById("productImage").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const category = document.getElementById("productCategory").value;

    const productData = {
      name,
      description,
      image,
      price,
      category,
    };

    if (editingProductId) {
      // Actualizar producto existente en el backend
      productData.id = editingProductId; // Incluimos el ID en el cuerpo
      fetch(`${apiUrl}/${editingProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Error ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then(updatedProduct => {
        fetchProducts();
        editingProductId = null;
        saveProductButton.textContent = "Agregar Producto";
        closeAllModals();
        productForm.reset();
      })
      .catch(error => {
        console.error('Error al actualizar el producto:', error);
        alert(`Error al actualizar el producto: ${error.message}`);
      });
    } else {
      // Crear nuevo producto en el backend
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Error ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then(newProduct => {
        fetchProducts();
        closeAllModals();
        productForm.reset();
      })
      .catch(error => {
        console.error('Error al agregar el producto:', error);
        alert(`Error al agregar el producto: ${error.message}`);
      });
    }
  } else {
    alert("Por favor, completa todos los campos.");
  }
});

// Función para cerrar los modales
function closeAllModals() {
  console.log('Cerrando modales');
  const modals = document.querySelectorAll(".modal.is-active");
  modals.forEach(modal => modal.classList.remove("is-active"));
}

// Función para editar un producto
function editProduct(productId, event) {
  event.preventDefault();
  event.stopPropagation();
  const product = products.find((p) => p.id.toString() === productId.toString());
  if (!product) {
    console.error('Producto no encontrado para editar:', productId);
    return;
  }

  console.log('Producto a editar:', product);

  document.getElementById("productName").value = product.name;
  document.getElementById("productDescription").value = product.description;
  document.getElementById("productImage").value = product.image;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productCategory").value = product.category;

  saveProductButton.textContent = "Actualizar Producto";
  editingProductId = productId;
  openModal(document.getElementById("productFormModal"));
}

// Función para eliminar un producto
function deleteProduct(productId, event) {
  event.preventDefault();
  event.stopPropagation();
  if (confirm(`¿Estás seguro de que deseas eliminar este producto?`)) {
    fetch(`${apiUrl}/${productId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }
      fetchProducts();
      carritoItems = carritoItems.filter(item => item.id.toString() !== productId);
      renderCart();
    })
    .catch(error => console.error('Error al eliminar el producto:', error));
  }
}

// Adjuntar event listeners adicionales
function attachEventListeners() {
  console.log('Listeners adjuntados');
  // Cerrar modales al hacer clic en el fondo o en el botón de cierre
  document.querySelectorAll('.modal-close, .modal-background, .delete').forEach((element) => {
    element.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Cerrar modal al presionar la tecla "Escape"
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeAllModals();
    }
  });
}
