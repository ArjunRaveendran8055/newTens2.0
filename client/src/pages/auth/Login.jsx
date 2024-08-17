import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { setToastView } from "../../components/features/toast/toastSlice";
import axios from "axios";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //onclicking login button
  const onLoginHandler = () => {
    if (user.email.length === 0 || user.password.length === 0) {
      return dispatch(
        setToastView({ type: "error", msg: "Enter complete Details." })
      );
    }
    if (user.password.length < 5) {
      return dispatch(
        setToastView({ type: "error", msg: "password must be atleast 5 char" })
      );
    }
    setLoader(true);
    axios
      .post("/auth/login", { email: user.email, password: user.password })
      .then((res) => {
        console.log(res.data);
        setLoader(false);
        return navigate("/home");
      })
      .catch((err) => {
        dispatch(setToastView({ type: "error", msg: err.response.data.error }));
        return setLoader(false);
      });
  };

  return (
    <div>
      <div className="login-main-container sm:px-2 lg:px-7 h-screen flex flex-col justify-center items-center">
        <div
          className="login-form flex flex-col gap-10 bg-whitesmoke sm:min-w-[360px] md:min-w-[420px] min-h-[450px] px-6 py-8 rounded-2xl"
          id="form"
        >
          <div className="login flex flex-col w-full items-center justify-center pb-10">
            <img src="/img/new10s.png" alt="Logo" className="w-40" />
            <span className="text-2xl">LOGIN</span>
          </div>
          <div className="grid gap-6 w-full">
            <input
              className="p-3 shadow-2xl  glass w-full  placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]"
              type="Email"
              placeholder="Email"
              id="Email"
              name="email"
              required
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
          </div>
          <div className="flex gap-3 relative">
            {showPassword ? (
              <LuEyeOff
                className="absolute right-6 top-4"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <LuEye
                className="absolute right-6 top-4"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
            <input
              className="p-3 glass shadow-2xl  w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Password"
              id="password"
              name="password"
              required=""
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="pt-">
            {!loader ? (
              <button
                className="outline-none glass shadow-2xl  w-full p-3  bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px]  hover:text-[#035ec5] font-bold"
                onClick={onLoginHandler}
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
    </div>
  );
};

export default Login;
