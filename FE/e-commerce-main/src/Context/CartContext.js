import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartNum, setCartNum] = useState(0);
  const [cartId, setCartId] = useState(null);

  function addToCart(productId) {
    return axios
      .post(
        "http://localhost:3000/cart/",
        { productId },
        { headers: { token: "yousef_" + localStorage.getItem("token") } }
      )
      .then((response) => {
        setCartNum(response.data.numOfCartItems);
        console.log(response);
        return response;
      })
      .catch((error) => error);
  }

  function getLoggedUserCart() {
    return axios
      .get("http://localhost:3000/cart/", {
        headers: { token: "yousef_" + localStorage.getItem("token") },
      })

      .then((response) => {
        console.log(response);
        setCartNum(response.data.cart.noProduct);
        setCartId(response.data.cart._id);
        return response;
      })
      .catch((error) => error);
  }

  function removeItem(id) {
    return axios
      .delete(`http://localhost:3000/cart`, {
        data: { productId: id },
        headers: { token: "yousef_" + localStorage.getItem("token") },
      })
      .then((response) => {
        setCartNum(response.data.noProduct);
        return response;
      })
      .catch((error) => error);
  }

  function updateQuantity(id, quantity) {
    return axios
      .put(
        `http://localhost:3000/cart/${id}`,
        { quantity },
        { headers: { token: "yousef_" + localStorage.getItem("token") } }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function payOnline(values) {
    const object = values.code
      ? { address: values.city, paymentMethod: "Card", code: values.code }
      : { address: values.city, paymentMethod: "Card" };
    return axios
      .post(`http://localhost:3000/order/`, object, {
        headers: { token: "yousef_" + localStorage.getItem("token") },
      })
      .then((response) => response)
      .catch((error) => error.response.data.message);
  }


  useEffect(() => {
    getLoggedUserCart();
  }, [cartId]);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        removeItem,
        updateQuantity,
        cartNum,
        payOnline,
        setCartNum,
        cartId,
        setCartId,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
