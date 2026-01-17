import { Activity as ActivityIcon, Home as HomeIcon } from "lucide-react";
import { type FC, useEffect } from "react";
import {
  useAccounts,
  useCategories,
  useItems,
  useTransactions,
} from "@/hooks/budget";
import { type SectionConfig, SectionNav } from "../base/section-nav";
import { Home } from "./home";
import { ActivityFeed } from "../accounts/activity-feed";

export const DashboardPage: FC = () => {
  const sections: Record<string, SectionConfig> = {
    home: {
      icon: HomeIcon,
      component: <Home />,
    },
    activity: {
      icon: ActivityIcon,
      component: <ActivityFeed />,
    },
  };

  return (
    <div style={{ height: "100%" }}>
      <SectionNav sections={sections} />;
    </div>
  );
};
