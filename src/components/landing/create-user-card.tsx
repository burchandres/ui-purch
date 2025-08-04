import { Button } from "../base/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../base/card";
import { Input } from "../base/input";
import { Label } from "../base/label";

const fields = [
  {
    id: "username",
    type: "text",
    display: "Username",
  },
  {
    id: "password",
    type: "password",
    display: "Password",
  },
  {
    id: "firstName",
    type: "text",
    display: "First Name",
  },
  {
    id: "lastName",
    type: "text",
    display: "Last Name",
  },
];

export const CreateUserCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6 mt-4">
              {fields.map((field) => (
                <div className="grid gap-2">
                  <Label htmlFor={field.id}>{field.display}</Label>
                  <Input id={field.id} type={field.type} required />
                </div>
              ))}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="mt-4" type="submit">
            Submit
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
};
