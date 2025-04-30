"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSettingsStore } from "@/store/theme.store"

export default function AppearanceSettings() {
  const { toast } = useToast()
  const { appearance, updateAppearance } = useSettingsStore()
  const [localAppearance, setLocalAppearance] = useState(appearance)
  const [isDirty, setIsDirty] = useState(false)
  const isDarkMode = appearance.theme === "dark"

  // Check if form is dirty (values changed)
  useEffect(() => {
    const isChanged = JSON.stringify(localAppearance) !== JSON.stringify(appearance)
    setIsDirty(isChanged)
  }, [localAppearance, appearance])

  const handleChange = (key: string, value: any) => {
    setLocalAppearance({
      ...localAppearance,
      [key]: value,
    })
  }

  const handleSave = () => {
    updateAppearance(localAppearance)
    toast({
      title: "Appearance updated",
      description: "Your appearance settings have been saved.",
    })
    setIsDirty(false)
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Theme</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Light Mode</Label>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Use light theme</p>
            </div>
            <Switch
              checked={localAppearance.theme === "light"}
              onCheckedChange={(checked) => handleChange("theme", checked ? "light" : "dark")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Dark Mode</Label>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Use dark theme</p>
            </div>
            <Switch
              checked={localAppearance.theme === "dark"}
              onCheckedChange={(checked) => handleChange("theme", checked ? "dark" : "light")}
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Sidebar Behavior</h3>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium">Sidebar Behavior</Label>
            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Choose how the sidebar behaves
            </p>
          </div>
          <Select
            value={localAppearance.sidebarBehavior}
            onValueChange={(value) => handleChange("sidebarBehavior", value)}
          >
            <SelectTrigger
              className={`w-40 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
            >
              <SelectValue placeholder="Select behavior" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="collapsible">Collapsible</SelectItem>
              <SelectItem value="fixed">Fixed</SelectItem>
              <SelectItem value="hidden">Hidden</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Language & Region</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Language</Label>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Select your preferred language
              </p>
            </div>
            <Select value={localAppearance.language} onValueChange={(value) => handleChange("language", value)}>
              <SelectTrigger
                className={`w-40 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
              >
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Currency</Label>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Select your preferred currency
              </p>
            </div>
            <Select value={localAppearance.currency} onValueChange={(value) => handleChange("currency", value)}>
              <SelectTrigger
                className={`w-40 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
              >
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="JPY">JPY (¥)</SelectItem>
                <SelectItem value="BTC">BTC (₿)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          className={`${isDirty ? "bg-black hover:bg-gray-900" : "bg-gray-500"} text-white`}
          onClick={handleSave}
          disabled={!isDirty}
        >
          Save Preferences
        </Button>
      </div>
    </div>
  )
}
