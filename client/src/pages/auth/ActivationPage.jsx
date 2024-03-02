import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setToastView } from "../../components/features/toast/toastSlice";
import { useDispatch } from "react-redux";

const ActivationPage = () => {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const { activationToken } = useParams();
  console.log("activation token is:", activationToken);
  useEffect(() => {
    axios
      .post("/auth/activation", { activationToken })
      .then((res) => {
        setLoader(false);
        return dispatch(
          setToastView({ type: "success", msg: res.data.message })
        );
      })
      .catch((err) => {
        const { error } = err.response.data;
        // console.log("error is : ",error);
        setLoader(false);
        return dispatch(setToastView({ type: "error", msg: error }));
      });
  });
  return (
    <>
      {loader && (
        <div className="h-screen flex justify-center items-center">
          <h1>Waiting for Admin Verification.....</h1>
        </div>
      )}
    </>
  );
};

export default ActivationPage;
