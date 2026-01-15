import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Faculty.css";
import Layout from "../components/Layout";

const Branch = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [branchName, setBranchName] = useState("");

  const fetchBranches = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/branches");
      setBranches(res.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!branchName.trim()) {
      alert("Branch name cannot be empty.");
      return;
    }
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/branches", {
        name: branchName,
      });
      alert("Branch added successfully");
      setBranchName("");
      setShowForm(false);
      fetchBranches();
    } catch (err) {
      console.error("Error adding branch:", err);
      alert(err.response?.data?.message || "Failed to add branch");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/branches/${id}`);
      fetchBranches();
      alert("Branch deleted successfully");
    } catch (error) {
      console.error("Error deleting branch:", error);
      alert("Failed to delete branch");
    }
  };

  return (
    <Layout>
      <div className="faculty-page">
        <div className="faculty-header">
          <div className="title">
            <span className="blue-line"></span>
            <h2>Branch Details</h2>
          </div>
          <button className="add-btn" onClick={() => setShowForm(!showForm)}>
            +
          </button>
        </div>

        {showForm && (
          <form className="faculty-form" onSubmit={handleSubmit}>
            <h3>Add New Branch</h3>
            <div className="form-grid" style={{ gridTemplateColumns: "1fr" }}>
              <input
                type="text"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                placeholder="Branch Name"
                required
              />
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
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        )}

        <div className="table-wrapper">
          <table className="faculty-table">
            <thead>
              <tr>
                <th>Branch Name</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch) => (
                <tr key={branch._id}>
                  <td>{branch.name}</td>
                  <td>{new Date(branch.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleDelete(branch._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Branch;
