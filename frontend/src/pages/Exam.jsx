import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Faculty.css";
import Layout from "../components/Layout";

const Exam = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exams, setExams] = useState([]);
  const [editId, setEditId] = useState(null);
  const [timetableFile, setTimetableFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    semester: "",
    examType: "mid",
    totalMarks: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setTimetableFile(e.target.files[0]);
  };


  const fetchExams = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/exams", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setExams(res.data || []);
    } catch (err) {
      console.error("Fetch exams error:", err);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);


  const resetForm = () => {
    setFormData({
      name: "",
      date: "",
      semester: "",
      examType: "mid",
      totalMarks: "",
    });
    setTimetableFile(null);
    setEditId(null);
    setShowForm(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );

      if (timetableFile) {
        data.append("file", timetableFile);
      }

      if (editId) {
        await axios.put(`http://localhost:5000/api/exams/${editId}`, data, {
          headers,
        });
        alert("Exam updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/exams", data, { headers });
        alert("Exam added successfully");
      }

      resetForm();
      fetchExams();
    } catch (err) {
      console.error("Save exam error:", err);
      alert("Failed to save exam");
    } finally {
      setLoading(false);
    }
  };


  const handleEdit = (exam) => {
    setEditId(exam._id);
    setFormData({
      name: exam.name || "",
      date: exam.date ? exam.date.slice(0, 10) : "",
      semester: exam.semester || "",
      examType: exam.examType || "mid",
      totalMarks: exam.totalMarks || "",
    });
    setTimetableFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this exam?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/exams/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchExams();
      alert("Exam deleted");
    } catch (err) {
      console.error("Delete exam error:", err);
      alert("Failed to delete exam");
    }
  };


  return (
    <Layout>
      <div className="faculty-page">
        <div className="faculty-header">
          <div className="title">
            <span className="blue-line"></span>
            <h2>Exam Details</h2>
          </div>
          <button
            className="add-btn"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            +
          </button>
        </div>

        {showForm && (
          <form className="faculty-form" onSubmit={handleSubmit}>
            <h3>{editId ? "Edit Exam" : "Add Exam"}</h3>

            <div className="form-grid">
              <input
                name="name"
                placeholder="Exam Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
              >
                <option value="">Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>

              <select
                name="examType"
                value={formData.examType}
                onChange={handleChange}
              >
                <option value="mid">Mid Term</option>
                <option value="end">End Term</option>
              </select>

              <input
                type="number"
                name="totalMarks"
                placeholder="Total Marks"
                value={formData.totalMarks}
                onChange={handleChange}
                required
              />

              <input type="file" onChange={handleFileChange} />
            </div>

            <div className="form-actions">
              <button type="button" className="cancel" onClick={resetForm}>
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
                <th>Name</th>
                <th>Date</th>
                <th>Sem</th>
                <th>Type</th>
                <th>Marks</th>
                <th>Timetable</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {exams.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No exams found
                  </td>
                </tr>
              ) : (
                exams.map((exam) => (
                  <tr key={exam._id}>
                    <td>{exam.name}</td>
                    <td>{new Date(exam.date).toLocaleDateString()}</td>
                    <td>{exam.semester}</td>
                    <td>{exam.examType === "mid" ? "Mid" : "End"}</td>
                    <td>{exam.totalMarks}</td>
                    <td>
                      {exam.timetableLink ? (
                        <a
                          href={`http://localhost:5000/uploads/${exam.timetableLink}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleEdit(exam)}>Edit</button>
                      <button onClick={() => handleDelete(exam._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Exam;
