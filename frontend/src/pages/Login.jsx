import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/api/admin/login", { email, password });
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <style>{`
  body {
    background: linear-gradient(120deg, #eaf0ff, #f6f9ff);
    font-family: Arial, sans-serif;
  }

  .login-wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-card {
    width: 900px;
    height: 450px;
    background: #fff;
    border-radius: 14px;
    display: flex;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    overflow: hidden;
  }

  /* LEFT IMAGE */
  .login-left {
    width: 50%;
    animation: slideLeft 1.2s ease forwards;
  }

  .login-left img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* RIGHT FORM */
  .login-right {
    width: 50%;
    padding: 50px;
    animation: slideRight 1.2s ease forwards;
    margin-left: 25px;          
  }

  .login-right h2 {
    margin-bottom: 30px;
    margin-left: 10px;        
  }

  input {
    width: 100%;
    padding: 14px;
    margin-bottom: 20px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 16px;
  }

  .password-box {
    position: relative;
  }

  .password-box span {
    position: absolute;
    right: -5px;               
    top: 25px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  button {
    width: 50%;
    padding: 14px;
    background: #1a73e8;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    animation: slideUp 1.2s ease forwards;
    display: block;
    margin: 20px auto 0 auto;  
  }

  .error {
    color: red;
    margin-bottom: 10px;
    margin-left: 10px;
  }

  @keyframes slideLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }

  @keyframes slideRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  @keyframes slideUp {
    from { transform: translateY(100px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`}</style>

      <div className="login-wrapper">
        {" "}
        <div className="login-card">
          {/* LEFT IMAGE */}
          {/*  //src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg" */}
          <div className="login-left">
            <img src="/loginimg.jpg" alt="login" />
          </div>

          <div className="login-right">
            <h1>Admin Login</h1>

            {error && <div className="error">{error}</div>}

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="password-box">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <span
                  onClick={() => setShow(!show)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={show ? "/openeye.png" : "/closeeye.png"}
                    alt="toggle password"
                    width="22"
                  />
                </span>
              </div>

              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
