// components/ArticlesDisplay/ArticlesDisplay.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./ArticlesDisplay.css";
import axios from "axios";
import { DOMAIN } from "../../config";
import { Link } from "react-router-dom";

function ArticlesDisplay() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get(`${DOMAIN}/api/articles`);
      if (response.data.success) {
        setArticles(response.data.articles);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="articles-display" id="articles">
      <h2>Articles</h2>
      <div className="articles-list">
        {articles.map((article) => (
          <div className="article-item" key={article._id}>
            <h3>{article.title}</h3>

            {article.image && (
              <img
                src={`${DOMAIN}/uploads/${article.image}`}
                alt={article.title}
              />
            )}
            <Link to={`/article/${article._id}`}>
              <button>Lihat Artikel</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticlesDisplay;
