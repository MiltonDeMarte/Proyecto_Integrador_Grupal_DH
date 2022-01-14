const fs = require("fs");
const path = require("path");

const consolsJSON = path.join(__dirname, "../database/consolas.json");
const consols = JSON.parse(fs.readFileSync(consolsJSON, "utf-8"));

function saveProducts() {
  const to_text = JSON.stringify(consols, null, 4);
  fs.writeFileSync(consolsJSON, to_text, "utf-8");
}

module.exports = {
  getAll() {
    return consols;
  },

  findOne(id) {
    const consol = consols.find((consol) => {
      return consol.id == id;
    });
    return consol;
  },

  create(body, files) {
    const consol_to_create = {
      id: Date.now(),
      ...body,
      consol_image: files.consol_image.filename,
      logo: files.logo.filename,
    };

    consols.push(consol_to_create);

    saveProducts();
  },

  update(id, body, files) {
    const index = consols.findIndex((consol) => {
      return consol.id == id;
    });

    const logo_filename = files == true && files.logo == true ? files.logo.filename : consols[index].logo;

    const consol_image_filename = files == true && files.consol_image == true ? files.consol_image.filename : consols[index].consol_image;

    const product_to_update = {
      id: consols[index].id,
      ...body,
      consol_image: consol_image_filename,
      logo: logo_filename,
      family: consols[index].family,
    };
    consols[index] = product_to_update;

    saveProducts();
  },

  destroy(id) {
    index = consols.findIndex((consol) => {
      return consol.id == id;
    });

    consols.splice(index, 1);

    saveProducts();
  },
};
