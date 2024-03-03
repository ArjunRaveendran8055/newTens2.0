import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setToastView } from "../../components/features/toast/toastSlice";
import axios from "axios";

const SignUp = () => {
  const disptach = useDispatch();
  const [user, setUser] = useState({
    fName: "",
    lName: "",
    email: "",
    date: "",
    password: "",
    cPassword: "",
  });
  const [loader, setLoader] = useState(false);
  const signUpHandler = () => {
    
    //check for empty fields
    if (
      user.fName.length === 0 ||
      user.lName.length === 0 ||
      user.email.length === 0 ||
      user.date.length === 0 ||
      user.password.length === 0 ||
      user.cPassword.length === 0
    ) {
      return disptach(
        setToastView({ type: "error", msg: "enter complete details." })
      );
    }

    //checking password length
    if(password.length <5){
      return disptach(setToastView({type:"error",msg:"Password Must be AtLeast 5 char"}))
    }

    //checking for password matching
    if (user.password !== user.cPassword) {
      return disptach(
        setToastView({ type: "error", msg: "Password Missmatch." })
      );
    }

    //Api request for signUp
    setLoader(true);
    axios
      .post("/auth/signUp", {
        firstName: user.fName,
        lastName: user.lName,
        email: user.email,
        password: user.password,
        dob: user.date,
      })
      .then((res) => {
        disptach(setToastView({ type: "success", msg: res.data.message }));
        return setLoader(false);
      })
      .catch((err) => {
        disptach(setToastView({ type: "error", msg: err.response.data.error }));
        return setLoader(false);
      });
  };

  return (
    <div>
      <div className="signup-main-container sm:px-2 lg:px-7 h-screen flex flex-col justify-center items-center">
        <div className="">
          <img src="/img/new10s.png" alt="Logo" className="w-40" />
        </div>
        <div
          className="signup-form flex flex-col gap-6 bg-whitesmoke px-6 py-8 rounded-2xl"
          id="form"
        >
          <div className="sign-up flex w-full items-center justify-center">
            <span className="text-2xl">Sign Up</span>
          </div>
          <div className="w-full flex gap-3">
            <input
              className="capitalize shadow-2xl p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-black"
              type="text"
              placeholder="First Name"
              id="First-Name"
              name="First-Name"
              required=""
              onChange={(e) => setUser({ ...user, fName: e.target.value })}
            />
            <input
              className="p-3 capitalize shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
              type="text"
              placeholder="Last Name"
              id="Last-Name"
              name="Last-Name"
              required
              onChange={(e) => setUser({ ...user, lName: e.target.value })}
            />
          </div>
          <div className="grid gap-6 w-full">
            <input
              className="p-3 shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]"
              type="Email"
              placeholder="Email"
              id="Email"
              name="email"
              required
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
            <input
              className="p-3 shadow-2xl   glass w-full text-black outline-none focus:border-solid focus:border-[1px]border-[#035ec5]"
              type="date"
              required=""
              onChange={(e) => {
                setUser({ ...user, date: e.target.value });
              }}
            />
          </div>
          <div className="flex gap-3">
            <input
              className="p-3 glass shadow-2xl  w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              required=""
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
            <input
              className="p-3 glass shadow-2xl  w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
              type="password"
              placeholder="Confirm password"
              required=""
              onChange={(e) => {
                setUser({ ...user, cPassword: e.target.value });
              }}
            />
          </div>
          {!loader ? (
            <button
              className="outline-none glass shadow-2xl  w-full p-3  bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px]  hover:text-[#035ec5] font-bold"
              onClick={signUpHandler}
            >
              Submit
            </button>
          ) : (
            <button className="outline-none glass shadow-2xl  w-full p-3  bg-custGreen hover:border-[#035ec5] hover:border-solid hover:border-[1px]  hover:text-[#035ec5] font-bold">
              Be Patient...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
