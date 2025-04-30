"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSettingsStore } from "@/store/theme.store";

export default function NotificationSettings() {
  const { toast } = useToast();
  const { notifications, updateNotifications, appearance } = useSettingsStore();
  const [localNotifications, setLocalNotifications] = useState(notifications);
  const [isDirty, setIsDirty] = useState(false);
  const isDarkMode = appearance.theme === "dark";

  // Check if form is dirty (values changed)
  useEffect(() => {
    const isChanged =
      JSON.stringify(localNotifications) !== JSON.stringify(notifications);
    setIsDirty(isChanged);
  }, [localNotifications, notifications]);

  const handleToggle = (key: string, value: boolean) => {
    setLocalNotifications({
      ...localNotifications,
      [key]: value,
    });
  };

  const handleSave = () => {
    updateNotifications(localNotifications);
    toast({
      title: "Preferences saved",
      description: "Your notification preferences have been updated.",
    });
    setIsDirty(false);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Signal Notifications</h3>
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          } mb-4`}
        >
          Choose which signals you want to be notified about
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">
                High Confidence Signals
              </Label>
              <p
                className={`text-xs ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Receive alerts for high confidence trading signals
              </p>
            </div>
            <Switch
              checked={localNotifications.highConfidenceSignals}
              onCheckedChange={(checked) =>
                handleToggle("highConfidenceSignals", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Emerging Trends</Label>
              <p
                className={`text-xs ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Receive alerts for emerging trend signals
              </p>
            </div>
            <Switch
              checked={localNotifications.emergingTrends}
              onCheckedChange={(checked) =>
                handleToggle("emergingTrends", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Risky Signals</Label>
              <p
                className={`text-xs ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Receive alerts for risky trading signals
              </p>
            </div>
            <Switch
              checked={localNotifications.riskySignals}
              onCheckedChange={(checked) =>
                handleToggle("riskySignals", checked)
              }
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Notification Channels</h3>
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Choose how you want to receive notifications
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Email Notifications</Label>
              <p
                className={`text-xs ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={localNotifications.emailNotifications}
              onCheckedChange={(checked) =>
                handleToggle("emailNotifications", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">
                Browser Notifications
              </Label>
              <p
                className={`text-xs ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Receive notifications in your browser
              </p>
            </div>
            <Switch
              checked={localNotifications.browserNotifications}
              onCheckedChange={(checked) =>
                handleToggle("browserNotifications", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">
                Mobile Notifications
              </Label>
              <p
                className={`text-xs ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Receive notifications on your mobile device
              </p>
            </div>
            <Switch
              checked={localNotifications.mobileNotifications}
              onCheckedChange={(checked) =>
                handleToggle("mobileNotifications", checked)
              }
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          className={`${
            isDirty ? "bg-black hover:bg-gray-900" : "bg-gray-500"
          } text-white`}
          onClick={handleSave}
          disabled={!isDirty}
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
