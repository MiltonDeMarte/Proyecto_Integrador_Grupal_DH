const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");

const usersJSON = path.join(__dirname, "../database/usuarios.json");
const users = JSON.parse(fs.readFileSync(usersJSON, "utf-8"));

function saveUsers() {
  const to_text = JSON.stringify(users, null, 4);
  fs.writeFileSync(usersJSON, to_text, "utf-8");
}

module.exports = {
  getAll() {
    return users;
  },

  findOne(id) {
    const user = users.find((usuario) => {
      return usuario.id == id;
    });
    return user;
  },

  findEmail(email) {
    const user = users.find((user) => {
      return user.email == email;
    });
    return user;
  },

  create(body, file) {
    const user_to_create = {
      id: Date.now(),
      ...body,
      password: bcryptjs.hashSync(body.password, 10),
      user_image : file
    };

    users.push(user_to_create);

    saveUsers();
  },

  update(id, body, file) {
    const index = users.findIndex((user) => {
      return user.id == id;
    });
    
    const user_to_update = {
      id: users[index].id,
      user_image: users[index].user_image,
      ...body,
    };

    users[index] = user_to_update;

    saveUsers();
  },

  destroy(id) {
    const index = users.findIndex((user) => {
      return user.id == id;
    });

    users.splice(index, 1);

    saveUsers();
  }
};
