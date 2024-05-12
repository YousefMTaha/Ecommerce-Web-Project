import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";

export default function FeaturedProducts() {
  const { addToCart } = useContext(CartContext);

  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  async function addProductToCart(id) {
    setLoading(true);
    const response = await addToCart(id);
    setLoading(false);
    console.log(response);

    if (response.data.message === "done") {
      toast.success(response.data.message);
    } else {
      toast.error("Product not added to your cart");
    }
  }

  function getFeaturedProducts(page) {
    return axios.get(`http://localhost:3000/product`);
  }

  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["allProducts", page],
    queryFn: () => getFeaturedProducts(page),
  });

  function reFetch(num) {
    setPage(num);
    refetch();
  }

  return (
    <>
      {isLoading || loading ? (
        <div className="position-fixed top-0 start-0 bg-black bg-opacity-75 w-100 h-100 z-2 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fs-1 text-main"></i>
        </div>
      ) : null}
      <div className="row g-3">
        <h2 className="mt-5 mb-2">All Products</h2>
        {data?.data.Product.map((product) => {
          console.log(product);
          return (
            <div key={product._id} className="col-lg-2 col-md-4 col-sm-6">
              <div className="product p-2 position-relative">
                <NavLink to={`/productdetails/${product._id}`}>
                  <img
                    className="w-100"
                    src={
                      product.imageCover
                        ? product.imageCover.secure_url
                        : "https://cdn.discordapp.com/attachments/724206735350431763/1239191116579078236/no-image-available-icon-vector.png?ex=66420629&is=6640b4a9&hm=050cbbdf7a67532d60393443bc239d5566037b26866f2d44af1f5b8726943306&"
                    }
                    alt={product.name}
                  />
                  <span className="text-main font-sm fw-bolder my-1 d-block">
                    {product.category.name}
                  </span>
                  <h3 className="h6 fw-bolder">{product.name}</h3>
                  <div className="my-3 d-flex justify-content-between align-items-center">
                    <span className="price">{product.price} EGP</span>
                    <span className="rate">
                      <i className="fas fa-star rating-color"></i>{" "}
                      {product.avgRating}
                    </span>
                  </div>
                </NavLink>
                {userData.role !== "Admin" ? (
                  <div className="d-flex gap-3">
                    <button
                      onClick={() => addProductToCart(product._id)}
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
          );
        })}
      </div>
      <nav
        className="mt-3 nav d-flex align-items-center justify-content-center"
        aria-label="Page navigation"
      >
        <ul className="pagination m-0">
          <li className="page-item mx-1">
            <button
              onClick={() => {
                reFetch(1);
              }}
              className="text-white bg-main btn border"
              disabled={page === 1}
            >
              1
            </button>
          </li>
          <li className="page-item mx-1">
            <button
              onClick={() => {
                reFetch(2);
              }}
              className="text-white bg-main btn border"
              disabled={page === 2}
            >
              2
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
