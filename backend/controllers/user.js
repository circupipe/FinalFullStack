import { UserModel } from "../models/user.js";
import { UserSchemas } from "../schemas/user.js";
import { CreateResponse } from "../utils/response.js";
import bcrypt from "bcrypt";

export class UserController {
  static async GetByUser() {
    const data = await UserModel.getAll();
    return CreateResponse("GET", "user", data);
  }

  static async GetUserByID(id) {
    const data = await UserModel.getById(id);
    return CreateResponse("GET", "user", data);
  }

  static async GetUserByUserName(username) {
    const data = await UserModel.getByUserName(username);
    return CreateResponse("GET", "user", data);
  }

  static async PostUser(body) {
    const validationBody = UserSchemas.user?.safeParse(body);

    if (!validationBody.success) {
      return CreateResponse("POST", "user", null, validationBody.error);
    }
    const data = await UserModel.create(body);
    return CreateResponse("POST", "user", data);
  }

  static async PatchUser(id, body) {
    const validationBody = UserSchemas.user?.partial().safeParse(body);

    if (!validationBody.success) {
      return CreateResponse("PATCH", "user", null, validationBody.error);
    }
    const data = await UserModel.patch(id, body);
    return CreateResponse("PATCH", "user", data);
  }

  static async PutUser(id, body) {
    const validationBody = UserSchemas.user?.safeParse(body);

    if (!validationBody.success) {
      return CreateResponse("PUT", "user", null, validationBody.error);
    }
    const data = await UserModel.put(id, body);
    return CreateResponse("PUT", "user", data);
  }

  static async DeleteUser(id) {
    const data = await UserModel.delete(id);
    return CreateResponse("DELETE", "user", data);
  }

  static async Login({ username, password }) {
    const user = await UserModel.getByUserName(username);
    console.log(user);
    if (!user) {
      return CreateResponse("POST", "login", null, [
        { path: ["username"], message: "Usuario no encontrado" },
      ]);
    }
  
    const match = await bcrypt.compare(password, user.password);
    console.log("pass", password, "y userpass", user.password);
    console.log("resultado del match =", match);
    if (!match) {
      return CreateResponse("POST", "login", null, [
        { path: ["password"], message: "Contraseña incorrecta" },
      ]);
    }

    delete user.password;

    return CreateResponse("POST", "login", user);
  }
}
