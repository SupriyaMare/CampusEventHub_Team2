import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Login() {
    const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-wrapper">

        {/* TOP BRAND */}
        <div className="brand">
          <div className="brand-icon">▦</div>
          <h1>CampusEventHub</h1>
          <p>College Event Management Platform</p>
        </div>

        {/* FORM CARD */}
        <div className="auth-card">
          <div className="title-row">
            <div className="user-icon">👤</div>
            <h2>Welcome back</h2>
          </div>

          <p className="subtitle">
            Login to explore and manage campus events
          </p>

          <label>Email address</label>
          <div className="input-box">
            <span>✉️</span>
            <input type="email" placeholder="Enter your email" />
          </div>

          <label>Password</label>
          <div className="input-box">
            <span>🔒</span>
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
            />
            <span
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
            >
                    {showPassword ? "🙈" : "👁️"}
                </span>
            </div>

          <Link to="/forgot" className="forgot">
            Forgot password?
          </Link>

          <button className="primary-btn">Login</button>

          <p className="switch-text">
            Don’t have an account?{" "}
            <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
