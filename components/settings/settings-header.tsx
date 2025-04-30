"use client";

import { useState } from "react";
import { Search, Bell, User, ChevronDown } from "lucide-react";
import { useSettingsStore } from "@/store/theme.store";

interface SettingsHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function SettingsHeader({
  activeTab,
  setActiveTab,
}: SettingsHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { appearance } = useSettingsStore();
  const isDarkMode = appearance.theme === "dark";

  const getTitle = () => {
    switch (activeTab) {
      case "account":
        return "Profile Information";
      case "notifications":
        return "Notification Preferences";
      case "appearance":
        return "Appearance Settings";
      case "security":
        return "Security Settings";
      case "billing":
        return "Billing";
      default:
        return "Settings";
    }
  };

  const getSubtitle = () => {
    switch (activeTab) {
      case "account":
        return "Update your account information and public profile";
      case "notifications":
        return "Manage how you receive notifications and alerts";
      case "appearance":
        return "Customize how OnChain Sage looks and feels";
      case "security":
        return "Manage your password and 2FA authentication settings";
      case "billing":
        return "Manage your subscription and payment methods";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium">Settings</h1>
        <div className="flex items-center space-x-4">
          <button
            className={
              isDarkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-black"
            }
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            className={
              isDarkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-black"
            }
          >
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex items-center">
            <div
              className={`h-8 w-8 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-200"
              } rounded-full flex items-center justify-center mr-2`}
            >
              <User className="h-4 w-4" />
            </div>
            <div className="flex items-center">
              <span className="text-sm mr-1">John Doe</span>
              <ChevronDown
                className={`h-4 w-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-evenly mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab("account")}
          className={`px-3 py-1 rounded-md text-sm ${
            activeTab === "account"
              ? isDarkMode
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black"
              : isDarkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Account
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`px-3 py-1 rounded-md text-sm ${
            activeTab === "notifications"
              ? isDarkMode
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black"
              : isDarkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Notifications
        </button>
        <button
          onClick={() => setActiveTab("appearance")}
          className={`px-3 py-1 rounded-md text-sm ${
            activeTab === "appearance"
              ? isDarkMode
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black"
              : isDarkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Appearance
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`px-3 py-1 rounded-md text-sm ${
            activeTab === "security"
              ? isDarkMode
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black"
              : isDarkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Security
        </button>
        <button
          onClick={() => setActiveTab("billing")}
          className={`px-3 py-1 rounded-md text-sm ${
            activeTab === "billing"
              ? isDarkMode
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black"
              : isDarkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Billing
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-medium">{getTitle()}</h2>
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {getSubtitle()}
        </p>
      </div>
    </div>
  );
}
