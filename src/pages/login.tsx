import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (credentials: {
    username: string;
    password: string;
    role: string;
  }) => {
    // In a real application, you would validate credentials against your backend
    if (
      credentials.username === "denmar" &&
      credentials.password === "denmarAdmin1992"
    ) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
