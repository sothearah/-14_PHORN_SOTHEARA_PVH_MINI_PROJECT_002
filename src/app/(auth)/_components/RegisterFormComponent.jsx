"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { registerAction } from "../../../action/register.action";

export default function RegisterFormComponent() {
  const [submitError, setSubmitError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      birthdate: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSubmitError("");

    try {
      const result = await registerAction(data);
      if (result?.error || !result?.success) {
        setSubmitError(result?.message || "Registration failed.");
      }
    } catch (error) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {submitError && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {submitError}
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full name
        </label>
        <input
          type="text"
          {...register("name", { required: "Full name is required" })}
          placeholder="Jane Doe"
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="you@example.com"
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="••••••••"
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Birthdate */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Birthdate
        </label>
        <input
          type="date"
          {...register("birthdate")}
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2"
        />
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        variant="solid"
        className="w-full rounded-full bg-lime-400 py-3.5 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-lime-300"
      >
        Create account
      </Button>
    </form>
  );
}