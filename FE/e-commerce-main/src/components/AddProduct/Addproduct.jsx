import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Addproduct() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function addproduct(values) {
    setIsLoading(true);
    const { data } = await axios
      .post("http://localhost:3000/auth/signup", values)
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError(err.response.data.message);
      });

    console.log(data);

    if (data.message === "done") {
      navigate("/login");
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Min length is 3 chars")
      .max(20, "Max length is 16 chars")
      .required("This field is required"),
    description: Yup.string()
      .required("This field is required")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      subcategoryId: "",
      brandId: "",
      color:"",
      size:"",
      image:""
    },
    validationSchema,
    onSubmit: addproduct,
  });

  return (
    <div className="register py-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add product</title>
      </Helmet>
      {error ? (
        <div className="alert alert-danger mb-3 p-2 text-center">{error}</div>
      ) : null}
      <h2 className="mb-4">Add product</h2>
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
          <label htmlFor="description" className="mb-1">
            description:
          </label>
          <input
            className="form-control"
            type="text"
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.description && formik.touched.description ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="price" className="mb-1">
            price:
          </label>
          <input
            className="form-control"
            type="text"
            id="price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.description && formik.touched.description ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="subcategoryId" className="mb-1">
          subcategoryId:
          </label>
          <input
            className="form-control"
            type="text"
            id="subcategoryId"
            name="subcategoryId"
            value={formik.values.subcategoryId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.description && formik.touched.description ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="brandId" className="mb-1">
          brandId:
          </label>
          <input
            className="form-control"
            type="text"
            id="brandId"
            name="brandId"
            value={formik.values.brandId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.description && formik.touched.description ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="color" className="mb-1">
          color:
          </label>
          <input
            className="form-control"
            type="text"
            id="color"
            name="brandId"
            value={formik.values.color}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.description && formik.touched.description ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="size" className="mb-1">
          size:
          </label>
          <input
            className="form-control"
            type="text"
            id="size"
            name="size"
            value={formik.values.size}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.description && formik.touched.description ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="image" className="mb-1">
          image:
          </label>
          <input
            className="form-control"
            type="text"
            id="image"
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.description && formik.touched.description ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        {!isLoading ? (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white w-25 d-block mx-auto mt-4"
          >
            Register
          </button>
        ) : (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white d-block mx-auto mt-4"
          >
            <i className="fa-solid fa-spinner fa-spin"></i>
          </button>
        )}
      </form>
    </div>
  );
}
