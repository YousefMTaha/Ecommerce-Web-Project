import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";


const MyForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Please enter your email"),
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: {userData.name},
      email: {userData?.email},
      password: {userData.password},
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2)); // Replace with your submit logic
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Enter your name"
        onChange={formik.handleChange}
        value={formik.values.name}
        // Add error handling using formik.touched and formik.errors
        className={formik.touched.name && formik.errors.name ? "error" : ""}
      />
      {formik.touched.name && formik.errors.name ? (
        <div className="error-message">{formik.errors.name}</div>
      ) : null}

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="your_email@example.com"
        onChange={formik.handleChange}
        value={formik.values.email}
        // Add error handling using formik.touched and formik.errors
        className={formik.touched.email && formik.errors.email ? "error" : ""}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="error-message">{formik.errors.email}</div>
      ) : null}

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Enter your password"
        onChange={formik.handleChange}
        value={formik.values.password}
        // Add error handling using formik.touched and formik.errors
        className={
          formik.touched.password && formik.errors.password ? "error" : ""
        }
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="error-message">{formik.errors.password}</div>
      ) : null}

      <button type="submit" disabled={!formik.isValid}>
        Submit
      </button>
    </form>
  );
};

export default MyForm;
