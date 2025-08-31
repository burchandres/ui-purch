import { z } from "zod";
import { configToSchema, FormCard } from "./shared-form";
import { checkIfLoggedIn, login, type LoginData } from "@/lib/api/user";
import { toast } from "sonner";
import { redirect, useNavigate } from "@tanstack/react-router";
import type {
  NavigateOptions,
  UseNavigateResult,
} from "@tanstack/react-router";

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
type LoginFormData = z.infer<typeof zodSchema>;

async function onSubmit(
  values: LoginFormData,
  navigate: UseNavigateResult<string>,
) {
  const res = await login(values as LoginData);
  console.log("res", res);
  if (res && res.status === 200) {
    toast.success(res?.data.message || "Successfully logged in");
    navigate({ to: "/app/dashboard" });
  } else {
    toast.error(res?.data.message || "Unable to login");
  }
}

export const LoginCard = () => {
  const navigate = useNavigate();
  return FormCard({
    config: fields,
    onSubmit: (vals) => onSubmit(vals, navigate),
    navigate: navigate,
  });
};
