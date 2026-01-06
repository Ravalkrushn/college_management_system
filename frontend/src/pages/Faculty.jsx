import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Faculty.css";

const Faculty = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [facultyList, setFacultyList] = useState([]);
  const [editId, setEditId] = useState(null);

  const [photo, setPhoto] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    designation: "",
    joiningDate: "",
    salary: "",
    branch: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
  });

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= RESET FORM ================= */
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      dob: "",
      bloodGroup: "",
      designation: "",
      joiningDate: "",
      salary: "",
      branch: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      emergencyName: "",
      emergencyRelation: "",
      emergencyPhone: "",
    });
    setPhoto(null);
  };

  /* ================= FETCH FACULTY ================= */
  const fetchFaculty = async () => {
    const res = await axios.get("http://localhost:5000/api/faculty");
    setFacultyList(res.data);
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const fd = new FormData();
      for (const key in formData) {
        fd.append(key, formData[key]);
      }
      if (photo) {
        fd.append("photo", photo);
      }

      if (editId) {
        await axios.put(
          `http://localhost:5000/api/faculty/${editId}`,
          fd
        );
        alert("Faculty updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/faculty", fd);
        alert("Faculty added successfully");
      }

      setShowForm(false);
      setEditId(null);
      resetForm();
      fetchFaculty();
    } catch (err) {
      console.error("FACULTY FRONTEND ERROR:", err);

      if (err.response) {
        console.error("SERVER DATA 👉", err.response.data);
        console.error("STATUS 👉", err.response.status);

        alert(
          err.response.data?.message ||
          `Server Error (${err.response.status})`
        );
      } else if (err.request) {
        console.error("NO RESPONSE 👉", err.request);
        alert("No response from server. Is backend running?");
      } else {
        console.error("AXIOS ERROR 👉", err.message);
        alert(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (fac) => {
    setEditId(fac._id);
    setShowForm(true);
    setFormData({
      firstName: fac.firstName || "",
      lastName: fac.lastName || "",
      email: fac.email || "",
      phone: fac.phone || "",
      gender: fac.gender || "",
      dob: fac.dob ? fac.dob.substring(0, 10) : "",
      bloodGroup: fac.bloodGroup || "",
      designation: fac.designation || "",
      joiningDate: fac.joiningDate
        ? fac.joiningDate.substring(0, 10)
        : "",
      salary: fac.salary || "",
      branch: fac.branch || "",
      address: fac.address || "",
      city: fac.city || "",
      state: fac.state || "",
      pinCode: fac.pinCode || "",
      emergencyName: fac.emergencyContact?.name || "",
      emergencyRelation: fac.emergencyContact?.relationship || "",
      emergencyPhone: fac.emergencyContact?.phone || "",
    });
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this faculty?")) return;
    await axios.delete(`http://localhost:5000/api/faculty/${id}`);
    fetchFaculty();
  };

  return (
    <div className="faculty-page">
      {/* HEADER */}
      <div className="faculty-header">
        <div className="title">
          <span className="blue-line"></span>
          <h2>Faculty Management</h2>
        </div>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          +
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <form className="faculty-form" onSubmit={handleSubmit}>
          <h3>{editId ? "Edit Faculty" : "Add New Faculty"}</h3>

          <div className="form-grid">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />

            <input name="firstName" value={formData.firstName} placeholder="First Name" onChange={handleChange} required />
            <input name="lastName" value={formData.lastName} placeholder="Last Name" onChange={handleChange} required />
            <input name="email" type="email" value={formData.email} placeholder="Email" onChange={handleChange} required />
            <input name="phone" value={formData.phone} placeholder="Phone" onChange={handleChange} required />

            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
            <input name="bloodGroup" value={formData.bloodGroup} placeholder="Blood Group" onChange={handleChange} />
            <input name="designation" value={formData.designation} placeholder="Designation" onChange={handleChange} required />
            <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required />
            <input name="salary" value={formData.salary} placeholder="Salary" onChange={handleChange} required />
            <input name="branch" value={formData.branch} placeholder="Branch" onChange={handleChange} required />
            <textarea name="address" value={formData.address} placeholder="Address" onChange={handleChange} required />
            <input name="city" value={formData.city} placeholder="City" onChange={handleChange} required />
            <input name="state" value={formData.state} placeholder="State" onChange={handleChange} required />
            <input name="pinCode" value={formData.pinCode} placeholder="Pin Code" onChange={handleChange} required />
          </div>

          <h4>Emergency Contact</h4>
          <div className="form-grid">
            <input name="emergencyName" value={formData.emergencyName} placeholder="Name" onChange={handleChange} />
            <input name="emergencyRelation" value={formData.emergencyRelation} placeholder="Relationship" onChange={handleChange} />
            <input name="emergencyPhone" value={formData.emergencyPhone} placeholder="Phone" onChange={handleChange} />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel" onClick={() => { setShowForm(false); setEditId(null); resetForm(); }}>
              Cancel
            </button>
            <button type="submit" className="save" disabled={loading}>
              {loading ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      )}

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="faculty-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Employee ID</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {facultyList.map((f) => (
              <tr key={f._id}>
                <td>{f.firstName} {f.lastName}</td>
                <td>{f.email}</td>
                <td>{f.phone}</td>
                <td>{f.employeeId}</td>
                <td>{f.designation}</td>
                <td>
                  <button onClick={() => handleEdit(f)}>Edit</button>
                  <button onClick={() => handleDelete(f._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Faculty;
