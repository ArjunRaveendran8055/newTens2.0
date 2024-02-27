import React, { useState } from "react";

const SignUp = () => {
  const [user, setUser] = useState({
    fName: "",
    lName: "",
    email: "",
    date: "",
    password: "",
    cPassword: "",
  });
  console.log("user details : ", user.cPassword);

  const signUpHandler=()=>{
    console.log(user);
  }

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
          <button className="outline-none glass shadow-2xl  w-full p-3  bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px]  hover:text-[#035ec5] font-bold"
          onClick={signUpHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
