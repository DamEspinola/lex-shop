"use client";

import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

import { login, registerUser } from "@/actions";

interface FormImputs {
  name: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormImputs>();

  const onSubmit: SubmitHandler<FormImputs> = async(data) => {
    setErrorMessage("");
    const { email, name, password } = data;

    // server actions
    const resp = await registerUser(name, email, password);
    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    await login(email.toLowerCase(), password);
    window.location.replace("/");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="email">Nombre completo</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-600": errors.name,
        })}
        type="text"
        autoFocus
        {...register("name", { required: true })}
      />
      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-600": errors.email,
        })}
        type="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-600": errors.password,
        })}
        type="password"
        {...register("password", { required: true, minLength: 6 })}
      />

      <div className="text-red-600">{errorMessage}</div>

      <button className="btn-primary">Crear cuenta</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="hover:underline text-center">
        Ingresar
      </Link>
    </form>
  );
};
