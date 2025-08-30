import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/base/tabs";
import type { FileRouteTypes } from "@/routeTree.gen";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import type React from "react";

export const BASE_SETTINGS_PATH = "/app/settings/" as const;
export type SettingsPath = Extract<
  FileRouteTypes,
  `${typeof BASE_SETTINGS_PATH}${string}`
>;

export const SettingsSwitcher = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const currentPath = useRouterState().location.pathname.substring(
    BASE_SETTINGS_PATH.length,
  );
  const settingsPaths = Object.keys(useRouter().routesByPath)
    .filter((path) => path.startsWith(BASE_SETTINGS_PATH))
    .map((path) => path.substring(BASE_SETTINGS_PATH.length));

  console.log("cp", currentPath);

  return (
    <Tabs value={currentPath}>
      <TabsList>
        {settingsPaths.map((path) => (
          <TabsTrigger key={path} value={path}>
            <Link to={`${BASE_SETTINGS_PATH}${path}` as FileRouteTypes["to"]}>
              {`${path.at(0)?.toUpperCase()}${path.substring(1)}`}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent key={currentPath} value={currentPath}>
        {children}
      </TabsContent>
    </Tabs>
  );
};
