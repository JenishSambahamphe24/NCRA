import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { User } from "lucide-react";
import PasswordInput from "@/components/ui/password-input";

interface CompleteRegistrationForm {
  email: string;
  name: string;
  password: string;
}

interface CompleteRegistrationSearchParams {
  email?: string;
}

export const Route = createFileRoute("/_authenticated/complete-registration")({
  component: CompleteRegistrationPage,
  validateSearch: (
    search: Record<string, unknown>,
  ): CompleteRegistrationSearchParams => {
    return { email: search.email as string };
  },
});

function CompleteRegistrationPage() {
  const navigate = useNavigate();
  const search = useSearch({
    from: "/_authenticated/complete-registration",
  }) as CompleteRegistrationSearchParams;
  const email = search.email || "";

  const form = useForm<CompleteRegistrationForm>({
    defaultValues: {
      email: email,
      name: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CompleteRegistrationForm) => {
      // Replace with actual API call
      const response = await fetch("/api/complete-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Registration failed");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Registration complete! Please login.");
      navigate({ to: "/login" });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: CompleteRegistrationForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-full">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            Complete Registration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        disabled
                        className="bg-gray-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your full name"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="Create a password"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                loading={mutation.isPending}
              >
                {mutation.isPending
                  ? "Registering..."
                  : "Complete Registration"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
