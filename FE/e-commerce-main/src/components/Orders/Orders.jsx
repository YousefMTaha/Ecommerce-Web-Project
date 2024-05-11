import React from "react";
import Style from "./Orders.module.scss";
import axios from "axios";
import { useQuery } from "react-query";
import jwtDecode from "jwt-decode";
import { Helmet } from "react-helmet";

export default function Orders() {
  const { id } = jwtDecode(localStorage.getItem("token"));

  async function getOrders(id) {
    return axios
      .get(`http://localhost:3000/order/`, {
        headers: { token: "yousef_" + localStorage.getItem("token") },
      })
      .catch((error) => error.response.data.message);
  }

  const { isLoading, isError, data, isFetching } = useQuery("getOrders", () =>
    getOrders(id)
  );
  const refundOrder =(id)=>{
    console.log(id)
    return axios
      .put(`http://localhost:3000/order/${id}`,{},{
        headers: { token: "yousef_" + localStorage.getItem("token") },
      })
      .catch((error) =>{console.log( error.response.data.message)});
  };
  // console.log(useQuery("getOrders", () => getOrders(id)).data);
  // console.log(useQuery("getOrders", () =>getOrders(id)));
  // console.log(data);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Orders</title>
      </Helmet>
      {isLoading ? (
        <div className="position-fixed top-0 start-0  bg-black bg-opacity-75 w-100 h-100 z-2 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fs-1 text-main"></i>
        </div>
      ) : null}
      {data !== "no orders found" ? (
        <div className="py-5">
          {data?.data.orders.map((order) => {
            return (
              <div className="p-3 my-3 bg-main-light" key={order._id}>
                <h3 className="text-main">Order ID : {order._id}</h3>
                <h4 className="text-main">
                  Total Price : {order.totalPriceAfterDescount} EGP
                </h4>
                <div className="row g-4 my-2">
                  {order.products.map((item) => {
                    return (
                      <div className="col-md-6" key={item.id._id}>
                        <div className="row">
                          <div className="col-4">
                            <img
                              className="w-100"
                              src={item.id.imageCover.secure_url}
                              alt={item.id}
                            />
                          </div>
                          <div className="col-8 d-flex justify-content-center flex-column">
                            <h6 className="fw-bold">{item.id.name}</h6>
                            <p className="text-main fw-bold">
                              Item Count : {item.quantity}
                            </p>
                            <p className="text-main fw-bold">
                              Item Price : {item.price} EGP
                            </p>
                            <p className="text-main fw-bold">
                              Status : {order.status}
                            </p>
                          </div>
                        </div>                
                        <button className="btn btn-danger m-3 " onClick={()=>refundOrder(order._id)}>Refund</button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="vh-100 d-flex align-items-center justify-content-center px-3 my-5 bg-main-light">
          <h2>There are no orders.</h2>
        </div>
      )}
    </>
  );
}
