import { ProductModel } from "../models/product.js";
import { ProductSchemas } from "../schemas/product.js";
import { CreateResponse } from "../utils/response.js";

export class ProductController {
	static async SearchProducts(query) {
		let response;

		if (!query || query.trim() === "") {
			response = CreateResponse(
				"GET",
				"search",
				[],
				"Término de búsqueda vacío"
			);
			return response;
		}

		try {
			const data = await ProductModel.SearchProducts(query.trim());

			if (data && data.length > 0) {
				response = CreateResponse("GET", "search", data);
			} else {
				response = CreateResponse(
					"GET",
					"search",
					[],
					"No se encontraron productos"
				);
			}
			return response;
		} catch (error) {
			console.error("Error en ProductController.SearchProducts:", error);
			return CreateResponse(
				"GET",
				"search",
				null,
				`Error interno del servidor: ${error.message}`
			);
		}
	}

	static async GetAllProducts() {
		try {
			const data = await ProductModel.GetAllProducts();
			return CreateResponse("GET", "allproducts", data);
		} catch (error) {
			console.error("Error en ProductController.GetAllProducts:", error);
			return CreateResponse(
				"GET",
				"allproducts",
				null,
				`Error interno del servidor: ${error.message}`
			);
		}
	}

	static async GetByProduct(product) {
		try {
			const data = await ProductModel.GetByProduct(product);
			return CreateResponse("GET", product, data);
		} catch (error) {
			console.error("Error en ProductController.GetByProduct:", error);
			return CreateResponse(
				"GET",
				product,
				null,
				`Error interno del servidor: ${error.message}`
			);
		}
	}

	static async GetProductByID(product, id) {
		try {
			const data = await ProductModel.GetProductByID(product, id);
			return CreateResponse("GET", product, data);
		} catch (error) {
			console.error("Error en ProductController.GetProductByID:", error);
			return CreateResponse(
				"GET",
				product,
				null,
				`Error interno del servidor: ${error.message}`
			);
		}
	}

	static async PostProductByCategory(product, body) {
		const validationBody = ProductSchemas[product]?.safeParse(body);

		if (!validationBody.success) {
			return CreateResponse("POST", product, null, validationBody.error);
		}
		try {
			const data = await ProductModel.PostProductByCategory(product, body);
			return CreateResponse("POST", product, data);
		} catch (error) {
			console.error("Error en ProductController.PostProductByCategory:", error);
			return CreateResponse(
				"POST",
				product,
				null,
				`Error interno del servidor: ${error.message}`
			);
		}
	}

	static async PatchProduct(product, id, body) {
		const validationBody = ProductSchemas[product]?.safeParse(body);

		if (!validationBody.success) {
			return CreateResponse("PATCH", product, null, validationBody.error);
		}
		try {
			const data = await ProductModel.PatchProduct(product, id, body);
			return CreateResponse("PATCH", product, data);
		} catch (error) {
			console.error("Error en ProductController.PatchProduct:", error);
			return CreateResponse(
				"PATCH",
				product,
				null,
				`Error interno del servidor: ${error.message}`
			);
		}
	}

	static async PutProduct(product, id, body) {
		const validationBody = ProductSchemas[product]?.safeParse(body);

		if (!validationBody.success) {
			return CreateResponse("PUT", product, null, validationBody.error);
		}

		try {
			const data = await ProductModel.PutProduct(product, id, body);
			return CreateResponse("PUT", product, data);
		} catch (error) {
			console.error(
				`Error en ProductController.PutProduct para ${product} con ID ${id}:`,
				error
			);
			if (error.message === "Producto no encontrado o no se pudo actualizar.") {
				return CreateResponse(
					"PUT",
					product,
					null,
					`No se encontró el producto o no se pudo actualizar: ${error.message}`
				);
			}
			return CreateResponse(
				"PUT",
				product,
				null,
				`Error interno del servidor: ${error.message}`
			);
		}
	}

	static async DeleteProduct(product, id) {
		try {
			const data = await ProductModel.DeleteProduct(product, id);
			return CreateResponse("DELETE", product, data);
		} catch (error) {
			console.error("Error en ProductController.DeleteProduct:", error);
			return CreateResponse(
				"DELETE",
				product,
				null,
				`Error interno del servidor: ${error.message}`
			);
		}
	}
}
