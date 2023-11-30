const express = require("express");
const router = express.Router();
const {
  createProduct,
  showProduct,
  updateProduct,
  singleProduct,
  productPhoto,
  deleteproduct,
} = require("../middleware/products");
const formidableMiddleware = require("express-formidable");

// Routes
router.post("/create-product", formidableMiddleware(), createProduct);
router.put("/update-product/:id", formidableMiddleware(), updateProduct);
router.get("/show-product", showProduct);
router.get("/single-product/:slug", singleProduct);
router.get("/product-photo/:id", productPhoto);
router.delete("/product-delete/:id", deleteproduct);

router.get("/", (req, res) => {
  res.status(200).send("Hello from router page");
});

module.exports = router;
