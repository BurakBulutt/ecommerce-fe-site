import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo1.svg";
import "../auth.css";
import { AuthService } from "../../../services/authenticationservice/AuthService";
import { useFormik } from "formik";
import { RegisterRequestSchema } from "../../../utilities/ValidationSchema";
import { toast } from "react-toastify";

const Register = () => {
  const service = new AuthService();
  const navigator = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [passwordReply, setPasswordReply] = useState("");

  const baseItem = {
    name: "",
    surname: "",
    username: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: baseItem,
    validationSchema: RegisterRequestSchema,
    onSubmit: (data) => {
      console.log(data);
      if (formik.values.password === passwordReply) {
        service.register(data).then((response) => {
          if (response.statusCode === 200) {
            navigator("/");
            setSubmitted(false);
          } else {
            toast.error(response.description, {
              position: "top-left",
              autoClose: 3000,
            });
          }
        });
      }
    }
  });

  return (
    <div className="login-container">
      <div className="login-content">
        {/* Logo Alanı */}
        <Link className="flex justify-center mb-6" to="/">
          <img src={Logo} alt="Logo" className="logo" />
        </Link>
        {/* Başlık */}
        <h2 className="text-2xl font-bold text-center mb-6">Kayıt Ol</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Ad Soyad Giriş */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Ad
            </label>
            <input
              type="text"
              id="name"
              placeholder="Ad"
              className="input-field"
              value={formik.values.name}
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="surname"
            >
              Soyad
            </label>
            <input
              type="text"
              id="surname"
              placeholder="Soyad"
              className="input-field"
              value={formik.values.surname}
              onChange={(e) => formik.setFieldValue("surname", e.target.value)}
              onBlur={formik.handleBlur}
            />
          </div>
          {/* Email Giriş */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Kullanıcı Adı
            </label>
            <input
              type="text"
              id="username"
              placeholder="Kullanıcı Adı"
              className="input-field"
              autoComplete="off"
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Şifre
            </label>
            <input
              type="password"
              id="password"
              placeholder="Şifre"
              className="input-field"
              autoComplete="off"
              value={formik.values.password}
              onChange={(e) => formik.setFieldValue("password", e.target.value)}
              onBlur={formik.handleBlur}
            />
          </div>
          {/* Şifreyi Tekrar Gir */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Şifreyi Tekrar Gir
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Şifreyi Tekrar Gir"
              className="input-field"
              autoComplete="off"
              value={passwordReply}
              onChange={(e) => setPasswordReply(e.target.value)}
              onBlur={formik.handleBlur}
            />
            {formik.values.password !== passwordReply && !submitted && (
              <p className="text-red-500 text-xs italic">Şifreler Eşleşmiyor</p>
            )}
          </div>
          {/* Kayıt Ol Butonu */}
          <button
            type="submit"
            className="button"
            onClick={() => setSubmitted(true)}
          >
            Kayıt Ol
          </button>
        </form>
        {/* Giriş Yap Linki */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Zaten bir hesabınız var mı?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
