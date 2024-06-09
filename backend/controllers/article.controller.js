import articleModel from "../models/article.model.js";
import commentModel from "../models/comment.model.js";
import fs from "fs";
import path from "path";

// Add a new article
const addArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file.filename;
    const newArticle = new articleModel({ title, content, image });
    await newArticle.save();
    res.json({ success: true, message: "Article added successfully." });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to add article." });
  }
};

// Get all articles
const getArticles = async (req, res) => {
  try {
    const articles = await articleModel.find({});
    res.json({ success: true, articles });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to retrieve articles." });
  }
};

// Get an article by ID
const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await articleModel.findById(id);
    if (!article) {
      return res.status(404).json({ success: false, message: "Article not found" });
    }
    res.json({ success: true, article });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to retrieve article." });
  }
};

// Delete an article by ID
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await articleModel.findById(id);
    if (article.image) {
      fs.unlinkSync(path.join("uploads", article.image));
    }
    await articleModel.findByIdAndDelete(id);
    await commentModel.deleteMany({ articleId: id });
    res.json({ success: true, message: "Article and related comments deleted successfully." });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to delete article." });
  }
};

export { addArticle, getArticles, getArticleById, deleteArticle };
