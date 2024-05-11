import React, { useContext, useState } from "react";
import Style from "./Checkout.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const { payOnline } = useContext(CartContext);

  async function handleSubmit(values) {
    setIsLoading(true);
    let data
    if(values.coupon!==""){
      values.code = values.coupon
     data  = await payOnline(
      values
    );
    }
    else{
      const { coupon, ...paymentValues } = values;
      data = await payOnline(paymentValues);
    }
   
    console.log({data});
    setIsLoading(false);
    const paymentUrl = data.data.order.paymentUrl;
    if (data.data.message === "done") {
      window.location.href = paymentUrl;
    }
  }

  const validationSchema = Yup.object({
    phone: Yup.string()
      .required("This field is required")
      .matches(/^01[0125][0-9]{8}$/i, "Enter a valid phone number"),
    city: Yup.string().required("This field is required"),
    coupon: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      details: "details",
      phone: "",
      city: "",
      coupon:"",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="checkout py-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Checkout Data</title>
      </Helmet>
      <h2 className="mb-4">Checkout Data</h2>
      <form onSubmit={formik.handleSubmit}>
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
        <div className="form-group mb-2">
          <label htmlFor="city" className="mb-1">
            City:
          </label>
          <input
            className="form-control"
            type="text"
            id="city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.city && formik.touched.city ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.city}
            </div>
          ) : null}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="coupon" className="mb-1">
          Coupon:
          </label>
          <input
            className="form-control"
            type="tel"
            id="coupon"
            name="coupon"
            value={formik.values.coupon}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.coupon && formik.touched.coupon ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.coupon}
            </div>
          ) : null}
        </div>
        {!isLoading ? (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white w-25 d-block mx-auto mt-4"
          >
            Continue
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
