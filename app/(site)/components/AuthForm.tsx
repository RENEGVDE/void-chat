"use client";

import React, { useState, useCallback, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      if (variant === "LOGIN") {
        signIn("credentials", {
          ...data,
          redirect: false,
        })
          .then((res) => {
            if (res && res.error) {
              toast.error("Invalid credentials");
            }

            if (res && res.ok && !res.error) {
              toast.success("Logged in successfully");
            }
          })
          .finally(() => setIsLoading(false));
      } else {
        axios
          .post("/api/register", data)
          .then(() => signIn("credentials", data))
          .catch(() => toast.error("Username or email already exists"))
          .finally(() => setIsLoading(false));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, {
      redirect: false,
    })
      .then((res) => {
        if (res && res.error) {
          toast.error("Something went wrong");
        }

        if (res && res.ok && !res.error) {
          toast.success("Logged in successfully");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-neutral-800 px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              label="Username"
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            label="Email"
            type="email"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="Password"
            type="password"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Sign up"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-neutral-800 px-2 text-slate-200">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-slate-200">
          <div>
            {variant === "LOGIN"
              ? "Don't have an account?"
              : "Already have an account?"}
          </div>
          <div
            onClick={toggleVariant}
            className="underline cursor-pointer text-slate-400 hover:text-slate-200"
          >
            {variant === "LOGIN" ? "Sign up" : "Sign in"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
