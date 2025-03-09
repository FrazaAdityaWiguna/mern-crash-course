import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      success: true,
      data: products,
      message: "Get All Products Succesfully",
    });
  } catch (error) {
    console.log("Error in get all products: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProducts = async (req, res) => {
  const product = req.body; // User will send this data

  console.log("product", product);

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
      message: "insert product successfully",
    });
  } catch (error) {
    console.log("Error in create product: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProducts = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product id" });
  }

  try {
    const updatedproducts = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    res.status(200).json({
      status: true,
      data: updatedproducts,
      message: "Updated Products Successfully",
    });
  } catch (error) {
    console.log("Error update product: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProducts = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product id" });
  }

  try {
    await Product.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Delete products success" });
  } catch (error) {
    console.log("Error deleted products: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
