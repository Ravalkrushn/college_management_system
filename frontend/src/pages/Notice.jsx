import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notice.css";
import Layout from "../components/Layout";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "student",
    link: "",
  });

  /* ================= FETCH NOTICES ================= */
  const fetchNotices = async () => {
    try {
      // Assuming your backend route is /api/notice based on your model
      const res = await axios.get("http://localhost:5000/api/notice");
      setNotices(res.data);
    } catch (err) {
      console.error("Error fetching notices:", err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/notice/${editId}`, formData);
        alert("Notice updated successfully ✅");
      } else {
        await axios.post("http://localhost:5000/api/notice", formData);
        alert("Notice added successfully ✅");
      }

      setShowForm(false);
      setEditId(null);
      resetForm();
      fetchNotices();
    } catch (err) {
      console.error(err);
      alert("Operation failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "student",
      link: "",
    });
  };

  const handleEdit = (notice) => {
    setEditId(notice._id);
    setFormData({
      title: notice.title,
      description: notice.description,
      type: notice.type,
      link: notice.link || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/notice/${id}`);
      fetchNotices();
    } catch (err) {
      console.error(err);
      alert("Failed to delete notice");
    }
  };

  return (
    <Layout>
      <div className="notice-page">
        {/* HEADER */}
        <div className="notice-header">
          <div className="title">
            <span className="blue-line"></span>
            <h2>Notice Board</h2>
          </div>
          <button
            className="add-btn"
            onClick={() => {
              setShowForm(true);
              setEditId(null);
              resetForm();
            }}
          >
            +
          </button>
        </div>

        {/* FORM MODAL */}
        {showForm && (
          <div className="modal-overlay">
            <form className="notice-form" onSubmit={handleSubmit}>
              <h3>{editId ? "Edit Notice" : "Add New Notice"}</h3>

              <div className="form-group">
                <label>Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter notice title"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter details..."
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Link (Optional)</label>
                <input
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="http://..."
                />
              </div>

              <div className="form-group">
                <label>Target Audience</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save" disabled={loading}>
                  {loading ? "Saving..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* NOTICE GRID */}
        <div className="notice-grid">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <div key={notice._id} className="notice-card">
                <div className="card-header">
                  <h4>{notice.title}</h4>
                  <span className={`badge ${notice.type}`}>{notice.type}</span>
                </div>
                <span className="date">
                  {new Date(notice.createdAt).toLocaleDateString()}
                </span>
                <p className="description">{notice.description}</p>

                {notice.link && (
                  <a
                    href={notice.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-btn"
                  >
                    View Attachment/Link
                  </a>
                )}

                <div className="card-footer">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(notice)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(notice._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No notices found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Notice;
