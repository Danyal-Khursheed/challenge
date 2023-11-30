const express = require("express");
const slugify = require("slugify");
const fs = require("fs");
const ProductModel = require("../model/schema");

const createProduct = async (req, res) => {
  try {
    const { photo } = req.files;
    const { name, description, price, category, quantity, shipping } =
      req.fields;

    if (!name || !price) {
      return res.status(400).send({
        success: false,
        message: "Please fill in all the credentials",
      });
    }

    if (photo.size > 1000000) {
      return res.status(400).send({
        success: false,
        message: "Photo size must be less than 1MB",
      });
    }

    const slug = slugify(name);
    const product = new ProductModel({
      name,
      slug,
      price,
    });

    if (photo) {
      const data = fs.readFileSync(photo.path);
      product.photo.data = data;
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging.
    res.status(500).send({
      success: false,
      message: "Error while creating product",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.fields;
    const { photo } = req.files;

    if (!name || !price) {
      return res.status(400).send({
        success: false,
        message: "Invalid parameters",
      });
    }

    if (photo && photo.size > 1000000) {
      return res.status(400).send({
        success: false,
        message: "The size of the photo should be less than 1 MB",
      });
    }

    const updatedProduct = {
      name,
      price,
      slug: slugify(name),
    };

    if (photo) {
      const data = fs.readFileSync(photo.path);
      updatedProduct.photo = {
        data,
        contentType: photo.type,
      };
    }

    const product = await ProductModel.findByIdAndUpdate(id, updatedProduct, {
      new: true,
    });

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging.
    res.status(500).send({
      success: false,
      message: "Error while updating product",
      error: error.message,
    });
  }
};

const showProduct = async (req, res) => {
  try {
    const showProducts = await ProductModel.find()
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Products displayed successfully",
      showProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while showing products",
      error: error.message,
    });
  }
};

const singleProduct = async (req, res) => {
  try {
    const showProduct = await ProductModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Single Product displayed successfully",
      showProduct,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging.
    res.status(500).send({
      success: false,
      message: "Error while Single showing products",
      error: error.message,
    });
  }
};

const productPhoto = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id).select("photo");

    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.error(error); // Log the error for debugging.
    res.status(500).send({
      success: false,
      message: "Error while  showing products photo",
      error: error.message,
    });
  }
};

const deleteproduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};
module.exports = {
  createProduct,
  updateProduct,
  showProduct,
  singleProduct,
  productPhoto,
  deleteproduct,
};
