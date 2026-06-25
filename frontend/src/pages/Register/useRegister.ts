import { useState } from "react";
import { registerUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import type { RegisterRequest } from "../../types/auth.types";
import { useNotification } from "../../context/NotificationContext";

export const useRegister = () => {
  const [form, setForm] = useState<RegisterRequest>({
    username: "",
    email: "",
    password: "",
    role: "customer", // default role
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { notify } = useNotification();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await registerUser({
        username: form.username,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      notify("Registration successful!", "success");
      navigate("/login");
    } catch (err: any) {
      // setError(err?.response?.data?.message || "Registration failed");
      notify(err?.response?.data?.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};
