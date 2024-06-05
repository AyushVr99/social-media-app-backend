const { prismaClient } = require('../library/db');
const { randomBytes, createHmac } = require("node:crypto");
const JWT = require('jsonwebtoken'); 

const JWT_SECRET = "@yushVe4m1";

class UserService {

  static createUser(firstName, lastName, email, password) {

    const salt = randomBytes(32).toString("hex");
    const hashedPassword = UserService.generateHash(salt, password);

    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        salt,
        password: hashedPassword,
      },
    });
  }

  static getUserById(id) {
    return prismaClient.user.findUnique({ where: { id } });
  }

  static generateHash(salt, password) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }
  static getUserByEmail(email) {
    return prismaClient.user.findUnique({
      where: {
        email: email
      }
    });
  }

  static async getUserToken(info) {
    const user = await UserService.getUserByEmail(info.email);
    if (!user) throw new Error("user not found");

    const userSalt = user.salt;
    const usersHashPassword = UserService.generateHash(userSalt, info.password);
  

    if (usersHashPassword !== user.password)
      throw new Error("Invalid Password! Enter correct Paasword");

    const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
    return token;
  }

  static decodingJWTToken (token) {
    return JWT.verify(token, JWT_SECRET);    
  }
}

module.exports = UserService;