import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigasi from "../components/navbar/Navigasi";
import POSPage from "./POSPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/style.css";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useEffect } from "react";

const HomePage = () => {
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState(false);

  const postDataToApi = async (dataProduct) => {
    const result = await axios.post(
      "http://localhost:5000/api/products",
      dataProduct
    );

    swal({
      title: "Success",
      text: `${dataProduct.name} has been Added!`,
      icon: "success",
      button: "OK",
    }).then(() => {
      setProduct(dataProduct);
    });
  };
  const getDataToApi = async () => {
    if (search) {
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:5000/api/products/${search}`
      );

      if (result.data.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
      setProductList(result.data);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const result = await axios.get("http://localhost:5000/api/products");
      setProductList(result.data);
      setIsLoading(false);
      setNotFound(false);
    }
  };

  const handleLogin = () => {
    swal({
      title: "Success!",
      text: "Login Success",
      icon: "success",
      button: "OK",
    }).then(() => {
      setLogin(true);
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleLogout = () => {
    swal({
      title: "Success!",
      text: "Logout Success",
      icon: "success",
      button: "OK",
    }).then(() => {
      setLogin(false);
    });
  };

  const handleRemove = (id) => {
    swal({
      title: "Are you sure remove?",
      text: `${id.name} `,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal({
          title: "Success!",
          text: `${id.name} has been Removed!`,
          icon: "success",
          button: "OK",
        }).then(() => {
          axios
            .delete(`http://localhost:5000/api/products/${id.id}`)
            .then((res) => {
              getDataToApi();
            });
        });
      }
    });
  };

  useEffect(() => {
    getDataToApi();
  }, [product, search]);

  return (
    <div>
      <header>
        <Navigasi
          add={postDataToApi}
          login={handleLogin}
          isLogin={login}
          logout={handleLogout}
          search={handleSearch}
        />
      </header>
      <main>
        <POSPage
          list={productList}
          isLoading={isLoading}
          login={login}
          remove={handleRemove}
          notFound={notFound}
        />
        <ToastContainer />
      </main>
      <footer>
        {!isLoading ? <p className="footer">Created by Ibnulsyam</p> : ""}
      </footer>
    </div>
  );
};

export default HomePage;
