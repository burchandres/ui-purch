import { Link } from "@tanstack/react-router";
import { PurchLogoText } from "@/components/icons/purch-logo";
import { CreateUserCard } from "./create-user-card";
import { LoginCard } from "./login-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../base/tabs";
import { Button } from "../base/button";

const Header = () => (
  <div className="sticky top-0 p-6">
    <Link to="/">
      <PurchLogoText />
    </Link>
  </div>
);

const Body = () => (
  <div className="block ml-16 mr-16 text-lg text-center space-y-4">
    <p> 👋 Welcome to Purch, a budgeting app created by 4 friends </p>
    <p>
      Check out the source code for the{" "}
      <a className="underline" href="https://github.com/burchandres/purch">
        service
      </a>{" "}
      or the <a href="https://github.com/burchandres/ui-purch">site</a>
    </p>
    <p>Or try it out by making an account below 👇</p>
  </div>
);

const tabs = [
  {
    id: "create",
    display: "Create Account",
    component: CreateUserCard,
  },
  {
    id: "login",
    display: "Login",
    component: LoginCard,
  },
];

export const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className="flex w-full justify-center">
        <Body />
      </div>
      <div className=" flex w-full justify-center mt-8">
        <Tabs defaultValue="create">
          <div className="mb-2">
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger value={tab.id}>{tab.display}</TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="min-w-sm p-0">
            {tabs.map((tab) => (
              <TabsContent value={tab.id}>
                <tab.component />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
};
