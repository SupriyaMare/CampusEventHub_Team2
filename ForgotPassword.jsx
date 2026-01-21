function ForgotPassword() {
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
            <h2>Forgot Password</h2>
          </div>

          <p className="subtitle">
            Enter your email to reset your password
          </p>

          <label>Email address</label>
          <div className="input-box">
            <span>✉️</span>
            <input type="email" placeholder="Enter your email" />
          </div>

          <button className="primary-btn">Reset Password</button>

          <p className="switch-text">
            Remember your password?{" "}
            <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;
