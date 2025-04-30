"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSettingsStore } from "@/store/theme.store";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function SecuritySettings() {
  const { toast } = useToast();
  const { security, updateSecurity, appearance } = useSettingsStore();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    security.twoFactorEnabled
  );
  const isDarkMode = appearance.theme === "dark";

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: PasswordFormValues) => {
    // In a real app, you would send this to your API
    updateSecurity({
      ...security,
      passwordLastChanged: new Date().toISOString(),
    });

    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    });

    reset();
  };

  const handleTwoFactorToggle = (checked: boolean) => {
    setTwoFactorEnabled(checked);
    updateSecurity({
      ...security,
      twoFactorEnabled: checked,
    });

    if (checked) {
      toast({
        title: "Two-factor authentication enabled",
        description: "Your account is now more secure.",
      });
    } else {
      toast({
        title: "Two-factor authentication disabled",
        description: "Two-factor authentication has been disabled.",
      });
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Password</h3>
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          } mb-4`}
        >
          Update your password to keep your account secure
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                className={`mt-1 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300"
                }`}
                {...register("currentPassword")}
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                className={`mt-1 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300"
                }`}
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                className={`mt-1 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300"
                }`}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className={`${
                  isDirty ? "bg-black hover:bg-gray-900" : "bg-gray-500"
                } text-white`}
                disabled={!isDirty}
              >
                Update Password
              </Button>
            </div>
          </div>
        </form>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>

        <div className="flex items-center justify-between mb-4">
          <div>
            <Label className="text-sm font-medium">
              Two-Factor Authentication
            </Label>
            <p
              className={`text-xs ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Add an extra layer of security to your account
            </p>
          </div>
          <Switch
            checked={twoFactorEnabled}
            onCheckedChange={handleTwoFactorToggle}
          />
        </div>

        {twoFactorEnabled && (
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-gray-100"
            } p-4 rounded-lg`}
          >
            <p className="text-sm mb-2">
              Scan this QR code with your authenticator app:
            </p>
            <div className="bg-white p-4 inline-block rounded-md mb-4">
              <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                <span className="text-black text-xs">QR Code Placeholder</span>
              </div>
            </div>
            <p className="text-sm mb-2">Or enter this code manually:</p>
            <p
              className={`font-mono ${
                isDarkMode ? "bg-gray-700" : "bg-gray-200"
              } p-2 rounded inline-block text-sm mb-4`}
            >
              ABCD EFGH IJKL MNOP
            </p>

            <div className="mb-4">
              <Label htmlFor="verificationCode">Enter verification code</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="verificationCode"
                  className={
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }
                  placeholder="000000"
                  maxLength={6}
                />
                <Button variant="outline">Verify</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
