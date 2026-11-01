"use client";

import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleCon, setIsVisibleCon] = useState(false);

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    alert("Form submitted successfully!");
  };

  return (
    <section className="flex flex-col items-center justify-center px-4 pt-6 pb-12">
      <div className="mb-4 text-center">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-[#174D38] sm:text-4xl">
          Create an Account
        </h1>
        <p className="mt-2 text-sm max-w-2xl leading-6 text-gray-500">
          Join BookNook and discover your next favorite book. Free to join, and
          it takes a minute. You need an email address and a password of your
          own — nothing else, and no card.
        </p>
      </div>
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-[#174D38]/5 sm:p-8">
        {/* Registration Form */}
        <Form className="w-full" onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend className="sr-only">
              Registration Form
            </Fieldset.Legend>

            <Description className="sr-only text-black">
              Enter your details to create a BookNook account.
            </Description>

            <FieldGroup className="gap-5 ">
              <TextField
                isRequired
                name="name"
                type="text"
                validate={(value) => {
                  if (value.length < 3) {
                    return "Name must be at least 3 characters";
                  }
                  return null;
                }}
              >
                <Label className="mb-2 text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <Input
                  placeholder="John Doe"
                  className="rounded-lg border-gray-300 placeholder:text-gray-400"
                />
                <FieldError />
              </TextField>

              <TextField isRequired name="name" type="url">
                <Label className="mb-2 text-sm font-medium text-gray-700">
                  Profile Image URL
                </Label>
                <Input
                  placeholder="John Doe"
                  className="rounded-lg border-gray-300 placeholder:text-gray-400"
                />
                <FieldError />
              </TextField>

              <TextField isRequired name="email" type="email">
                <Label className="mb-2 text-sm font-medium text-gray-700">
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
                <Label className="mb-2 text-sm font-medium text-gray-700">
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

              <TextField
                isRequired
                minLength={8}
                name="confirmPassword"
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
                <Label className="mb-2 text-sm font-medium text-gray-700">
                  Confirm Password
                </Label>
                <InputGroup className="rounded-lg border-gray-300 ">
                  <InputGroup.Input
                    className="w-full placeholder:text-gray-400"
                    type={isVisibleCon ? "text" : "password"}
                    placeholder="Confirm your password"
                  />
                  <InputGroup.Suffix className="pe-1">
                    <Button
                      isIconOnly
                      aria-label={
                        isVisibleCon ? "Hide password" : "Show password"
                      }
                      size="sm"
                      variant="ghost"
                      onPress={() => setIsVisibleCon(!isVisibleCon)}
                    >
                      {isVisibleCon ? (
                        <FaEye className="size-4 text-gray-500" />
                      ) : (
                        <FaEyeSlash className="size-4 text-gray-500" />
                      )}
                    </Button>
                  </InputGroup.Suffix>
                </InputGroup>
                <FieldError />
              </TextField>
            </FieldGroup>

            {/* Register Button */}
            <Fieldset.Actions className=" w-full">
              <Button
                type="submit"
                className="w-full rounded-lg bg-[#174D38] py-3 font-semibold text-white transition-colors hover:bg-[#103B2B]"
              >
                Register
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google Registration */}
        <Button
          type="button"
          variant="outline"
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <FcGoogle className="size-5" />
          Continue with Google
        </Button>

        {/* Login Link */}
        <p className="mt-7 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#174D38] underline-offset-4 transition-colors hover:text-[#103B2B] hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
