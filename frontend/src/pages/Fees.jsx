import React, { useState, useEffect } from "react";
import axios from "axios";

const Fees = () => {
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [students, setStudents] = useState([]);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    date: new Date().toISOString().split("T")[0],
    mode: "Cash",
    remarks: "",
    totalFee: "", // Admin can set/update total fee
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students");
        // Reverse to show newly added students first
        setStudents(res.data.reverse());
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchStudents();
  }, []);

  // Refresh data helper
  const refreshData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data.reverse());
    } catch (err) {
      console.error("Error refreshing data:", err);
    }
  };

  const openPaymentModal = (student) => {
    setSelectedStudent(student);
    setPaymentForm({
      amount: "",
      date: new Date().toISOString().split("T")[0],
      mode: "Cash",
      remarks: "",
      totalFee: student.feeDetails?.totalAmount || 0,
    });
    setShowModal(true);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent) return;

    try {
      // In a real app, this endpoint handles the transaction logic
      await axios.post("http://localhost:5000/api/fees/add-payment", {
        studentId: selectedStudent._id,
        amount: Number(paymentForm.amount),
        paymentMode: paymentForm.mode,
        paymentDate: paymentForm.date,
        remarks: paymentForm.remarks,
        semester: selectedStudent.semester,
        totalAmount: paymentForm.totalFee
          ? Number(paymentForm.totalFee)
          : undefined,
      });

      alert("Payment recorded successfully! ✅");
      setShowModal(false);
      refreshData(); // Reload table to show new status
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Failed to record payment. Ensure backend API is ready.");
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchCourse = course ? student.branch === course : true;
    const matchSemester = semester
      ? student.semester && student.semester.includes(semester)
      : true;
    return matchCourse && matchSemester;
  });

  return (
    <div
      style={{
        padding: "24px",
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      {/* PAGE HEADER */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#1e293b" }}>
          Fees Management
        </h2>
        <p style={{ color: "#64748b", marginTop: "4px" }}>Dashboard / Fees</p>
      </div>

      {/* FILTER SECTION */}
      <div
        style={{
          background: "#ffffff",
          padding: "16px",
          borderRadius: "12px",
          display: "flex",
          gap: "16px",
          alignItems: "center",
          marginBottom: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            outline: "none",
          }}
        >
          <option value="">Select Course</option>
          <option value="BBA">BBA</option>
          <option value="BSc">BSc</option>
          <option value="BCA">BCA</option>
        </select>

        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            outline: "none",
          }}
        >
          <option value="">Select Semester</option>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
          <option value="3">Semester 3</option>
          <option value="4">Semester 4</option>
          <option value="5">Semester 5</option>
          <option value="6">Semester 6</option>
        </select>

        <button
          style={{
            padding: "10px 18px",
            background: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Filter
        </button>
      </div>

      {/* TABLE SECTION */}
      <div
        style={{
          background: "#ffffff",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#f1f5f9" }}>
              <th style={thStyle}>Student Name</th>
              <th style={thStyle}>Enrollment No</th>
              <th style={thStyle}>Course</th>
              <th style={thStyle}>Semester</th>
              <th style={thStyle}>Total Fees</th>
              <th style={thStyle}>Paid</th>
              <th style={thStyle}>Pending</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => {
                // DYNAMIC FEE LOGIC
                // Expecting backend to provide 'feeDetails' in the student object
                const totalFees = student.feeDetails?.totalAmount || 0;
                const paid = student.feeDetails?.paidAmount || 0;
                const pending = totalFees - paid;

                // Calculate Status Dynamically
                let status = "Unpaid";
                let statusColor = "#ef4444"; // Red

                if (paid >= totalFees && totalFees > 0) {
                  status = "Paid";
                  statusColor = "#16a34a"; // Green
                } else if (paid > 0) {
                  status = "Partial";
                  statusColor = "#f59e0b"; // Yellow
                }

                return (
                  <tr key={student._id}>
                    <td style={tdStyle}>
                      {student.firstName} {student.lastName}
                    </td>
                    <td style={tdStyle}>{student.enrollmentNo}</td>
                    <td style={tdStyle}>{student.branch}</td>
                    <td style={tdStyle}>{student.semester}</td>
                    <td style={tdStyle}>₹{totalFees.toLocaleString()}</td>
                    <td style={tdStyle}>₹{paid.toLocaleString()}</td>
                    <td style={tdStyle}>₹{pending.toLocaleString()}</td>
                    <td
                      style={{
                        ...tdStyle,
                        color: statusColor,
                        fontWeight: "600",
                      }}
                    >
                      <button
                        onClick={() => openPaymentModal(student)}
                        style={{
                          marginRight: "8px",
                          padding: "4px 8px",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        Edit / Pay
                      </button>
                      {status}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="8"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* EMPTY STATE */}
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            color: "#94a3b8",
          }}
        >
          More student fee records will appear here
        </div>
      </div>

      {/* PAYMENT MODAL */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              width: "400px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ marginBottom: "16px", color: "#1e293b" }}>
              Update Fees: {selectedStudent?.firstName}
            </h3>
            <form
              onSubmit={handlePaymentSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <label style={{ fontSize: "14px", fontWeight: "600" }}>
                Total Course Fee (₹)
              </label>
              <input
                type="number"
                value={paymentForm.totalFee}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, totalFee: e.target.value })
                }
                style={inputStyle}
                required
              />

              <label style={{ fontSize: "14px", fontWeight: "600" }}>
                Payment Amount (₹)
              </label>
              <input
                type="number"
                value={paymentForm.amount}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, amount: e.target.value })
                }
                style={inputStyle}
                placeholder="Enter amount paying now"
              />

              <label style={{ fontSize: "14px", fontWeight: "600" }}>
                Payment Date
              </label>
              <input
                type="date"
                value={paymentForm.date}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, date: e.target.value })
                }
                style={inputStyle}
                required
              />

              <label style={{ fontSize: "14px", fontWeight: "600" }}>
                Payment Mode
              </label>
              <select
                value={paymentForm.mode}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, mode: e.target.value })
                }
                style={inputStyle}
              >
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cheque">Cheque</option>
              </select>

              <label style={{ fontSize: "14px", fontWeight: "600" }}>
                Remarks (Optional)
              </label>
              <textarea
                value={paymentForm.remarks}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, remarks: e.target.value })
                }
                style={{ ...inputStyle, height: "60px" }}
                placeholder="Receipt No. or Notes"
              />

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={cancelBtnStyle}
                >
                  Cancel
                </button>
                <button type="submit" style={saveBtnStyle}>
                  Save Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontSize: "14px",
  color: "#475569",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #e2e8f0",
  fontSize: "14px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
};

const saveBtnStyle = {
  flex: 1,
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
};

const cancelBtnStyle = {
  flex: 1,
  padding: "10px",
  background: "#f1f5f9",
  color: "#475569",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
};

export default Fees;
