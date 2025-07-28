import { Router } from "express";
import { ProductController } from "../controllers/product.js";

export const ProductRouter = Router();

ProductRouter.get("/search/:query", async (req, res) => {
    const { query } = req.params;
    const response = await ProductController.SearchProducts(query);
    res.status(response.code).json(response);
});

ProductRouter.get("/allproducts", async (req, res) => {
    const response = await ProductController.GetAllProducts();
    res.status(response.code).json(response);
});

ProductRouter.get("/:product", async (req, res) => {
    const { product } = req.params;
    const response = await ProductController.GetByProduct(product);
    res.status(response.code).json(response);
});

ProductRouter.get("/:product/:id", async (req, res) => {
    const { product, id } = req.params;
    const response = await ProductController.GetProductByID(product, id);
    res.status(response.code).json(response);
});

ProductRouter.post("/:product", async (req, res) => {
    const { product } = req.params;
    const item = req.body;
    const response = await ProductController.PostProductByCategory(product, item);
    res.status(response.code).json(response);
});

ProductRouter.patch("/:product/:id", async (req, res) => {
    const { product, id } = req.params;
    const item = req.body;
    const response = await ProductController.PatchProduct(product, id, item);
    res.status(response.code).json(response);
});

ProductRouter.put("/:product/:id", async (req, res) => {
    const { product, id } = req.params;
    const item = req.body;
    const response = await ProductController.PutProduct(product, id, item);
    res.status(response.code).json(response);
});

ProductRouter.delete("/:product/:id", async (req, res) => {
    const { product, id } = req.params;
    const response = await ProductController.DeleteProduct(product, id);
    res.status(response.code).json(response);
});
