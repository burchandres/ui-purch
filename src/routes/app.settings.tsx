import {
  BASE_SETTINGS_PATH,
  SettingsSwitcher,
} from "@/components/app/settings/switcher";
import { StickyHeader } from "@/components/app/sticky-header";
import {
  createFileRoute,
  Outlet,
  redirect,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";

export const Route = createFileRoute("/app/settings")({
  component: () => {
    const currentPath = useRouterState().location.pathname.slice(
      BASE_SETTINGS_PATH.length,
    );
    console.log(currentPath);

    return (
      <div>
        <StickyHeader>
          <span className="logo-text font-bold text-xl mb-1 ml-2">
            Settings
          </span>
        </StickyHeader>
        <div className="p-3">
          <SettingsSwitcher currentPath={currentPath}>
            <Outlet />
          </SettingsSwitcher>
        </div>
      </div>
    );
  },
  loader: ({ location }) => {
    if (
      [BASE_SETTINGS_PATH, BASE_SETTINGS_PATH.slice(0, -1)].includes(
        location.pathname,
      )
    )
      throw redirect({ to: "/app/settings/application" });
  },
});
