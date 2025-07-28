import { Router } from "express";
import { UserController } from "../controllers/user.js";

export const UserRouter = Router();

UserRouter.get("/", async (req, res) => {
  const response = await UserController.GetByUser();
  res.status(response.code).json(response);
});

UserRouter.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  const response = await UserController.GetUserByID(id);
  res.status(response.code).json(response);
});

UserRouter.get("/username/:username", async (req, res) => {
  const { username } = req.params;
  const response = await UserController.GetUserByUserName(username);
  res.status(response.code).json(response);
});

UserRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const response = await UserController.Login({ username, password });

  if (response.code === 200) {
    const { id, username, type, email, firstname, lastname } = response.data;
    res.cookie("user", { id, username, type, email, firstname, lastname }, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
    });
  }

  res.status(response.code).json(response);
});

UserRouter.post("/logout", (req, res) => {
  res.clearCookie("user");
  res.status(200).json({ message: "Sesión cerrada correctamente" });
});

UserRouter.get("/me", (req, res) => {
  const user = req.cookies.user;
  if (!user) {
    return res.status(401).json({ error: "No estás logueado" });
  }

  res.status(200).json({ user });
});

UserRouter.post("/", async (req, res) => {
  const item = req.body;
  const response = await UserController.PostUser(item);
  res.status(response.code).json(response);
});

UserRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const item = req.body;
  const response = await UserController.PatchUser(id, item);
  res.status(response.code).json(response);
});

UserRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const item = req.body;
  const response = await UserController.PutUser(id, item);
  res.status(response.code).json(response);
});

UserRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await UserController.DeleteUser(id);
  res.status(response.code).json(response);
});
