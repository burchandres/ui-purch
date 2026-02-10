import { Activity as ActivityIcon, Landmark } from "lucide-react";
import type { FC } from "react";
import { type SectionConfig, SectionNav } from "../base/section-nav";
import { AccountsOverview } from "./accounts-overview";
import { ActivityFeed } from "./activity-feed";

export const AccountsPage: FC = () => {
  const sections: Record<string, SectionConfig> = {
    accounts: {
      icon: Landmark,
      component: <AccountsOverview />,
    },
    activity: {
      icon: ActivityIcon,
      component: <ActivityFeed />,
    },
  };

  return (
    <div style={{ height: "100%" }}>
      <SectionNav sections={sections} />
    </div>
  );
};
