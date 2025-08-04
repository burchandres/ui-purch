import { Button } from "@/components/base/button";
import { Card, CardContent } from "@/components/base/card";
import { Form } from "@/components/base/form";
import { Input } from "@/components/base/input";
import { Label } from "@/components/base/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues } from "react-hook-form";
import { z, ZodType, ZodObject } from "zod";

type FieldConfig = {
  type: string;
  display: string;
  schema: ZodType;
};
type FieldsConfig = Record<string, FieldConfig>;

export function configToSchema(config: FieldsConfig): ZodObject {
  const shape: Record<string, ZodType> = {};

  Object.keys(config).forEach((key) => {
    shape[key] = config[key].schema;
  });

  return z.object(shape);
}

export function schemaToForm<T extends Record<string, any>>(
  schema: ZodType<T>,
) {
  const defaultValues = {} as Partial<T>;

  if ("shape" in schema && schema.shape) {
    Object.keys(schema.shape).forEach((key) => {
      (defaultValues as any)[key] = "";
    });
  }

  return useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
}

export function FormCard({
  config,
  onSubmit,
}: {
  config: FieldsConfig;
  onSubmit: (values: any) => void;
}) {
  const zodSchema = configToSchema(config);
  const form = schemaToForm(zodSchema);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardContent>
            <div className="flex flex-col gap-6 mt-4">
              {Object.entries(config).map(([key, field]) => (
                <div key={key} className="grid gap-2">
                  <Label htmlFor={key}>{field.display}</Label>
                  <Input id={key} type={field.type} {...form.register(key)} />
                  {form.formState.errors[key] && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors[key]?.message as string}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <Button className="mt-4" type="submit">
              Submit
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
