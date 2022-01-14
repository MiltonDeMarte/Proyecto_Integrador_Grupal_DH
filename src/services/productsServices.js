const req = require("express/lib/request");
const fs = require("fs");
const path = require("path");

const productsJSON = path.join(__dirname, "../database/productos.json");
const products = JSON.parse(fs.readFileSync(productsJSON, "utf-8"));

function saveProducts() {
  const to_text = JSON.stringify(products, null, 4);
  fs.writeFileSync(productsJSON, to_text, "utf-8");
}

module.exports = {
  getAll() {
    return products;
  },

  findOne(id) {
    const product = products.find((producto) => {
      return producto.id == id;
    });
    return product;
  },

  create(body, file) {
    const product_to_create = {
      id: Date.now(),
      ...body,
      product_image: file,
    };

    products.push(product_to_create);

    saveProducts();
  },

  update(id, body, file) {
    const index = products.findIndex((producto) => {
      return producto.id == id;
    });
    
    if (!file) {
      file = products[index].product_image;
    }

    product_to_update = {
      id: products[index].id,
      ...body,
      product_image: file,
    };

    products[index] = product_to_update;

    saveProducts();
  },

  destroy(id) {
    const index = products.findIndex((product) => {
      return product.id == id;
    });

    products.splice(index, 1);

    saveProducts();
  },
};
