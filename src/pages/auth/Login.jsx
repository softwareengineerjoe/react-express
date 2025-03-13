import React, { useState } from "react";
import wallpaper from "../../assets/Wallpaper.svg";
import logo from "../../assets/Brand_and_logo-nobg.svg";
import show from "../../assets/Icons/Show.svg";
import hide from "../../assets/Icons/Hide.svg";
import google from "../../assets/Icons/Google.svg";
import facebook from "../../assets/Icons/Facebook.svg";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/UsersApi";
import { useUser } from "../../context/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { token } = await login(username, password);
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      setUser(username);
      navigate("/home");
    } catch (err) {
      setError(err.message || "Login failed! Please try again.");
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-row overflow-hidden">
      <section className="w-full relative">
        <img
          src={wallpaper}
          alt="wallpaper"
          className="object-cover w-full h-full"
        />
        <img
          src={logo}
          alt="logo"
          className="absolute w-56 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 filter grayscale saturate-0 brightness-200"
        />
      </section>
      <section className="w-full flex flex-col justify-center p-20">
        <h1 className="text-3xl font-bold">Sign In</h1>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mt-6">
            <label
              htmlFor="username"
              className="block text-xs font-medium text-gray-700 translate-y-3.5 translate-x-4 bg-white w-fit px-1"
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-700 translate-y-3.5 translate-x-4 bg-white w-fit px-1"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute right-5 top-1/2 z-20 cursor-pointer"
            >
              <img
                src={showPassword ? hide : show}
                alt="toggle password visibility"
              />
            </button>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="mt-6 bg-[#027cec] px-4 text-white py-2 rounded cursor-pointer text-center w-full"
          >
            Sign in
          </button>
        </form>

        <p className="text-center mt-4 font-semibold">
          Don't have an account?{" "}
          <Link to={"/create-account"} className="text-[#027cec]">
            Sign up
          </Link>
        </p>

        <div className="flex items-center my-6">
          <div className="w-full border border-[#c7ced6]"></div>
          <p className="text-[#818d99]">OR</p>
          <div className="w-full border border-[#c7ced6]"></div>
        </div>
        <button className="py-3 border border-gray-300 rounded shadow-sm flex items-center justify-center gap-2">
          <img src={google} alt="google" />
          Continue with Google
        </button>
        <button className="mt-2 py-3 border border-gray-300 rounded shadow-sm flex items-center justify-center gap-2">
          <img src={facebook} alt="facebook" />
          Continue with Facebook
        </button>
      </section>
    </main>
  );
}
