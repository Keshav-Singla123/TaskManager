import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setLoading(true);
    try {
      const res = await login(form.email, form.password);
      if (res.success) navigate("/dashboard");
      else setErrors(res.message || "Invalid email or password");
    } catch (err) {
      setErrors(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Invalid email or password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-md p-6 bg-slate-800 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Sign in to TaskFlow</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-700 mt-1"
          />

          <label className="block text-sm mt-3">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-700 mt-1 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-2 text-sm text-slate-300"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {errors && <div className="text-red-400 mt-3">{errors}</div>}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-brand text-white p-2 rounded"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="mt-4 text-sm text-slate-400">
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-300">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
