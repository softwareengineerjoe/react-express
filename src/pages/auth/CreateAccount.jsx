import React, { useState, useEffect } from "react";
import wallpaper from "../../assets/Wallpaper.svg";
import logo from "../../assets/Brand_and_logo-nobg.svg";
import bullet from "../../assets/Icons/Bullet.svg";
import check from "../../assets/Icons/Check.svg";
import show from "../../assets/Icons/Show.svg";
import hide from "../../assets/Icons/Hide.svg";
import google from "../../assets/Icons/Google.svg";
import facebook from "../../assets/Icons/Facebook.svg";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../api/UsersApi";

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("Weak");
  const [accountCreated, setAccountCreated] = useState(false);
  const [isPassed, setIsPassed] = useState({
    minLength: false,
    containsNumberOrSymbol: false,
    containsNameOrEmail: false,
  });
  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e, field) => {
    if (field === "username") {
      setUsername(e.target.value);
      setTouched((prev) => ({ ...prev, username: true }));
    } else if (field === "password") {
      setPassword(e.target.value);
      setTouched((prev) => ({ ...prev, password: true }));
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length >= 8 && /[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Strong";
    } else if (
      password.length >= 6 &&
      /[0-9!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      return "Medium";
    } else {
      return "Weak";
    }
  };

  useEffect(() => {
    if (!username || !password) {
      setIsPassed({
        minLength: false,
        containsNumberOrSymbol: false,
        containsNameOrEmail: false,
      });
      return;
    }

    if (!touched.username || !touched.password) return;

    const validatePassword = () => {
      const containsNameOrEmailCheck =
        username && password.toLowerCase().includes(username.toLowerCase());

      if (containsNameOrEmailCheck) {
        setPasswordStrength("Weak");
      } else {
        setPasswordStrength(checkPasswordStrength(password));
      }

      const minLengthCheck = password.length >= 8;
      const containsNumberOrSymbolCheck = /[0-9!@#$%^&*(),.?":{}|<>]/.test(
        password
      );

      setIsPassed({
        minLength: minLengthCheck,
        containsNumberOrSymbol: containsNumberOrSymbolCheck,
        containsNameOrEmail: !containsNameOrEmailCheck,
      });
    };

    validatePassword();
  }, [password, username, touched]);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !isPassed.minLength ||
      !isPassed.containsNumberOrSymbol ||
      !isPassed.containsNameOrEmail
    ) {
      setError("Please make sure the password meets all the requirements.");
      return;
    }

    try {
      const response = await signup(username, password);

      // if (response) {
      //   navigate("/login");
      // }
      setAccountCreated(true);
    } catch (err) {
      setError(err.message || "Signup failed! Please try again.");
    } finally {
      setError(null);
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
        <h1 className="text-3xl font-bold">
          {accountCreated
            ? "Account successfully created. Sign in to continue"
            : "Create an account"}
        </h1>

        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}

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
            onChange={(e) => handleInputChange(e, "username")}
            className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#027cec] focus:border-[#027cec]`}
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
            onChange={(e) => handleInputChange(e, "password")}
            className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              touched.password &&
              (!isPassed.minLength || !isPassed.containsNumberOrSymbol
                ? "border-[#ca0061] focus:ring-[#ca0061]"
                : "focus:ring-[#027cec] focus:border-[#027cec]")
            }`}
          />

          <button
            onClick={handleShowPassword}
            className="absolute right-5 top-1/2 z-20 cursor-pointer"
          >
            <img
              src={showPassword ? hide : show}
              alt="toggle password visibility"
            />
          </button>
        </div>
        {touched.password && password.length > 0 && (
          <p
            className={`text-xs indent-4 mt-1 ${
              passwordStrength === "Weak"
                ? "text-[#ca0061]"
                : passwordStrength === "Medium"
                ? "text-yellow-500"
                : "text-[#027cec]"
            }`}
          >
            Password strength: {passwordStrength}
          </p>
        )}

        <ul className="text-xs mt-2 ml-4 text-[#272d32]">
          <li className="flex items-center gap-1">
            <span>
              <img src={!isPassed.containsNameOrEmail ? bullet : check} />
            </span>
            Cannot contain your name or email address
          </li>
          <li className="flex items-center gap-1">
            <span>
              <img src={!isPassed.minLength ? bullet : check} />
            </span>
            At least 8 characters
          </li>
          <li className="flex items-center gap-1">
            <span>
              <img src={!isPassed.containsNumberOrSymbol ? bullet : check} />
            </span>
            Contains a number or symbol
          </li>
        </ul>

        <button
          onClick={handleSignup}
          className="mt-6 bg-[#027cec] px-4 text-white py-2 rounded cursor-pointer"
        >
          Sign up
        </button>
        <p className="text-center mt-4 font-semibold">
          Already have an account?{" "}
          <Link to={"/login"} className="text-[#027cec]">
            Sign in
          </Link>
        </p>
        <div className="flex items-center my-6">
          <div className="w-full border border-[#c7ced6]"></div>
          <p className="text-[#818d99]">OR</p>
          <div className="w-full border border-[#c7ced6]"></div>
        </div>
        <button className="py-3 border border-gray-300 rounded shadow-sm flex items-center justify-center gap-2">
          <img src={google} />
          Continue with Google
        </button>
        <button className="mt-2 py-3 border border-gray-300 rounded shadow-sm flex items-center justify-center gap-2">
          <img src={facebook} />
          Continue with Facebook
        </button>
      </section>
    </main>
  );
}
