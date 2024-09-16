// products.mjs

import express from "express";
const router = express.Router();

let products = [
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

// GET all products or filter by category
router.get("/products", (req, res) => {
  const category = req.query.category;
  if (category && category !== 'all') {
    const filteredProducts = products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
    res.json(filteredProducts);
  } else {
    res.json(products);
  }
});

// POST a new product
router.post("/products", (req, res) => {
  const product = req.body;
  product.id = (products.length + 1).toString();
  products.push(product);
  res.status(201).json(product);
});

// DELETE a product by ID
router.delete("/products/:productId", (req, res) => {
  const productId = req.params.productId;
  const initialLength = products.length;
  products = products.filter((product) => product.id !== productId);
  if (products.length < initialLength) {
    res.json({ message: 'Producto eliminado' });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// PUT (update) a product by ID
router.put("/products/:productId", (req, res) => {
  const productId = req.params.productId;
  const updatedProduct = req.body;

  let productFound = false;
  products = products.map((product) => {
    if (product.id === productId) {
      productFound = true;
      return { ...product, ...updatedProduct, id: productId };
    }
    return product;
  });

  if (productFound) {
    res.json(products.find((product) => product.id === productId));
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

export default router;
