import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target; // ✅ "value" (small v)
    setValues({ ...values, [name]: value }); // ✅ spread "values"
  };

  const submit = async () => {
    try {
      if (
        values.username === "" ||
        values.email === "" ||
        values.password === "" ||
        values.address === ""
      ) {
        alert("All fields are required");
      } else {
       const response = await axios.post(
  "https://full-book-online-store-nqqu-hyax2vqy0.vercel.app/api/v1/sign-up",
  values
);
        alert(response.data.message);
        navigate("/Login");
      }
    } catch (error) {
  console.error("SignUp Error:", error);

  if (error.response) {
    alert(error.response.data.message || "Sign up failed");
  } else if (error.request) {
    alert("Backend se response nahi aa raha");
  } else {
    alert(error.message);
  }
}
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-5 py-6 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl font-semibold">Sign Up</p>
        <div className="mt-4">
          {/* Username */}
          <div>
            <label className="text-zinc-400">Username</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="username"
              name="username"
              required
              value={values.username} // ✅ small v
              onChange={change}
            />
          </div>

          {/* Email */}
          <div className="mt-4">
            <label className="text-zinc-400">Email</label>
            <input
              type="email"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="xyz@example.com"
              name="email"
              required
              value={values.email}
              onChange={change}
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="text-zinc-400">Password</label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="password"
              name="password"
              required
              value={values.password}
              onChange={change}
            />
          </div>

          {/* Address */}
          <div className="mt-4">
            <label className="text-zinc-400">Address</label>
            <textarea
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded"
              placeholder="address"
              rows="3"
              name="address"
              required
              value={values.address}
              onChange={change}
            />
          </div>

          {/* Signup Button */}
          <button
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 "
            onClick={submit}
          >
            SignUp
          </button>

          {/* OR Line */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-zinc-600"></div>
            <span className="px-2 text-zinc-400">Or</span>
            <div className="flex-grow h-px bg-zinc-600"></div>
          </div>

          {/* Already have an account */}
          <p className="text-zinc-400 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
