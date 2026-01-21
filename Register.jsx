import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";



function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-wrapper">

        {/* TOP BRAND (same as Login) */}
        <div className="brand">
          <div className="brand-icon">▦</div>
          <h1>CampusEventHub</h1>
          <p>College Event Management Platform</p>
        </div>

        {/* FORM CARD */}
        <div className="auth-card">
          <div className="title-row">
            <div className="user-icon">👤</div>
            <h2>Create Account</h2>
          </div>

          <p className="subtitle">Join CampusEventHub now</p>

          <label>Full Name</label>
          <div className="input-box">
            <span>👤</span>
            <input type="text" placeholder="Enter your full name" />
          </div>

          <label>Email Address</label>
          <div className="input-box">
            <span>✉️</span>
            <input type="email" placeholder="Enter your email address" />
          </div>

          <label>College / University</label>
          <div className="input-box">
            <span>🎓</span>
            <input type="text" placeholder="Enter your college name" />
          </div>

          <label>Role</label>
          <div className="input-box">
            <select>
              <option>Student</option>
              <option>Admin</option>
            </select>
          </div>

          <label>Password</label>
          <div className="input-box">
            <span>🔒</span>
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
            />
            <span
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? "🙈" : "👁️"}
            </span>

          </div>

          <label>Confirm Password</label>
          <div className="input-box">
            <span>🔒</span>
            <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
            />
            <span
                className="eye"
                onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                }
            >
                {showConfirmPassword ? "🙈" : "👁️"}
            </span>

          </div>

          <button className="primary-btn">Create account</button>

          <p className="switch-text">
            Already have an account?{" "}
            <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
