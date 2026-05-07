"use client";

import { useId } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginErrorBanner } from "@/features/auth/components/login-error-banner";

type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export function LoginForm() {
  const emailId = useId();
  const passwordId = useId();
  const rememberId = useId();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    clearErrors("root");

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (response?.error) {
      setError("root", {
        type: "manual",
        message: "Invalid email or password. Use admin@test.com / admin123.",
      });
      return;
    }

    router.push(response?.url ?? "/dashboard");
    router.refresh();
  };

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Sign in form"
    >
      <LoginErrorBanner message={errors.root?.message} />

      <div className="space-y-2">
        <label
          htmlFor={emailId}
          className="block text-sm font-medium text-slate-700"
        >
          Email
        </label>
        <Input
          id={emailId}
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          error={errors.email?.message}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
          {...register("email", {
            required: "Email is required.",
          })}
        />
        {errors.email ? (
          <p id={`${emailId}-error`} className="text-sm text-red-600">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label
          htmlFor={passwordId}
          className="block text-sm font-medium text-slate-700"
        >
          Password
        </label>
        <Input
          id={passwordId}
          type="password"
          placeholder="**********"
          autoComplete="current-password"
          error={errors.password?.message}
          aria-describedby={errors.password ? `${passwordId}-error` : undefined}
          {...register("password", {
            required: "Password is required.",
          })}
        />
        {errors.password ? (
          <p id={`${passwordId}-error`} className="text-sm text-red-600">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <input
          id={rememberId}
          type="checkbox"
          className="h-4 w-4 rounded border-slate-300"
          {...register("remember")}
        />
        <label htmlFor={rememberId} className="text-sm text-slate-600">
          Remember me
        </label>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
