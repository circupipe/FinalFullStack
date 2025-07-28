import { z } from "zod";

export class UserSchemas {
  static user = z.object({
    username: z
      .string()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
      .max(50, "El nombre de usuario no puede superar los 50 caracteres"),
    email: z
      .string()
      .email("El correo electronico ingresado debe ser valido")
      .max(100, "El correo electronico no debe superar los 100 caracteres"),
    password: z.string().max(255),
    firstname: z.string().min(1, "El nombre es obligatorio").max(100),
    lastname: z.string().min(1, "El apellido es obligatorio").max(100),
    timestamp: z.coerce.date().optional(),
    type: z.enum(["user", "admin"]).default("user"),
  });
}
