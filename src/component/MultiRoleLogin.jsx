import { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const LoginForm = ({ loginData, setLoginData, handleLogin }) => (
  <div className="w-full md:w-1/2 flex flex-col items-center p-6 bg-transparent">
    <h2 className="text-2xl font-bold text-gray-700 mb-6">Login</h2>
    <div className="w-full space-y-4">
      <input
        type="text"
        placeholder="Email"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        value={loginData.email}
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        aria-label="Email"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        value={loginData.password}
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
        aria-label="Password"
      />
      <button
        className="w-full bg-gradient-to-b from-amber-500 to-orange-400 text-white py-3 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
        onClick={handleLogin}
        aria-label="Login"
      >
        Login
      </button>
    </div>
  </div>
);

const MultiRoleLogin = ({ onLoginSuccess }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.errorMessage) {
      toast.error(location.state.errorMessage);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        loginData
      );

      if (response.status === 200 && response.data) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
        onLoginSuccess(response.data);

        // Navigate based on user role and show toast on the dashboard page
        if (response.data.role === "Admin") {
          navigate("/admin-dashboard", { state: { showToast: true } });
        } else if (response.data.role === "Faculty") {
          navigate("/faculty-dashboard", { state: { showToast: true } });
        } else if (response.data.role === "Student") {
          navigate("/student-dashboard", { state: { showToast: true } });
        }
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("User not found. Please try again.");
      } else if (error.response && error.response.status === 400) {
        toast.error("Incorrect password. Please try again.");
      } else {
        toast.error("Login failed. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white bg-opacity-70 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative border border-gray-300">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-300 to-orange-300 text-white">
          <UserCircleIcon className="w-24 h-24 text-black mb-4" />
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Welcome!</h2>
          <p className="text-center text-gray-800">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Right Section */}
        <LoginForm
          loginData={loginData}
          setLoginData={setLoginData}
          handleLogin={handleLogin}
        />
      </div>
      <ToastContainer style={{ marginTop: "70px" }} />
    </div>
  );
};

export default MultiRoleLogin;
