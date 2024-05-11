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
    <section class="vh-100">
      <div class="container py-5 h-80">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-12 col-xl-4">
            <div class="card">
              <div class="card-body text-center">
                <div class="mt-3 mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    class="rounded-circle img-fluid"
                    alt=""
                  />
                </div>
                <h3 class="mb-2 font-weight-bold">{userData.name}</h3>
                <h6 class="mb-4 fst-italic">
                  {userData.role} <span class="mx-auto"></span>
                </h6>
                <h4 class="text-dark mb-4">{userData?.email}</h4>

                <Link to={"./EditProfile.jsx"}>
                  <button
                    type="button"
                    class="btn btn-success btn-rounded btn-lg"
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
