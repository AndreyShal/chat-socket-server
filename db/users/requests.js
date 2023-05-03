import { User } from "../db.js";

export async function getUsers() {
  const res = await User.findAll();
  return res;
}

export const createUsers = (author_id_value, username_value, password_value) =>
  User.sync({ alter: true })
    .then(() => {
      return User.create({
        author_id: author_id_value,
        username: username_value,
        password: password_value,
      });
    })
    .catch((err) => {
      console.log(err);
    });
