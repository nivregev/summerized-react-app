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

const SingIn = () => {
  const [error, setError] = useState("");

  const { login: loginUser, user } = useAuth();

  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },

    validate: formikValidateUsingJoi({
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().min(6).max(1024).required(),
    }),

    async onSubmit(values) {
      try {
        await loginUser(values);
        toast(`Lets Start 👌`);
        navigate("/");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
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
        title="Sign-In With Real App"
        description=" Insert Your Account Details Below"
      ></PageHeader>

      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          type="email"
          name="email"
          label="Email"
          required
          {...form.getFieldProps(`email`)}
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

        <div>
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary border border-dark"
          >
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export default SingIn;
