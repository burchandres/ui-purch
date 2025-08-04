import { z } from "zod";
import { configToSchema, FormCard, schemaToForm } from "./shared-form";

const fields = {
  username: {
    type: "text",
    display: "Username",
    schema: z
      .string()
      .min(2, { message: "Username must be at least 2 characters" })
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
  firstName: {
    type: "text",
    display: "First Name",
    schema: z
      .string()
      .min(1, { message: "First name is required" })
      .max(20, { message: "First name must be less than 20 characters" }),
  },
  lastName: {
    type: "text",
    display: "Last Name",
    schema: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(20, { message: "Last name must be less than 20 characters" }),
  },
} as const;

const zodSchema = configToSchema(fields);
function onSubmit(values: z.infer<typeof zodSchema>) {
  // make api call
  console.log(values);
}

export const CreateAccountCard = () =>
  FormCard({
    config: fields,
    onSubmit: onSubmit,
  });
