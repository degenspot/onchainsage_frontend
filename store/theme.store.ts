"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Profile {
  firstName: string
  lastName: string
  email: string
  username: string
  bio: string
}

interface ConnectedAccounts {
  twitter: boolean
  reddit: boolean
}

interface NotificationSettings {
  highConfidenceSignals: boolean
  emergingTrends: boolean
  riskySignals: boolean
  emailNotifications: boolean
  browserNotifications: boolean
  mobileNotifications: boolean
}

interface AppearanceSettings {
  theme: "light" | "dark"
  sidebarBehavior: "collapsible" | "fixed" | "hidden"
  language: string
  currency: string
}

interface SecuritySettings {
  twoFactorEnabled: boolean
  passwordLastChanged: string | null
}

interface SettingsState {
  profile: Profile
  connectedAccounts: ConnectedAccounts
  notifications: NotificationSettings
  appearance: AppearanceSettings
  security: SecuritySettings

  updateProfile: (profile: Profile) => void
  connectAccount: (platform: keyof ConnectedAccounts) => void
  disconnectAccount: (platform: keyof ConnectedAccounts) => void
  updateNotifications: (notifications: NotificationSettings) => void
  updateAppearance: (appearance: AppearanceSettings) => void
  updateSecurity: (security: SecuritySettings) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      profile: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        username: "johndoe",
        bio: "",
      },
      connectedAccounts: {
        twitter: false,
        reddit: false,
      },
      notifications: {
        highConfidenceSignals: true,
        emergingTrends: true,
        riskySignals: false,
        emailNotifications: true,
        browserNotifications: true,
        mobileNotifications: false,
      },
      appearance: {
        theme: "dark",
        sidebarBehavior: "collapsible",
        language: "en",
        currency: "USD",
      },
      security: {
        twoFactorEnabled: false,
        passwordLastChanged: null,
      },

      updateProfile: (profile) => set({ profile }),

      connectAccount: (platform) =>
        set((state) => ({
          connectedAccounts: {
            ...state.connectedAccounts,
            [platform]: true,
          },
        })),

      disconnectAccount: (platform) =>
        set((state) => ({
          connectedAccounts: {
            ...state.connectedAccounts,
            [platform]: false,
          },
        })),

      updateNotifications: (notifications) => set({ notifications }),

      updateAppearance: (appearance) => set({ appearance }),

      updateSecurity: (security) => set({ security }),
    }),
    {
      name: "settings-storage",
    },
  ),
)
