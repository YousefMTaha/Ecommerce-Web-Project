import React from "react";
import Style from "./Categories.module.scss";
import axios from "axios";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

export default function Categories() {
  function getCategories() {
    return axios.get(`http://localhost:3000/category`);
  }

  const { isLoading, isError, data, isFetching } = useQuery(
    "categoriesImages",
    getCategories
  );
  console.log(data);
  const categories = data ? data.data.Category : null;
  return (
    <div className="brands py-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
      </Helmet>
      {isLoading ? (
        <div className="position-fixed top-0 start-0  bg-black bg-opacity-75 w-100 h-100 z-2 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fs-1 text-main"></i>
        </div>
      ) : null}
      <div className="row g-4">
        {categories
          ? categories.map((category) => {
              return (
                <div className="col-md-3" key={category.name}>
                  <NavLink to={`/subcategories/${category._id}`}>
                    <div className="brand h-100 border rounded-3 overflow-hidden">
                      <img
                        className="w-100"
                        height={300}
                        src={
                          category.image
                            ? category.image.secure_url
                            : "https://cdn.discordapp.com/attachments/724206735350431763/1239191116579078236/no-image-available-icon-vector.png?ex=66420629&is=6640b4a9&hm=050cbbdf7a67532d60393443bc239d5566037b26866f2d44af1f5b8726943306&"
                        }
                        alt={category.name}
                      />
                      <h3 className="text-center text-main py-2">
                        {category.name}
                      </h3>
                    </div>
                  </NavLink>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
