import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useParams } from 'react-router-dom';
import { useQuery } from "react-query";
export default function EditProduct() {
    let { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
   function  getCategories () {
    return  axios
      .get(`http://localhost:3000/category`)
      .then((response) => response);
  }
  function  getSubCategories () {
    return  axios
      .get(`http://localhost:3000/subcategory`)
      .then((response) => response);
  }
  function  getBrands () {
    return  axios
      .get(`http://localhost:3000/brand`)
      .then((response) => response);
  }
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [brands, setBrands] = useState(null);
  function getProductDetails(id) {
    return axios.get(`http://localhost:3000/product/${id}`);
  }

  const {Loading, isError, data, isFetching } = useQuery(
    "productDetails",
    () => getProductDetails(id)
  );
  useEffect( () => {
    
    const fetchData = async () => {
      
      setIsLoading(true);
      const dataCategory = await getCategories();
      const dataSubCategory = await getSubCategories();
      const dataBrand = await getBrands();
      setCategories(dataCategory.data.Category);
      setSubCategories(dataSubCategory.data.Subcategory);
      setBrands(dataBrand.data.Brand);
      setIsLoading(false);
     
    }
    
    fetchData();
  }, []);
  async function editProduct(values) {
    const {id,...edited}=values
    console.log(values)
    const formData = new FormData();
    Object.entries(values).forEach(([key, values]) => {
      formData.append(key, values);
    });
    setIsLoading(true);
    const { data } = await axios
      .put(`http://localhost:3000/product/${id}`, edited,
      {headers: { token: "yousef_" + localStorage.getItem("token") }}
      )
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      }).finally(() => {setIsLoading(false);})
      console.log(data)
    if (data.message === "done") {
        toast.success("Product updated successfully");
      navigate("/Dashboard");
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Min length is 3 chars")
      .max(20, "Max length is 16 chars")
      .required("This field is required"),
    description: Yup.string().required("This field is required"),
    price:Yup.string().required("This field is required"),
    stock:Yup.string().required("This field is required"),
  });
   const details = data ? data.data.Product : null;
   
   const [initialValues, setInitialValues] = useState({});
  
  let image=null,imageCover=null;
   useEffect(() => {
     if (data) {
       const details = data.data.Product;
     
       formik.setValues(
        {
            id:details._id,
            name:details.name,
            description:details.description,
            price:details.price,
            stock:details.stock,
            category:details.category,
            subcategoryId:details.subcategoryId,
            brandId:details.brandId,
        }
       )
     }
   }, [data]);
   
   const formik = useFormik({
     initialValues: {},
     validationSchema,
     onSubmit: editProduct,
   });
   const handleImageChange = (event) => {
    
    const { name, files } = event.target;
    formik.setFieldValue(name, files[0]);
  };
  return (
    <div className="register py-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add product</title>
      </Helmet>
   {categories && subCategories && brands && details!==null && (
    <div>
    <h2 className="mb-4">Add product</h2>
    {
    <form onSubmit={formik.handleSubmit}>
    <div className="form-group mb-2">
        <label htmlFor="name" className="mb-1">
        Name:
        </label>
        <input
        className="form-control"
        type="text"
        id="name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name ? (
        <div className="alert alert-danger mt-2 p-2">
            {formik.errors.name}
        </div>
        ) : null}
    </div>
    <div className="form-group mb-2">
        <label htmlFor="description" className="mb-1">
        description:
        </label>
        <input
        className="form-control"
        type="text"
        id="description"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
        {formik.errors.description && formik.touched.description ? (
        <div className="alert alert-danger mt-2 p-2">
            {formik.errors.description}
        </div>
        ) : null}
    </div>
    <div className="form-group mb-2">
        <label htmlFor="price" className="mb-1">
        price:
        </label>
        <input
        className="form-control"
        type="text"
        id="price"
        name="price"
        value={formik.values.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
        {formik.errors.price && formik.touched.price ? (
        <div className="alert alert-danger mt-2 p-2">
            {formik.errors.price}
        </div>
        ) : null}
    </div>
    <div className="form-group mb-2">
        <label htmlFor="category" className="mb-1">
        category:
        </label>
        <select
        className="form-control"
        id="category"
        name="category"
        value={formik.values.category}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        >
        {categories.map((category) => (
            <option key={category._id} value={category._id  }>
            {category.name}
            </option>
        ))}
        </select>
        {formik.errors.category && formik.touched.category ? (
        <div className="alert alert-danger mt-2 p-2">
            {formik.errors.category}
        </div>
        ) : null}
    </div>
    <div className="form-group mb-2">
        <label htmlFor="subcategory" className="mb-1">
        subcategory:
        </label>
        <select
        className="form-control"
        id="subcategoryId"
        name="subcategoryId"
        value={formik.values.subcategoryId}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        >
        {subCategories.map((subcategory) => (
            <option key={subcategory._id} value={subcategory._id}>
            {subcategory.name}
            </option>
        ))}
        </select>
        {formik.errors.subcategoryId && formik.touched.subcategoryId ? (
        <div className="alert alert-danger mt-2 p-2">
            {formik.errors.subcategoryId}
        </div>
        ) : null}
    </div>
    <div className="form-group mb-2">
        <label htmlFor="brand" className="mb-1">
        brand:
        </label>
        <select
        className="form-control"
        id="brandId"
        name="brandId"
        value={formik.values.brandId}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        >
        {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
            {brand.name}
            </option>
        ))}
        
        </select>
        {formik.errors.brandId && formik.touched.brandId ? (
        <div className="alert alert-danger mt-2 p-2">
            {formik.errors.brandId}
        </div>
        ) : null}
    </div>
    <div className="form-group mb-2">
        <label htmlFor="stock" className="mb-1">
        stock:
        </label>
        <input
        className="form-control"
        type="text"
        id="stock"
        name="stock"
        value={formik.values.stock}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        />
        {formik.errors.stock && formik.touched.stock ? (
        <div className="alert alert-danger mt-2 p-2">
            {formik.errors.stock}
        </div>
        ) : null}
    </div>
    {/* <div className="form-group mb-2">
        <label htmlFor="images" className="mb-1">
          images:
        </label>
        <input
          className="form-control"
          type="file" 
          id="images"
          name="images"
          onChange={(e) => {
            const file = e.target.files[0];
            image=file
            formik.setFieldValue("imageCover", file);
            
          }}
          onBlur={formik.handleBlur}
        />
        {formik.errors.images && formik.touched.images ? (
          <div className="alert alert-danger mt-2 p-2">
            {formik.errors.images}
          </div>
        ) : null}
      </div>
      <div className="form-group mb-2">
        <label htmlFor="imageCover" className="mb-1">
        imageCover:
        </label>
        <input
          className="form-control"
          type="file" // Change type to "file" for image input
          id="imageCover"
          name="imageCover"
          onChange={(e) => {
            const file = e.target.files[0];
            imageCover=file
            formik.setFieldValue("imageCover", file);
            
          }}
          onBlur={formik.handleBlur}
        />
        {formik.errors.imageCover && formik.touched.imageCover ? (
          <div className="alert alert-danger mt-2 p-2">
            {formik.errors.imageCover}
          </div>
        ) : null}
      </div> */}
        {!isLoading ? (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white w-25 d-block mx-auto mt-4"
          >
            Edit Product
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
    }
    </div>

    )}
 
  </div>)
  }

