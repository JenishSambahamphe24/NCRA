import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IRegisterForm, registerValidator } from "@/schema/auth.schema";
import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { User } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuAtSign } from "react-icons/lu";
import { useAuthStore } from "@/context/auth-context";
import { toast } from "sonner";
import { useEffect } from "react";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
  beforeLoad: async () => {
    if (typeof window === "undefined") {
      return;
    }
    const store = useAuthStore.getState();
    if (!store.isHydrated) {
      let attempts = 0;
      while (!useAuthStore.getState().isHydrated && attempts < 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        attempts++;
      }
    }

    await useAuthStore.getState().initializeAuth();
    const { isAuthenticated, checkTokenValidity } = useAuthStore.getState();
    const isValid = isAuthenticated && checkTokenValidity();

    if (isValid) {
      throw redirect({ to: "/dashboard" });
    }
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { registerEmail, isLoading, error, isAuthenticated, clearError } =
    useAuthStore();
  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
    return () => clearError();
  }, [isAuthenticated, navigate, clearError]);

  const registerForm = useForm<IRegisterForm>({
    defaultValues: {
      email: "",
    },
    resolver: registerValidator,
  });

  const onSubmit: SubmitHandler<IRegisterForm> = async (values) => {
    try {
      await registerEmail(values);
      toast.success("Registration email sent successfully");
      navigate({ to: "/verify-otp", search: { email: values.email } });
    } catch (error) {
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const pendingSubmit = isLoading || registerForm.formState.isSubmitting;

  return (
    <div className="flex-1 flex items-center gap-2 justify-center p-4">
      <Card className="w-full max-w-sm md:min-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-full">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            Sign up with Email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...registerForm}>
            <form
              onSubmit={registerForm.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                className="w-full"
                name="email"
                control={registerForm.control}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Email</FormLabel>
                    <FormControl >
                      <Input
                        disabled={pendingSubmit}
                        placeholder="@yourname@email.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" loading={pendingSubmit}>
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
