/**
 * @file Unit tests for productController.js using Jest
 */

import fs from "fs";
import slugify from "slugify";
import * as productController from "../controllers/productController.js";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";

// Mock dependencies
jest.mock("fs");
jest.mock("slugify", () => jest.fn(() => "test-slug"));
jest.mock("../models/productModel.js");
jest.mock("../models/categoryModel.js");

describe("Product Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      fields: {},
      files: {},
      params: {},
      body: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
      set: jest.fn()
    };

    jest.clearAllMocks();
  });

  describe("createProductController", () => {
    it("should return error if name is missing", async () => {
      req.fields = { description: "Test", price: 100, category: "cat", quantity: 1 };
      await productController.createProductController(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ error: "Name is Required" });
    });

    it("should create product successfully", async () => {
      req.fields = { name: "Test", description: "Test", price: 100, category: "cat", quantity: 1 };
      req.files = {};
      productModel.mockImplementation(() => ({
        save: jest.fn()
      }));

      await productController.createProductController(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: "Product Created Successfully"
        })
      );
    });
  });

  describe("getProductController", () => {
    it("should return all products", async () => {
      productModel.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue([{ name: "Test Product" }])
      });

      await productController.getProductController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({ success: true })
      );
    });
  });

  describe("getSingleProductController", () => {
    it("should return single product", async () => {
      req.params.slug = "test-product";
      productModel.findOne.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue({ name: "Test Product" })
      });

      await productController.getSingleProductController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({ success: true })
      );
    });
  });

  describe("deleteProductController", () => {
    it("should delete a product", async () => {
      req.params.pid = "123";
      productModel.findByIdAndDelete.mockReturnValue({
        select: jest.fn().mockResolvedValue(true)
      });

      await productController.deleteProductController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({ success: true })
      );
    });
  });
});
