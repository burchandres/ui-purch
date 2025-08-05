import { z } from "zod";
import { configToSchema, FormCard } from "./shared-form";
import { login, type LoginData } from "@/lib/api/user";
import { toast } from "sonner";
import { redirect } from "@tanstack/react-router";

const fields = {
  username: {
    type: "text",
    display: "Username",
    schema: z
      .string()
      .min(1, { message: "Username is required" })
      .max(20, { message: "Username must be less than 20 characters" }),
  },
  password: {
    type: "password",
    display: "Password",
    schema: z
      .string()
      .min(4, { message: "Password must be at least 4 characters" })
      .max(20, { message: "Password must be less than 20 characters" }),
  },
} as const;

const zodSchema = configToSchema(fields);

async function onSubmit(values: z.infer<typeof zodSchema>) {
  const res = await login(values as LoginData);
  if (res.message && res.message === "Login successful")
    throw redirect({ to: "/app/dashboard" });
  else
    toast.error(
      typeof res === "string" && res.length > 0 ? res : "Unable to login",
    );
}

export const LoginCard = () =>
  FormCard({
    config: fields,
    onSubmit: onSubmit,
  });
