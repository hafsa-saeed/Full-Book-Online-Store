import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async () => {
    try {
      if (values.username === "" || values.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "https://full-book-online-store-nqqu-hyax2vqy0.vercel.app/api/v1/sign-in",
          values
        );

        // ✅ response check
        console.log("✅ Login Response:", response.data);

        // ✅ localStorage me data set
        dispatch(authActions.login());
dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile");

        alert("Login successful ✅");

        // ✅ dashboard ya home pe redirect
        // navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
        console.error("Login Error:", error);
      }
    }
  };

  return (
    <div className="h-[85vh] bg-zinc-900 flex flex-col">
      {/* Center Form */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-zinc-800 rounded-lg px-5 py-6 w-full md:w-3/6 lg:w-2/6">
          <p className="text-zinc-200 text-xl font-semibold">Login</p>
          <div className="mt-4">
            {/* Username */}
            <div>
              <label className="text-zinc-400">Username</label>
              <input
                type="text"
                name="username"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
                placeholder="Enter your username"
                required
                value={values.username}
                onChange={change}
              />
            </div>

            {/* Password */}
            <div className="mt-4">
              <label className="text-zinc-400">Password</label>
              <input
                type="password"
                name="password"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
                placeholder="Enter your password"
                required
                value={values.password}
                onChange={change}
              />
            </div>

            {/* Login Button */}
            <button
              type="button"
              className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={submit}
            >
              Login
            </button>

            {/* OR Line */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-zinc-600"></div>
              <span className="px-2 text-zinc-400">Or</span>
              <div className="flex-grow h-px bg-zinc-600"></div>
            </div>

            {/* Don’t have account */}
            <p className="text-zinc-400 text-sm text-center">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
