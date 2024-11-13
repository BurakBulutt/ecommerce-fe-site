import React, { useContext, useState } from "react";
import Logo from "../../../assets/logo1.svg";
import "../auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginRequestSchema } from "../../../utilities/ValidationSchema";
import { AuthService } from "../../../services/authenticationservice/AuthService";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { ApplicationContext } from "../../../context/ApplicationContext";


const Login = () => {
  const service = new AuthService();
  const navigator = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const { setToken } = useContext(ApplicationContext);

  const baseItem = {
    username: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: baseItem,
    validationSchema: LoginRequestSchema,
    onSubmit: (data) => {
      service.login(data).then((response) => {
        if (response.statusCode === 200) {
          const token = response.data.token;
          Cookies.remove("token");
          Cookies.set("token", `Bearer ${token}`);
          setToken(Cookies.get("token"))

          navigator("/",{replace : true});
          setSubmitted(false);
        } else if (response.statusCode === 1002 || 1000) {
          toast.error(response.description, {
            position: "top-left",
            autoClose: 3000,
          });
        }
      });
    },
  });

  return (
    <div className="login-container">
      <div className="login-content">
        {/* Logo Alanı */}
        <Link className="flex justify-center mb-6" to="/">
          <img src={Logo} alt="Logo" className="logo" />
        </Link>
        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          {/* Email Giriş */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Kullanıcı Adı
            </label>
            <input
              type="text"
              id="username"
              placeholder="kullanıcı adı"
              className="input-field"
              value={formik.values.username}
              onChange={(e) => formik.setFieldValue("username", e.target.value)}
              onBlur={formik.handleBlur}
            />
          </div>
          {submitted && formik.touched.username && formik.errors.username && (
            <p className="text-red-500 text-xs italic">
              {formik.errors.username}
            </p>
          )}

          {/* Şifre Giriş */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Şifre
            </label>
            <input
              type="password"
              id="password"
              placeholder="şifre"
              className="input-field"
              value={formik.values.password}
              onChange={(e) => formik.setFieldValue("password", e.target.value)}
              onBlur={formik.handleBlur}
            />
          </div>
          {submitted && formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs italic">
              {formik.errors.password}
            </p>
          )}

          {/* Kayıt Ol Linki */}
          <div className="mb-4 text-center">
            <p className="text-m text-gray-600">
              Hesabınız yok mu?{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-700"
              >
                Kayıt olun
              </Link>
            </p>
          </div>

          {/* Giriş Yap Butonu */}
          <button
            type="submit"
            className="button"
            onSubmit={(e) => {
              setSubmitted(true);
            }}
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
