import { useFormik } from "formik";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import Joi from "joi";
import formikValidateUsingJoi from "../utils/formikValidateUsingJoi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const SingUpBiz = () => {
  const [error, setError] = useState("");

  const { createUser, login, user } = useAuth();

  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      name: "",
    },

    validate: formikValidateUsingJoi({
      name: Joi.string().min(2).max(255).required(),
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().min(6).max(1024).required(),
    }),

    async onSubmit(values) {
      try {
        await createUser({ ...values, biz: true });
        await login({ email: values.email, password: values.password });
        toast(`Your Account is Ready 👌`);

        navigate("/my-cards");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response);
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <PageHeader
        title=" Sign-Up For Business"
        description="Insert Your Information Below To Create Your Account"
      ></PageHeader>
      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
        {error && <div className="alert alert-danger">{error}</div>}
        <Input
          type="email"
          name="email"
          label="Email"
          required
          {...form.getFieldProps("email")}
          error={form.touched.email && form.errors.email}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          required
          {...form.getFieldProps(`password`)}
          error={form.touched.password && form.errors.password}
        />
        <Input
          type="text"
          name="name"
          label="Name"
          required
          {...form.getFieldProps(`name`)}
          error={form.touched.name && form.errors.name}
        />
        <div>
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary border border-dark"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SingUpBiz;
