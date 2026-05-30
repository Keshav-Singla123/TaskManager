import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePassword = (pw) => /(?=.*[A-Z])(?=.*\d).{8,}/.test(pw);

const RegisterPage = () => {
  const { register, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!form.fullName) err.fullName = "Full name is required";
    if (!validateEmail(form.email)) err.email = "Enter a valid email";
    if (!validatePassword(form.password))
      err.password = "Password must be 8+ chars, include uppercase and number";
    if (form.password !== form.confirm) err.confirm = "Passwords do not match";
    setErrors(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    try {
      const res = await register({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });
      if (res.success) navigate("/dashboard");
      else setErrors({ form: res.message });
    } catch (err) {
      setErrors({ form: "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-md p-6 bg-slate-800 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm">Full Name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-700 mt-1"
          />
          {errors.fullName && (
            <div className="text-red-400 text-sm">{errors.fullName}</div>
          )}

          <label className="block text-sm mt-3">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-700 mt-1"
          />
          {errors.email && (
            <div className="text-red-400 text-sm">{errors.email}</div>
          )}

          <label className="block text-sm mt-3">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-700 mt-1"
          />
          {errors.password && (
            <div className="text-red-400 text-sm">{errors.password}</div>
          )}

          <label className="block text-sm mt-3">Confirm Password</label>
          <input
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-700 mt-1"
          />
          {errors.confirm && (
            <div className="text-red-400 text-sm">{errors.confirm}</div>
          )}

          {errors.form && (
            <div className="text-red-400 mt-3">{errors.form}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-brand text-white p-2 rounded"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
        <div className="mt-4 text-sm text-slate-400">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-300">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
