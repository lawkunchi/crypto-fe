import InputError from "../components/InputError";
import InputLabel from "../components/InputLabel";
import PrimaryButton from "../components/PrimaryButton";
import TextInput from "../components/TextInput";
import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validations: {
      name: { required: true },
      email: { required: true, pattern: /^\S+@\S+\.\S+$/ },
      password: { required: true },
    },
    onSubmit: async () => {
      try {
        await signUp(values.email, values.name, values.password);
        navigate("/");
      } catch (error) {
        if (error instanceof Error) {
          console.log(error, "login error");
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    },
  });

  return (

      <form onSubmit={handleSubmit}>
        <InputError message={error} className="mt-2" />

        <div>
          <InputLabel htmlFor="name" value="Name" />
          <TextInput
            id="name"
            type="name"
            name="name"
            value={values.name}
            className="mt-1 block w-full"
            autoComplete="name"
            isFocused={true}
            onChange={handleChange}
          />
        </div>
        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={values.email}
            className="mt-1 block w-full"
            autoComplete="email"
            isFocused={true}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={values.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link
            to="/auth/login"
            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Have an account?
          </Link>

          <PrimaryButton className="ms-4" disabled={isSubmitting}>
            Register
          </PrimaryButton>
        </div>
      </form>
  );
}
