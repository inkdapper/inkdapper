import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  editProduct,
  addBanner,
  listBanner
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post("/add",adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "reviewImage1", maxCount: 1 },
    { name: "reviewImage2", maxCount: 1 },
    { name: "reviewImage3", maxCount: 1 },
  ]),addProduct
);
productRouter.post("/add-banner",adminAuth,
  upload.fields([
    { name: "imageBanner1", maxCount: 1 },
    { name: "imageBanner2", maxCount: 1 },
    { name: "imageBanner3", maxCount: 1 },
    { name: "imageBanner4", maxCount: 1 },
  ]),addBanner
);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProducts);
productRouter.get("/banner-list", listBanner);
productRouter.put("/edit/:id",adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "reviewImage1", maxCount: 1 },
    { name: "reviewImage2", maxCount: 1 },
    { name: "reviewImage3", maxCount: 1 },
  ]),editProduct
);

export default productRouter;
