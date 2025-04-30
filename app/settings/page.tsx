"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import SettingsHeader from "@/components/settings/settings-header";
import ProfileSettings from "@/components/settings/profile-settings";
import NotificationSettings from "@/components/settings/notification-settings";
import AppearanceSettings from "@/components/settings/appearance-settings";
import SecuritySettings from "@/components/settings/security-settings";
import BillingSettings from "@/components/settings/billing-settings";
import { useSettingsStore } from "@/store/theme.store";
import Sidebar from "@/components/Layout/Sidebar";

export default function SettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("account");
  const { appearance } = useSettingsStore();

  // Apply theme class to body
  useEffect(() => {
    document.body.className = appearance.theme === "light" ? "" : "dark";
  }, [appearance.theme]);

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <ProfileSettings />;
      case "notifications":
        return <NotificationSettings />;
      case "appearance":
        return <AppearanceSettings />;
      case "security":
        return <SecuritySettings />;
      case "billing":
        return <BillingSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div
      className={`flex min-h-screen ${
        appearance.theme === "light"
          ? "bg-white text-gray-900"
          : " text-white"
      }`}
    >
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 md:ml-72">
        <SettingsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-6 w-full">{renderContent()}</div>
      </div>
    </div>
  );
}
