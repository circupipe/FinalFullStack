import { z } from "zod";

export class ProductSchemas {
  static cpu = z.object({
    product: z
      .string()
      .max(100, {
        message: "El nombre del producto debe tener máximo 100 caracteres",
      })
      .nonempty({ message: "Debes ingresar un Nombre" }),

    watts_consumption: z
      .number({ message: "El consumo en watts debe ser un número" })
      .int({ message: "El consumo en watts debe ser un número entero" })
      .positive({ message: "El consumo en watts debe ser positivo" })
      .optional(),

    stock: z
      .number()
      .int({ message: "El stock debe ser un número entero" })
      .nonnegative({ message: "El stock no puede ser negativo" }),

    price: z
      .number({ message: "El precio debe ser un número" })
      .positive({ message: "El precio debe ser positivo" }),

    image: z
      .string()
      .max(255, {
        message: "La URL de la imagen debe tener máximo 255 caracteres",
      })
      .optional(),

    platform: z.enum(["AMD", "Intel"], {
      message: "La plataforma debe ser AMD o Intel",
    }),

    socket: z.enum(["AM4", "LGA1200", "LGA1700", "AM5"], {
      message: "El socket debe ser AM4, LGA1200, LGA1700 o AM5",
    }),

    frequency: z
      .number({ message: "La frecuencia debe ser un número" })
      .positive({ message: "La frecuencia debe ser positiva" }),

    integrated: z
      .string({
        message: "Los gráficos integrados deben ser una cadena de texto",
      })
      .max(100, {
        message: "Los gráficos integrados deben tener máximo 100 caracteres",
      })
      .nullable()
      .optional(),
  });

  static ram = z.object({
    product: z.string().max(100, {
      message: "El nombre del producto debe tener máximo 100 caracteres",
    }),

    watts_consumption: z
      .number({ message: "El consumo en watts debe ser un número" })
      .int({ message: "El consumo en watts debe ser un número entero" })
      .positive({ message: "El consumo en watts debe ser positivo" })
      .optional(),

    stock: z
      .number()
      .int({ message: "El stock debe ser un número entero" })
      .nonnegative({ message: "El stock no puede ser negativo" }),

    price: z
      .number({ message: "El precio debe ser un número" })
      .positive({ message: "El precio debe ser positivo" }),

    image: z
      .string()
      .max(255, {
        message: "La URL de la imagen debe tener máximo 255 caracteres",
      })
      .optional(),

    type: z.enum(["DDR3", "DDR4", "DDR5"], {
      message: "El tipo debe ser DDR3, DDR4 o DDR5",
    }),

    capacity_gb: z
      .number({ message: "La capacidad en GB debe ser un número" })
      .int({ message: "La capacidad en GB debe ser un número entero" })
      .positive({ message: "La capacidad en GB debe ser positiva" }),

    speed_mhz: z
      .number({ message: "La velocidad en MHz debe ser un número" })
      .int({ message: "La velocidad en MHz debe ser un número entero" })
      .positive({ message: "La velocidad en MHz debe ser positiva" }),
  });

  static motherboard = z.object({
    product: z.string().max(100, {
      message: "El nombre del producto debe tener máximo 100 caracteres",
    }),

    watts_consumption: z
      .number({ message: "El consumo en watts debe ser un número" })
      .int({ message: "El consumo en watts debe ser un número entero" })
      .positive({ message: "El consumo en watts debe ser positivo" })
      .optional(),

    stock: z
      .number()
      .int({ message: "El stock debe ser un número entero" })
      .nonnegative({ message: "El stock no puede ser negativo" }),

    price: z
      .number({ message: "El precio debe ser un número" })
      .positive({ message: "El precio debe ser positivo" }),

    image: z
      .string()
      .max(255, {
        message: "La URL de la imagen debe tener máximo 255 caracteres",
      })
      .optional(),

    socket: z.enum(["AM4", "LGA1200", "LGA1700", "AM5"], {
      message: "El socket debe ser AM4, LGA1200, LGA1700 o AM5",
    }),

    platform: z.enum(["AMD", "Intel"], {
      message: "La plataforma debe ser AMD o Intel",
    }),

    ram_slots: z
      .number({ message: "Los slots de RAM deben ser un número" })
      .int({ message: "Los slots de RAM deben ser un número entero" })
      .positive({ message: "Los slots de RAM deben ser positivos" }),

    ram_type: z.enum(["DDR3", "DDR4", "DDR5"], {
      message: "El tipo de RAM debe ser DDR3, DDR4 o DDR5",
    }),
  });

  static graphics_card = z.object({
    product: z.string().max(100, {
      message: "El nombre del producto debe tener máximo 100 caracteres",
    }),

    watts_consumption: z
      .number({ message: "El consumo en watts debe ser un número" })
      .int({ message: "El consumo en watts debe ser un número entero" })
      .positive({ message: "El consumo en watts debe ser positivo" })
      .optional(),

    stock: z
      .number()
      .int({ message: "El stock debe ser un número entero" })
      .nonnegative({ message: "El stock no puede ser negativo" }),

    price: z
      .number({ message: "El precio debe ser un número" })
      .positive({ message: "El precio debe ser positivo" }),

    image: z
      .string()
      .max(255, {
        message: "La URL de la imagen debe tener máximo 255 caracteres",
      })
      .optional(),

    ram_type: z.enum(["DDR3", "DDR4", "DDR5"], {
      message: "El tipo de RAM debe ser DDR3, DDR4 o DDR5",
    }),

    capacity_gb: z
      .number({ message: "La capacidad en GB debe ser un número" })
      .int({ message: "La capacidad en GB debe ser un número entero" })
      .positive({ message: "La capacidad en GB debe ser positiva" }),
  });

  static disk = z.object({
    product: z.string().max(100, {
      message: "El nombre del producto debe tener máximo 100 caracteres",
    }),

    watts_consumption: z
      .number({ message: "El consumo en watts debe ser un número" })
      .int({ message: "El consumo en watts debe ser un número entero" })
      .positive({ message: "El consumo en watts debe ser positivo" })
      .optional(),

    stock: z
      .number()
      .int({ message: "El stock debe ser un número entero" })
      .nonnegative({ message: "El stock no puede ser negativo" }),

    price: z
      .number({ message: "El precio debe ser un número" })
      .positive({ message: "El precio debe ser positivo" }),

    image: z
      .string()
      .max(255, {
        message: "La URL de la imagen debe tener máximo 255 caracteres",
      })
      .optional(),

    capacity_gb: z
      .number({ message: "La capacidad en GB debe ser un número" })
      .int({ message: "La capacidad en GB debe ser un número entero" })
      .positive({ message: "La capacidad en GB debe ser positiva" }),

    technology: z.enum(["HDD", "SSD", "M2"], {
      message: "La tecnología debe ser HDD, SSD o M2",
    }),
  });

  static case_pc = z.object({
    product: z.string().max(100, {
      message: "El nombre del producto debe tener máximo 100 caracteres",
    }),

    stock: z
      .number()
      .int({ message: "El stock debe ser un número entero" })
      .nonnegative({ message: "El stock no puede ser negativo" }),

    price: z
      .number({ message: "El precio debe ser un número" })
      .positive({ message: "El precio debe ser positivo" }),

    image: z
      .string()
      .max(255, {
        message: "La URL de la imagen debe tener máximo 255 caracteres",
      })
      .optional(),

    colors: z
      .string({ message: "Los colores deben ser una cadena de texto" })
      .max(100, {
        message: "Los colores deben tener máximo 100 caracteres",
      })
      .optional(),
  });

  static power_supply = z.object({
    product: z.string().max(100, {
      message: "El nombre del producto debe tener máximo 100 caracteres",
    }),

    stock: z
      .number()
      .int({ message: "El stock debe ser un número entero" })
      .nonnegative({ message: "El stock no puede ser negativo" }),

    price: z
      .number({ message: "El precio debe ser un número" })
      .positive({ message: "El precio debe ser positivo" }),

    image: z
      .string()
      .max(255, {
        message: "La URL de la imagen debe tener máximo 255 caracteres",
      })
      .optional(),

    watts: z
      .number({ message: "Los watts deben ser un número" })
      .int({ message: "Los watts deben ser un número entero" })
      .positive({ message: "Los watts deben ser positivos" }),

    modular: z
      .boolean({ message: "Modular debe ser verdadero o falso" })
      .optional(),

    certification: z.enum(
      ["80 Plus Bronze", "80 Plus Gold", "80 Plus Platinum"],
      {
        message:
          "La certificación debe ser 80 Plus Bronze, 80 Plus Gold o 80 Plus Platinum",
      }
    ),
  });
}
