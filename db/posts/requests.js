import { Posts } from "../db.js";

export const createPosts = (name_value, text_value, author_id_value, socketID_value) =>
  Posts.sync({ alter: true })
    .then(() => {
      return Posts.create({ name: name_value, text: text_value, author_id: author_id_value, socketID: socketID_value });
    })
    // .then(() => {
    //   return Posts.findAll();
    // })
    .catch((err) => {
      console.log(err);
    });

export async function getPosts() {
  const res = await Posts.findAll();
  return res;
}

export const posts = await Posts.findAll();

// ..............Clean table

// await Posts.destroy({
//   truncate: true,
// });
