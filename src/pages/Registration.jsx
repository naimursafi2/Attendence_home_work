import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";

const Registration = () => {
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getDatabase();
  const handelSignUp = (e) => {
    setLoading(true);
    setErrors({
      fullName: "",
      email: "",
      password: "",
    });
    e.preventDefault();
    if (!registerData.fullName) {
      setLoading(false);
      return setErrors((prev) => ({ ...prev, fullName: "Enter Your Name" }));
    }
    // console.log(registerData);
    createUserWithEmailAndPassword(
      auth,
      registerData.email,
      registerData.password
    )
      .then((response) => {
        updateProfile(auth.currentUser, {
          displayName: registerData.fullName,
        })
          .then(() => {
            set(ref(db, "users/" + response.user.uid), {
              displayName: response.user.displayName,
              email: response.user.email,
            }).then(() => {
              sendEmailVerification(auth.currentUser).then(() => {
                toast.success(
                  "Registration Successfully,Please verify your email"
                );
                setTimeout(() => {
                  navigate("/login");
                }, 2000);
              });
            });
          })
          .catch((error) => {});
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);

        setLoading(false);
        if (errorCode == "auth/invalid-email") {
          return setErrors((prev) => ({
            ...prev,
            email: "Enter your valid Email",
          }));
        }
        if (errorCode == "auth/missing-password") {
          return setErrors((prev) => ({
            ...prev,
            password: "Enter the password,at least 6 character",
          }));
        }
        if (errorCode == "auth/email-already-in-use") {
          return toast.warning("Email already in use. Please login");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="bg-[url('backround3.jpg')]  bg-no-repeat bg-cover bg-center  h-screen py-25">
      <ToastContainer />
      <div className="bg-[url('backround4.jpg')]  bg-no-repeat bg-cover bg-center  w-xl h-110 rounded-lg m-auto shadow-2xl  bg-white p-5 flex  flex-col  justify-center items-center">
        <div className=" flex justify-center flex-col  mb-5 items-center">
          <h2 className="text-2xl font-medium text-white uppercase">
            Registration form
          </h2>
          <p className="text-white">Enter details below.</p>
        </div>
        <form className="w-90 mt-4 space-y-3">
          <div>
            <input
              onChange={(e) =>
                setRegisterData((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
              className="outline-none border-2 rounded-md px-2 py-1 text-white w-full focus:border-blue-300"
              placeholder="fullName"
              id="fullName"
              name="fullName"
              type="text"
            />
            {errors.fullName && (
              <p className="bg-red-600 px-2 rounded text-white mt-1 w-fit">
                {errors.fullName}
              </p>
            )}
          </div>
          <div>
            <input
              onChange={(e) =>
                setRegisterData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="outline-none border-2 rounded-md px-2 py-1 text-white w-full focus:border-blue-300"
              placeholder="your@gmail.com"
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
                setRegisterData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
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
              onClick={handelSignUp}
              className={` ${
                loading ? "bg-blue-200" : "bg-blue-500 hover:bg-blue-600"
              } px-4 py-1 justify-center uppercase cursor-pointer active:bg-blue-700 rounded-md text-white ring-2`}
              id="login"
              name="login"
              type="submit"
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
          <p className="flex justify-center space-x-1">
            <span className="text-white"> Have an account? </span>
            <Link className="text-blue-500 hover:underline" to="/login">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
