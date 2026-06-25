import { useState } from "react";
import { api } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import type { LoginRequest } from "../../types/auth.types";
import { useNotification } from "../../context/NotificationContext";

export const useLogin = () => {
  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
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

      const response = await api.post("/auth/login", form);
      notify(response.data.message, "success");

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch (err: any) {
      // setError(err?.response?.data?.message || "Login failed");
      notify(err?.response?.data?.message || "Login failed", "error");
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
