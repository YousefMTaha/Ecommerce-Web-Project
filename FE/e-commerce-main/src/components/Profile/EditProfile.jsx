import React, { useState,useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { UserContext } from "../../Context/UserContext";
import jwtDecode from "jwt-decode";

export default function EditProfile() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserToken, setUserData } = useContext(UserContext);
  async function EditSubmit(values) {
    const info = jwtDecode(localStorage.getItem("token"));
  
    setIsLoading(true);
    const  {data}  = await axios
      .put(
        "http://localhost:3000/user/update",
       values,
       {headers: { token: "yousef_" + localStorage.getItem("token") }},
       )
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError(err.response.data.message);
      });

      console.log(data);

    if (data.message === "done") {
    
      localStorage.setItem("data", JSON.stringify(data.user));
      setUserData(data.user);
      navigate("/profile");
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Min length is 3 chars")
      .max(20, "Max length is 16 chars")
      .required("This field is required"),
    email: Yup.string()
      .required("This field is required")
      .email("Enter a valid email"),
    phone: Yup.string()
      .required("This field is required")
      .matches(/^01[0125][0-9]{8}$/i, "Enter a valid phone number"),
  });

  const formik = useFormik({
    initialValues: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,

    },
    validationSchema,
    onSubmit: EditSubmit,
  });

  return (
    <div className="register py-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Profile</title>
      </Helmet>
      {error ? (
        <div className="alert alert-danger mb-3 p-2 text-center">{error}</div>
      ) : null}
      <h2 className="mb-4">Edit Profile</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="name" className="mb-1">
            Name:
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.name}
            </div>
          ) : null}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="email" className="mb-1">
            Email:
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="phone" className="mb-1">
            Phone:
          </label>
          <input
            className="form-control"
            type="tel"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.phone}
            </div>
          ) : null}
        </div>
        {!isLoading ? (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white w-25 d-block mx-auto mt-4">
            Submit
          </button>
        ) : (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white d-block mx-auto mt-4">
            <i className="fa-solid fa-spinner fa-spin"></i>
          </button>
        )}
      </form>
    </div>
  );
}
