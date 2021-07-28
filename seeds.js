const User = require("./src/app/models/User");
const Chef = require("./src/app/models/User");
const Recipe = require("./src/app/models/User");

const faker = require("faker");

const { hash } = require("bcryptjs");

let usersIds = [];
let totalChefs = 10;

async function createUsers() {
  const users = [];
  const password = await hash("123", 8);

  while (users.length < 5) {
    users.push({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email().toLowerCase(),
      password,
      is_admin: faker.datatype.boolean(),
    });
  }

  const usersPromise = users.map((user) => User.create(user));

  usersIds = await Promise.all(usersPromise);
}

// async function createChefs() {
//   const chefs = [];

//   while (chefs.length < totalChefs) {
//     chefs.push({
//       file_id: 1,
//       name: "",
//     });
//   }
// }

createUsers();
