import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { User, Lock } from "lucide-react";

interface SettingsForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const form = useForm<SettingsForm>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SettingsForm) => {
    if (data.newPassword !== data.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    // Handle password update
    console.log("Password update:", data);
    toast.success("Password updated successfully!");
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="w-5 h-5" />
            <span>Change Password</span>
          </CardTitle>
          <CardDescription>Ensure your account is secure</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="currentPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter current password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="newPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter new password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-md text-white"
                >
                  Update Password
                </button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
