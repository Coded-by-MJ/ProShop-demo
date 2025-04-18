import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User 2",
    email: "admin2@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John doe",
    email: "johnny@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "mary doe",
    email: "mary@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
