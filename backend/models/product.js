import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "hardware",
  charset: "utf8mb4",
};

const connection = await mysql.createConnection(config);

export class ProductModel {
  static async SearchProducts(query) {
    const searchTerm = `%${query}%`;
    const [results] = await connection.query(
      `
            SELECT 'CPU' as tipo_producto, id, product, stock, image, price FROM cpu 
            WHERE LOWER(product) LIKE LOWER(?) OR SOUNDEX(product) = SOUNDEX(?) 
            UNION ALL 
            SELECT 'DISK' as tipo_producto, id, product, stock, image, price FROM disk 
            WHERE LOWER(product) LIKE LOWER(?) OR SOUNDEX(product) = SOUNDEX(?) 
            UNION ALL 
            SELECT 'GRAPHICS_CARD' as tipo_producto, id, product, stock, image, price FROM graphics_card 
            WHERE LOWER(product) LIKE LOWER(?) OR SOUNDEX(product) = SOUNDEX(?) 
            UNION ALL 
            SELECT 'CASE_PC' as tipo_producto, id, product, stock, image, price FROM case_pc 
            WHERE LOWER(product) LIKE LOWER(?) OR SOUNDEX(product) = SOUNDEX(?) 
            UNION ALL 
            SELECT 'MOTHERBOARD' as tipo_producto, id, product, stock, image, price FROM motherboard 
            WHERE LOWER(product) LIKE LOWER(?) OR SOUNDEX(product) = SOUNDEX(?) 
            UNION ALL 
            SELECT 'POWER_SUPPLY' as tipo_producto, id, product, stock, image, price FROM power_supply 
            WHERE LOWER(product) LIKE LOWER(?) OR SOUNDEX(product) = SOUNDEX(?) 
            UNION ALL 
            SELECT 'RAM' as tipo_producto, id, product, stock, image, price FROM ram 
            WHERE LOWER(product) LIKE LOWER(?) OR SOUNDEX(product) = SOUNDEX(?) 
            ORDER BY tipo_producto, product;
        `,
      [
        searchTerm,
        query, // CPU
        searchTerm,
        query, // DISK
        searchTerm,
        query, // GRAPHICS_CARD
        searchTerm,
        query, // CASE_PC
        searchTerm,
        query, // MOTHERBOARD
        searchTerm,
        query, // POWER_SUPPLY
        searchTerm,
        query, // RAM
      ]
    );

    return results;
  }

  static async GetAllProducts() {
    const [products] = await connection.query(`
            SELECT 'CPU' as tipo_producto, id, product, stock, image, price FROM cpu 
            UNION ALL 
            SELECT 'DISK' as tipo_producto, id, product, stock, image, price FROM disk 
            UNION ALL 
            SELECT 'GRAPHICS_CARD' as tipo_producto, id, product, stock, image, price FROM graphics_card 
            UNION ALL 
            SELECT 'CASE_PC' as tipo_producto, id, product, stock, image, price FROM case_pc 
            UNION ALL 
            SELECT 'MOTHERBOARD' as tipo_producto, id, product, stock, image, price FROM motherboard 
            UNION ALL 
            SELECT 'POWER_SUPPLY' as tipo_producto, id, product, stock, image, price FROM power_supply 
            UNION ALL 
            SELECT 'RAM' as tipo_producto, id, product, stock, image, price FROM ram 
            ORDER BY tipo_producto, product;
        `);
    return products;
  }

  static async GetByProduct(product) {
    const [post] = await connection.query(`SELECT * FROM ${product};`);

    return post;
  }

  static async GetProductByID(product, id) {
    const [post] = await connection.query(
      `SELECT * FROM ${product} WHERE id = ?;`,
      [id]
    );

    return post;
  }

  static async PostProductByCategory(product, body) {
    const keys = Object.keys(body);
    const values = Object.values(body);
    const columns = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const query = `INSERT INTO ${product} (${columns}) VALUES (${placeholders})`;

    const [result] = await connection.query(query, values);

    if (result.insertId) {
      const [newProduct] = await connection.query(
        `SELECT * FROM ${product} WHERE id = ?`,
        [result.insertId]
      );
      return newProduct[0];
    }

    return null;
  }

  static async PatchProduct(product, id, body) {
    const keys = Object.keys(body);
    const values = Object.values(body);
    const setClause = keys.map((key) => `${key} = ?`).join(", ");

    const query = `UPDATE ${product} SET ${setClause} WHERE id = ?`;

    const [result] = await connection.query(query, [...values, id]);

    return result;
  }

  static async PutProduct(product, id, body) {
    try {
      const keys = Object.keys(body);
      const values = Object.values(body);

      console.log(`Intentando actualizar ${product} con ID ${id}`);
      console.log("Cuerpo recibido para actualización:", body);
      console.log("Valores para SQL (sin ID):", values);

      const setClause = keys.map((key) => `${key} = ?`).join(", ");

      const updateQuery = `UPDATE ${product} SET ${setClause} WHERE id = ?`;
      const [updateResult] = await connection.query(updateQuery, [
        ...values,
        id,
      ]);

      if (updateResult.affectedRows === 0) {
        throw new Error("Producto no encontrado o no se pudo actualizar.");
      }

      const [rows] = await connection.query(
        `SELECT * FROM ${product} WHERE id = ?`,
        [id]
      );

      if (rows.length === 0) {
        throw new Error("Producto actualizado pero no se pudo recuperar.");
      }

      return rows[0];
    } catch (error) {
      console.error(
        `Error en ProductModel.PutProduct para ${product} con ID ${id}:`,
        error
      );
      throw error;
    }
  }

  static async DeleteProduct(product, id) {
    const [result] = await connection.query(
      `DELETE FROM ${product} WHERE id = ?;`,
      [id]
    );

    return result;
  }
}
