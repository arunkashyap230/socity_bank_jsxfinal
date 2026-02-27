import { useState } from "react";
import { Building2, Eye, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AUTH_KEY = "society-auth";

const featurePoints = [
  "Complete Member Management",
  "Loan Processing & Tracking",
  "Financial Reports & Analytics",
  "Secure & Reliable Platform",
];

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userId: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const isValid =
      form.userId.trim().toLowerCase() === "admin" &&
      form.password === "admin123";

    if (!isValid) {
      setError("Invalid credentials. Please use demo credentials.");
      return;
    }

    localStorage.setItem(AUTH_KEY, "true");
    navigate("/");
  };

  return (
    <div className="login-shell">
      <section className="login-brand-panel">
        <div className="login-brand-inner">
          <div className="login-brand-icon">
            <Building2 />
          </div>
          <h1>Society Bank</h1>
          <p>Premium Banking Solutions</p>

          <ul className="login-feature-list">
            {featurePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="login-form-panel">
        <form className="login-form-card" onSubmit={onSubmit}>
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Sign in to your account to continue</p>

          <div className="form-group">
            <label htmlFor="userId">Username</label>
            <div className="login-input-wrap">
              <User />
              <input
                id="userId"
                className="input"
                value={form.userId}
                onChange={(e) => updateField("userId", e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="login-input-wrap">
              <Lock />
              <input
                id="password"
                type="password"
                className="input"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                placeholder="Enter password"
                required
              />
              <Eye className="login-eye" />
            </div>
          </div>

          <div className="login-meta-row">
            <label className="login-remember">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) => updateField("remember", e.target.checked)}
              />
              Remember me
            </label>
            <button type="button" className="login-link-btn">
              Forgot password?
            </button>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="btn btn-primary login-submit-btn">
            Sign In
          </button>

          <div className="login-demo">Demo: admin / admin123</div>
        </form>
      </section>
    </div>
  );
};

export default Login;
