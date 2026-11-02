"use client";

import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
  // toast
} from "@heroui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);

  const handleLoginSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };
    // console.log(user);
    // Convert FormData to plain object

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      rememberMe: true,
      callbackURL: "/",
    });
    if (data) {
      // console.log(data);
    }

    if (error) {
      // toast.warning(
      //   error.message || "Something is wrong,Invalid email or password",
      // );
      toast.warning(
        error.message || "Something is wrong,Invalid email or password",
      );
    }

    // toast.success(
    //   "You'r Loggin successfull. Please sign in to proceed further.",
    // );
    toast.success(
      "You'r Loggin successfull. Please sign in to proceed further.",
    );
  };
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <section className="flex flex-col  w-full items-center justify-center bg-[#FAF7F2] px-4 pt-6 pb-12 sm:px-6">
      <div className="mb-5 text-center">
        <p className="mb-3  font-semibold uppercase md:text-xl text-[#a06a45]">
          Welcome Back
        </p>
        <h1 className="font-serif text-3xl  font-bold tracking-tight text-[#174D38] sm:text-4xl">
          Sign in to BookNook
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-500">
          Your next favorite book is waiting for you. Sign in to continue your
          reading journey. Sign in to borrow a book, add one of your own, or
          check what you have out.
        </p>
      </div>
      <div className="w-full max-w-md rounded-2xl border border-[#E8E0D5] bg-white px-6 py-5 shadow-[0_12px_40px_rgba(23,77,56,0.07)] sm:p-9">
        <Form
          className="flex w-full flex-col gap-5"
          onSubmit={handleLoginSubmit}
        >
          <TextField isRequired name="email" type="email">
            <Label className="mb-2 text-sm font-medium text-[#26372F]">
              Email Address
            </Label>
            <Input
              placeholder="john@example.com"
              className="rounded-lg border-gray-300 placeholder:text-gray-400"
            />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="mb-2 text-sm font-medium text-[#26372F]">
              Password
            </Label>
            <InputGroup className="rounded-lg border-gray-300">
              <InputGroup.Input
                className="w-full text-black placeholder:text-gray-400"
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
              />
              <InputGroup.Suffix className="pe-1">
                <Button
                  isIconOnly
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  size="sm"
                  variant="ghost"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <FaEye className="size-4 text-gray-500" />
                  ) : (
                    <FaEyeSlash className="size-4 text-gray-500" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <FieldError />
          </TextField>

          <Button
            type="submit"
            className="w-full rounded-lg bg-[#174D38] py-3 font-semibold text-white transition-colors hover:bg-[#103B2A]"
          >
            Login
          </Button>
        </Form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#E8E0D5]" />
          <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-[#E8E0D5]" />
        </div>

        <Button
          onClick={handleGoogleLogin}
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#DCD5CB] bg-white py-2 font-medium text-[#26372F] transition-colors hover:bg-[#FAF7F2]"
        >
          <FcGoogle className="size-5" />
          Continue with Google
        </Button>

        <p className="mt-7 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#174D38] transition-colors hover:text-[#A56A43]"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}
