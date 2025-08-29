import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
  redirect,
} from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ILoginForm, loginValidator } from "@/schema/auth.schema";
import { useAuthStore } from "@/context/auth-context";

import { LuAtSign, LuLock } from "react-icons/lu";
import PasswordInput from "@/components/ui/password-input";
import { User } from "lucide-react";
import { useEffect } from "react";
import { LOGO_URL } from "@/constants/default";

type LoginSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/login")({
  component: LoginPage,
  validateSearch: (search: Record<string, unknown>): LoginSearch => {
    return {
      redirect: (search.redirect as string) || undefined,
    };
  },
  beforeLoad: async ({ search }) => {
    // Skip auth check on server side to avoid hydration issues
    if (typeof window === "undefined") {
      return;
    }

    // Wait for auth store to be ready
    const store = useAuthStore.getState();
    if (!store.isHydrated) {
      // Wait a bit for hydration
      let attempts = 0;
      while (!useAuthStore.getState().isHydrated && attempts < 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        attempts++;
      }
    }

    // Initialize auth if needed
    await useAuthStore.getState().initializeAuth();

    const { isAuthenticated, checkTokenValidity } = useAuthStore.getState();
    const isValid = isAuthenticated && checkTokenValidity();

    if (isValid) {
      const redirectTo = search.redirect || "/dashboard";
      throw redirect({ to: redirectTo as any });
    }
  },
});

function LoginPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/login" });
  const { login, isLoading, error, isAuthenticated, clearError } =
    useAuthStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = search.redirect || "/dashboard";
      navigate({ to: redirectTo as any });
    }

    // Clear any previous errors when component mounts
    return () => clearError();
  }, [isAuthenticated, navigate, clearError, search.redirect]);

  const loginForm = useForm<ILoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: loginValidator,
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (values) => {
    try {
      await login(values);
      toast.success("Login successful");
      const redirectTo = search.redirect || "/dashboard";
      navigate({ to: redirectTo as any });
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      // Error is already handled by the store
      // toast.error is not needed here as the error will be displayed in the form
    }
  };

  // Show error from auth store if present
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const pendingSubmit = isLoading || loginForm.formState.isSubmitting;

  return (
    <div className="flex-1 flex items-center gap-2 justify-center p-4">
      <div className="flex lg:grid lg:grid-cols-2 gap-2">
        <Card className="w-full hidden lg:flex max-w-md bg-primary">
          <CardHeader className="space-y-1 text-center">
            <img src={LOGO_URL} alt="Logo" className="w-24 h-24 mx-auto" />
            <CardTitle className="text-2xl font-bold text-white">
              Welcome to Our Platform
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <Typography variant="body" className="text-white">
              Are you a authorized person for a financial cooperative and wish
              to register your Financial Cooperative now? Please be sure, you
              are allowed to login into the system once your financial
              cooperative's data has been reviewed and verified from NCRA.
              Register your financial cooperative now.
            </Typography>
            <Typography variant="detail" className="text-white">
              के तपाईं वित्तीय सहकारीको लागि आधिकारिक व्यक्ति हुनुहुन्छ र अहिले
              नै आफ्नो वित्तीय सहकारी दर्ता गर्न चाहनुहुन्छ? कृपया सुनिश्चित
              गर्नुहोस् कि तपाईंको वित्तीय सहकारीको डेटा NCRA बाट समीक्षा र
              प्रमाणित भएपछि तपाईंलाई प्रणालीमा लगइन गर्न अनुमति छ। अहिले नै
              आफ्नो वित्तीय सहकारी दर्ता दर्ता गर्नको लागि यहाँ
              <Link to="/register" className="mx-2 text-red-500">
                Click
              </Link>
              गर्नुहोस् ।
            </Typography>
          </CardContent>
        </Card>
        <Card className="w-full max-w-sm md:min-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary rounded-full">
                <User className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-primary">
              Sign in to your account
            </CardTitle>
            <CardDescription>Please sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  name="email"
                  control={loginForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <LuAtSign className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          <Input
                            disabled={pendingSubmit}
                            placeholder="yourname@email.com"
                            autoComplete="email"
                            className="pl-8"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={loginForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <LuLock className="absolute z-10 left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          <PasswordInput
                            disabled={pendingSubmit}
                            placeholder="********"
                            autoComplete="password"
                            className="pl-8"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  loading={pendingSubmit}
                >
                  Sign in
                </Button>
                <div className="mt-6 text-center">
                  <Typography variant="detail" className="text-gray-600">
                    Don't have an account?
                  </Typography>
                  <Link
                    to="/register"
                    className={buttonVariants({
                      variant: "link",
                      className: "text-primary",
                    })}
                  >
                    Register your financial cooperative now
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
