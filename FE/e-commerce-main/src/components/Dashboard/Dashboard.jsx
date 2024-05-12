import axios from "axios";
import { useQuery } from "react-query";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

import { Link } from "react-router-dom";
const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  function getFeaturedProducts(page) {
    return axios.get(`http://localhost:3000/product/getUserProducts`, {
      headers: { token: "yousef_" + localStorage.getItem("token") },
    });
  }
  function reFetch(num) {
    setPage(num);
    refetch();
  }

  const removeProduct = async (id) => {
    console.log(id);
    setLoading(true);
    await axios
      .delete(
        `http://localhost:3000/product/${id}`,

        { headers: { token: "yousef_" + localStorage.getItem("token") } }
      )
      .then(() => {
        setLoading(false);
        toast.success("the product has been removed successfully ");
      })
      .catch(() => {
        toast.error(" failed to removed product");
      });

    await new Promise((resolve) => setTimeout(resolve, 1500));
    window.location.reload();
  };

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["SellerProducts", page],
    queryFn: () => getFeaturedProducts(page),
  });

  return (
    <>
      {/* {isLoading ? (
        <div className="position-fixed top-0 start-0 bg-black bg-opacity-75 w-100 h-100 z-2 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fs-1 text-main"></i>
        </div>
      ) : null}{" "} */}
      {data ? (
        <div className="row g-3">
          <h2 className="mt-5 mb-4">Your Products</h2>
          <div className="">
            <Link to={"/addproduct"}>
              <button className="btn bg-main text-white btn-sm">
                + Add product
              </button>
            </Link>
          </div>
          {data?.data.products.map((product) => {
            console.log(product);
            return (
              <div key={product._id} className="col-lg-2 col-md-4 col-sm-6">
                <div className="product p-2 position-relative">
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

                  <div className="d-flex gap-5">
                    <NavLink to={`/editproduct/${product.id}`}>
                      <button className="btn bg-main text-white btn-sm">
                        Edit Product
                      </button>
                    </NavLink>
                    <button
                      onClick={() => {
                        removeProduct(product.id);
                      }}
                      className="btn btn-danger text-white bg-red mx-auto btn-sm"
                    >
                      <i className="fa-solid fa-x"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="vh-100 d-flex align-items-center justify-content-center px-3 my-5 bg-main-light">
          <Link to={"/addproduct"}>
            <button className="btn bg-main text-white btn-sm">
              + Add product
            </button>
          </Link>
          <div className=""></div>
          <h2>You don't have any products.</h2>
        </div>
      )}
    </>
  );
};

export default Dashboard;
