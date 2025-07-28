import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { ProductRouter } from "./routes/product.js";
import { UserRouter } from "./routes/user.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:2001",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    return next();
  }

  if (
    req.method === "GET" &&
    (req.path.startsWith("/producto"))
  ) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    return next();
  }

  res.status(403).json({ error: "CORS policy: Not allowed by server." });
});

app.get("/", (req, res) => {
  res.send(`
    <article style="align-self: center; justify-self: center; text-align: center; width: fit-content; border: 1px solid black; padding: 20px; border-radius: 10px;">
        <h2>CircuWare</h2>
        <a href="http://localhost:3010/producto/cpu">CPUS</a></br>
        <a href="http://localhost:3010/producto/case_pc">Gabinetes</a></br>
        <a href="http://localhost:3010/producto/disk">Discos</a></br>
        <a href="http://localhost:3010/producto/graphics_card">Placas de Video</a></br>
        <a href="http://localhost:3010/producto/motherboard">Mothers</a></br>
        <a href="http://localhost:3010/producto/power_supply">Fuentes</a></br>
        <a href="http://localhost:3010/producto/ram">Memorias Ram</a></br>
    </article>
    <footer>
        <p>© 2023 TechTrash. Todos los derechos reservados.</p>
    </footer>
  `);
});

app.use("/producto", ProductRouter);
app.use("/users", UserRouter);

const server = app.listen(process.env.PORT, () => {
  console.log(`Servidor encendido en http://localhost:${server.address().port}`);
});
