import React, { useContext, useState } from "react";
import Style from "./ProductDetails.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { UserContext } from "../../Context/UserContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const { userData } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  async function addProductToCart(id) {
    setLoading(true);
    const response = await addToCart(id);
    setLoading(false);

    if (response.data.message === "done") {
      toast.success(response.data.message, { position: "top-right" });
    } else {
      toast.error("Product not added successfully to your cart");
    }
  }

  function getProductDetails(id) {
    return axios.get(`http://localhost:3000/product/${id}`);
  }

  const { isLoading, isError, data, isFetching } = useQuery(
    "productDetails",
    () => getProductDetails(id)
  );

  const details = data ? data.data.Product : null;

  console.log(data);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Product Details</title>
      </Helmet>
      {isLoading || loading ? (
        <div className="position-fixed top-0 start-0  bg-black bg-opacity-75 w-100 h-100 z-2 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fs-1 text-main"></i>
        </div>
      ) : null}
      {details ? (
        <div className="row py-5 g-5">
          <div className="col-md-4">
            <Slider {...settings}>
              {details.images.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={image.secure_url}
                    alt={details.title}
                    className="w-100"
                  />
                );
              })}
            </Slider>
          </div>

          <div className="col-md-8 d-flex flex-column justify-content-center">
            <h2 className="text-start text-black h3 mb-3">
              {details.name}
              <span className="rate mx-5">
                {details.avgRating}
                <i className="fas fa-star rating-color"></i>
              </span>
            </h2>
            <p style={{ color: "#9b9797" }}>{details.description}</p>
            <h6 className="text-main mt-4">{details.category.name}</h6>

            <div className="d-flex flex-sm-column justify-content-between ">
              <h4 className="price ">{details.price} EGP</h4>

              <h5 className="font-weight-bolder">Stock : {details.stock}</h5>
            </div>
            <div className="d-flex justify-content-between align-items-center my-3">
              {userData.role !== "Admin" ? (
                <div className="d-flex gap-3">
                  <button
                    onClick={() => addProductToCart(id)}
                    className="btn bg-main text-white btn-sm"
                  >
                    Add To Cart
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
