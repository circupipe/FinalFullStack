import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

const config = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "hardware",
  charset: "utf8mb4",
};

const connection = await mysql.createConnection(config);

export class UserModel {
  static async getAll() {
    const [users] = await connection.query(`SELECT * FROM user;`);
    return users;
  }

  static async getById(id) {
    const [user] = await connection.query(`SELECT * FROM user WHERE id = ?;`, [
      id,
    ]);
    return user[0];
  }

  static async getByUserName(username) {
    const [user] = await connection.query(
      `SELECT * FROM user WHERE username = ?;`,
      [username]
    );
    return user[0];
  }

  static async create({
    username,
    email,
    password,
    firstname,
    lastname,
    type = "user",
  }) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO user (username, email, password, firstname, lastname, type)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await connection.query(query, [
      username,
      email,
      hashedPassword,
      firstname,
      lastname,
      type,
    ]);
    return result;
  }

  static async update(id, { username, email, password, firstname, lastname, type }) {

    const saltRounds = 10;
    const hashedPassword = password
      ? await bcrypt.hash(password, saltRounds)
      : password;

    const query = `
      UPDATE user
      SET username = ?, email = ?, password = ?, firstname = ?, lastname = ?, type = ?
      WHERE id = ?
    `;
    const [result] = await connection.query(query, [
      username,
      email,
      hashedPassword,
      firstname,
      lastname,
      type,
      id,
    ]);
    return result;
  }

  static async put(
    id,
    { username, email, password, firstname, lastname, type }
  ) {

    return await this.update(id, {
      username,
      email,
      password,
      firstname,
      lastname,
      type,
    });
  }

  static async patch(id, fields) {

    const allowed = [
      "username",
      "email",
      "password",
      "firstname",
      "lastname",
      "type",
    ];
    const keys = Object.keys(fields).filter((key) => allowed.includes(key));
    if (keys.length === 0) return null;


    if (fields.password) {
      const saltRounds = 10;
      fields.password = await bcrypt.hash(fields.password, saltRounds);
    }

    const values = keys.map((key) => fields[key]);
    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const query = `UPDATE user SET ${setClause} WHERE id = ?`;
    const [result] = await connection.query(query, [...values, id]);
    return result;
  }

  static async delete(id) {
    const [result] = await connection.query(`DELETE FROM user WHERE id = ?;`, [
      id,
    ]);
    return result;
  }
}
