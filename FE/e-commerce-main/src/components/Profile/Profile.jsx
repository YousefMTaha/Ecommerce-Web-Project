import React, { useContext } from "react";
import Style from "./Profile.module.scss";
import jwtDecode from "jwt-decode";
import { Helmet } from "react-helmet";
import { UserContext } from "../../Context/UserContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const info = jwtDecode(localStorage.getItem("token"));
  console.log(info);
  const { userData } = useContext(UserContext);

  console.log(userData);

  return (
    <section className="vh-100">
      <div className="container py-5 h-80">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-12 col-xl-4">
            <div className="card">
              <div className="card-body text-center">
                <div className="mt-3 mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    className="rounded-circle img-fluid"
                    alt=""
                  />
                </div>
                <h3 className="mb-2 font-weight-bold">{userData.name}</h3>
                <h6 className="mb-4 fst-italic">
                  {userData.role} <span className="mx-auto"></span>
                </h6>
                <h4 className="text-dark mb-4">{userData?.email}</h4>

                <Link to={"/EditProfile"}>
                  <button
                    type="button"
                    className="btn bg-main btn-rounded btn-lg text-white"
                  >
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
