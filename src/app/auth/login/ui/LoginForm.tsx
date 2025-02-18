"use client";

import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { authenticate } from "@/actions";
import { IoInformationCircleOutline } from "react-icons/io5";
import clsx from "clsx";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);
  console.log({ state });

  useEffect(() => {
    if (state === "Success") {
      window.location.replace('/')
    }
  }, [state]);

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === "CredentialsSignin" && (
          <div className="flex flex-row mb-2">
            <IoInformationCircleOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">
              Las credenciales no son correctas
            </p>
          </div>
        )}
      </div>

      <LoginButton />

      {/* <button type="submit" className="btn-primary">
        Ingresar
      </button> */}

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className=" hover:underline text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

const LoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": !pending,
        "btn-disable": pending,
      })}
      disabled={pending}
    >
      Ingresar
    </button>
  );
};
