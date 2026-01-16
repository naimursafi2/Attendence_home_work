import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [logData, setLogData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const auth = getAuth();
  const navigate = useNavigate();
  const handelLogIn = (e) => {
    setErrors({
      email: "",
      password: "",
    });
    e.preventDefault();
    console.log(logData);
    signInWithEmailAndPassword(auth, logData.email, logData.password)
      .then((res) => {
        if (!res.user.emailVerified) {
          toast.info("Email is not verified", res);

          return;
        } else {
          toast.success("Login Successfull", res);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode == "auth/invalid-email") {
          return setErrors((prev) => ({
            ...prev,
            email: "please enter the valid Email",
          }));
        }
        if (errorCode == "auth/invalid-credential") {
          return toast.warning("Email or password is incorrect")
        }
        if (errorCode == "auth/missing-password") {
          return setErrors((prev) => ({
            ...prev,
            password: "Please enter your password",
          }));
        }
        
      });
  };
  console.log(errors);

  return (
    <div className="bg-[url('backround3.jpg')]  bg-no-repeat bg-cover bg-center  h-screen py-25">
      <ToastContainer />
      <div className="bg-[url('backround4.jpg')]  bg-no-repeat bg-cover bg-center  w-xl rounded-lg m-auto shadow-2xl  bg-white   p-16 flex  flex-col  justify-center items-center">
        <div className=" flex justify-center mb-5 flex-col items-center">
          <h2 className="text-2xl font-medium text-white uppercase">
            Log in Form
          </h2>
          <p className="text-white">Enter details below.</p>
        </div>
        <form className="w-90 mt-4 space-y-3">
          <div>
            <input
              onChange={(e) =>
                setLogData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="outline-none border-2 rounded-md px-2 py-1 text-white w-full focus:border-blue-300"
              placeholder="example@gmail.com"
              id="username"
              name="username"
              type="email"
            />
            {errors.email && (
              <p className="bg-red-600 px-2 rounded text-white mt-1 w-fit">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <input
              onChange={(e) =>
                setLogData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="outline-none border-2 rounded-md px-2 py-1 text-white w-full focus:border-blue-300"
              placeholder="Password"
              id="password"
              name="password"
              type="password"
            />
            {errors.password && (
              <p className="bg-red-600 px-2 rounded text-white mt-1 w-fit">
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex justify-center mt-4 ">
            <button
              onClick={handelLogIn}
              className="px-4 uppercase cursor-pointer py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2"
              id="login"
              name="login"
              type="submit"
            >
              Log In
            </button>
          </div>
          <p className="flex justify-center space-x-1">
            <span className="text-white"> You haven't account </span>
            <Link className="text-blue-500 hover:underline" to="/registration">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
