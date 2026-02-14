"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { signInSchema } from "@/schemas/signInSchema";
import { Form } from "@/components/ui/form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
const page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  useEffect(() => {});
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    console.log(result);
    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast("Login failed", {
          description: "Incorrect Username or Password",
        });
      } else {
        toast("Error", {
          description: result.error,
        });
      }
    }
    if (result?.url) {
      router.replace("/dashboard");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Sign-in to your account
          </h1>
          <p className="mb-4">Enter your credentials</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Controller
              name="identifier"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Email/Username
                  </FieldLabel>
                  <Input
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Email/Username"
                    autoComplete="off"
                    {...field}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Password
                  </FieldLabel>
                  <Input
                    type="password"
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Pasword"
                    autoComplete="off"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default page;
