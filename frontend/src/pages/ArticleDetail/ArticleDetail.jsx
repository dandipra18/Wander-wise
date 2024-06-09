import React, { useState, useEffect } from "react";
import axios from "axios";
import { DOMAIN } from "../../config";
import "./ArticleDetail.css";
import { useParams } from "react-router-dom";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const userEmail = localStorage.getItem("Email") || "";

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/articles/${id}`);
        if (response.data.success) {
          setArticle(response.data.article);
        } else {
          setError("Failed to fetch article");
        }
      } catch (error) {
        setError("Failed to fetch article");
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/comments/${id}`);
        if (response.data.success) {
          setComments(response.data.comments);
        } else {
          setError("Failed to fetch comments");
        }
      } catch (error) {
        setError("Failed to fetch comments");
      }
    };

    fetchArticle();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${DOMAIN}/api/comments`, {
        articleId: id,
        name: userEmail,
        comment: newComment,
      });
      if (response.data.success) {
        setComments([response.data.comment, ...comments]); // Add new comment at the beginning
        setNewComment("");
      } else {
        setError("Failed to post comment");
      }
    } catch (error) {
      setError("Failed to post comment");
    }
  };

  if (error) return <div>{error}</div>;
  if (!article) return <div>Loading...</div>;

  return (
    <div className="article-detail">
      <div className="article-content">
        <img src={`${DOMAIN}/uploads/${article.image}`} alt={article.title} />
        <div className="text-content">
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </div>
      </div>

      <h3>Comments</h3>
      <div className="comments-section">
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p>
                <strong>{comment.name}</strong>
              </p>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="comment-form">
        <h3>Leave a Comment</h3>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={userEmail}
            disabled
            placeholder="Your email"
          />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Your comment"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ArticleDetail;
