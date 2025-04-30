"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSettingsStore } from "@/store/theme.store";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileSettings() {
  const { toast } = useToast();
  const { profile, updateProfile, appearance } = useSettingsStore();
  const isDarkMode = appearance.theme === "dark";

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile.firstName || "John",
      lastName: profile.lastName || "Doe",
      email: profile.email || "john.doe@example.com",
      username: profile.username || "johndoe",
      bio: profile.bio || "",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    updateProfile({ ...data, bio: data.bio || "" });
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              className={`mt-1 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-300"
              }`}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              className={`mt-1 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-300"
              }`}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className={`mt-1 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            className={`mt-1 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"
            }`}
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself"
            className={`mt-1 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"
            } h-24`}
            {...register("bio")}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            className={`${
              isDirty ? "bg-black hover:bg-gray-900" : "bg-gray-500"
            } text-white`}
            disabled={!isDirty}
          >
            Save Changes
          </Button>
        </div>
      </form>

      <div className="mt-12">
        <h3 className="text-lg font-medium mb-4">Connected Accounts</h3>

        <div
          className={`flex items-center justify-between p-4 border ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          } rounded-lg mb-4`}
        >
          <div className="flex items-center">
            <div className="h-10 w-10 bg-blue-500 rounded-md flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </div>
            <div>
              <p className="font-medium">Twitter</p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Connect your Twitter account
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Connect
          </Button>
        </div>

        <div
          className={`flex items-center justify-between p-4 border ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          } rounded-lg`}
        >
          <div className="flex items-center">
            <div className="h-10 w-10 bg-orange-500 rounded-md flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
              </svg>
            </div>
            <div>
              <p className="font-medium">Reddit</p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Connect your Reddit account
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Connect
          </Button>
        </div>
      </div>
    </div>
  );
}
