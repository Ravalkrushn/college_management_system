import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Student.css";

const SEMESTERS = Array.from({ length: 6 }, (_, i) => `Sem ${i + 1}`);

const Student = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    enrollmentNo: "",
    phone: "",
    email: "",
    semester: "",
    branch: "",
    address: "",
    city: "",
    state: "",
    password: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
    image: null,
  });
  const [search, setSearch] = useState({
    enrollmentNo: "",
    name: "",
    semester: "",
    branch: "",
  });


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSemesterSelect = (sem) => {
    setFormData((prev) => ({ ...prev, semester: sem }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("middleName", formData.middleName);
      data.append("lastName", formData.lastName);
      data.append("dob", formData.dob);
      data.append("gender", formData.gender);
      data.append("enrollmentNo", formData.enrollmentNo);
      data.append("phone", formData.phone);
      data.append("email", formData.email);
      data.append("semester", formData.semester);
      data.append("branch", formData.branch);
      data.append("address", formData.address);
      data.append("city", formData.city);
      data.append("state", formData.state);
      data.append("password", formData.password);
      data.append("emergencyName", formData.emergencyName);
      data.append("emergencyRelation", formData.emergencyRelation);
      data.append("emergencyPhone", formData.emergencyPhone);
      if (formData.image) data.append("image", formData.image);

      if (editId) {
        await axios.put(`http://localhost:5000/api/students/${editId}`, data);
        alert("Student updated successfully ✅");
      } else {
        await axios.post("http://localhost:5000/api/students", data);
        alert("Student added successfully ✅");
      }

      setEditId(null);
      setShowForm(false);
      resetForm();
      fetchStudents();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Operation failed ❌ (check console)");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      gender: "",
      enrollmentNo: "",
      phone: "",
      email: "",
      semester: "",
      branch: "",
      address: "",
      city: "",
      state: "",
      password: "",
      emergencyName: "",
      emergencyRelation: "",
      emergencyPhone: "",
      image: null,
    });
  };

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/students", {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });
    setStudents(res.data);
  };

  const fetchBranches = async () => {
    const res = await axios.get("http://localhost:5000/api/branches");
    setBranches(res.data);
  };

  const handleSearch = async () => {
    const query = new URLSearchParams(search).toString();
    const res = await axios.get(
      `http://localhost:5000/api/students/search?${query}`
    );
    setStudents(res.data);
  };


  const handleEdit = (stu) => {
    setEditId(stu._id);
    setShowForm(true);
    setFormData({
      firstName: stu.firstName || "",
      middleName: stu.middleName || "",
      lastName: stu.lastName || "",
      dob: stu.dob ? stu.dob.substring(0, 10) : "",
      gender: stu.gender || "",
      enrollmentNo: stu.enrollmentNo || "",
      phone: stu.phone || "",
      email: stu.email || "",
      semester: stu.semester || "",
      branch: stu.branch || "",
      address: stu.address || "",
      city: stu.city || "",
      state: stu.state || "",
      password: "",
      emergencyName: stu.emergencyContact?.name || "",
      emergencyRelation: stu.emergencyContact?.relation || "",
      emergencyPhone: stu.emergencyContact?.phone || "",
      image: null,
    });
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    fetchStudents();
  };


  useEffect(() => {
    fetchStudents();
    fetchBranches();
  }, []);


  return (
    <div className="student-page">
      <div className="student-header">
        <div className="title">
          <span className="red-line"></span>
          <h2>Student Management</h2>
        </div>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          +
        </button>
      </div>

      {showForm && (
        <form className="form-card" onSubmit={handleSubmit}>
          <h3>{editId ? "Edit Student" : "Add Student"}</h3>

          <div className="form-grid">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />

            <input
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              placeholder="Middle Name"
            />

            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input
              name="enrollmentNo"
              value={formData.enrollmentNo}
              onChange={handleChange}
              placeholder="Enrollment No"
              required
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />

            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>

            <input type="file" name="image" onChange={handleChange} />

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              required
            />
          </div>

          {/* SEMESTER */}
          <div className="semester-box">
            <p>Select Current Semester</p>
            <div className="semester-buttons">
              {SEMESTERS.map((sem) => (
                <button
                  type="button"
                  key={sem}
                  className={
                    formData.semester === sem ? "sem-btn active" : "sem-btn"
                  }
                  onClick={() => handleSemesterSelect(sem)}
                >
                  {sem}
                </button>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel"
              onClick={() => {
                setShowForm(false);
                setEditId(null);
                resetForm();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="save" disabled={loading}>
              {loading ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      )}

      <div className="search-card">
        <input
          placeholder="Enrollment No"
          onChange={(e) =>
            setSearch({ ...search, enrollmentNo: e.target.value })
          }
        />
        <input
          placeholder="Student Name"
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
        />

        <select
          onChange={(e) => setSearch({ ...search, semester: e.target.value })}
        >
          <option value="">Semester</option>
          {SEMESTERS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          onChange={(e) => setSearch({ ...search, branch: e.target.value })}
        >
          <option value="">select Branch</option>
          {branches.map((branch) => (
            <option key={branch._id} value={branch.name}>
              {branch.name}
            </option>
          ))}
        </select>

        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        {students.length > 0 ? (
          <table className="student-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Semester</th>
                <th>Branch</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((stu) => (
                <tr key={stu._id}>
                  <td>
                    <img
                      src={
                        stu.image
                          ? `http://localhost:5000${stu.image}`
                          : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="stu"
                      width="40"
                      height="40"
                      style={{ borderRadius: "50%" }}
                    />
                  </td>
                  <td>
                    {stu.firstName} {stu.lastName}
                  </td>

                  <td>{stu.semester}</td>
                  <td>{stu.branch}</td>
                  <td className="action-cell">
                    <button onClick={() => handleEdit(stu)}>Edit</button>
                    <button onClick={() => handleDelete(stu._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486747.png"
              alt="No student data"
            />
            <p>No student data found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;
