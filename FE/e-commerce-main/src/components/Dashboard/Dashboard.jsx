import axios from "axios";
import React from "react";

function getFeaturedProducts(page) {
  return axios.get(`http://localhost:3000/product`);
}

const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default Dashboard;
