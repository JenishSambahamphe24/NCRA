import {
  createFileRoute,
  useNavigate,
  useSearch,
  redirect,
} from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IVerifyOtpForm, verifyOtpValidator } from "@/schema/auth.schema";
import { User } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuAtSign } from "react-icons/lu";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuthStore } from "@/context/auth-context";
import { toast } from "sonner";
import { useEffect } from "react";

const OTP_LENGTH = 8;

// Define the search params interface
interface VerifyOtpSearchParams {
  email?: string;
}

export const Route = createFileRoute("/verify-otp")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): VerifyOtpSearchParams => {
    return { email: search.email as string };
  },
  beforeLoad: async () => {
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
      throw redirect({ to: "/dashboard" });
    }
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/verify-otp" }) as VerifyOtpSearchParams;
  const email = search.email || "";
  const {
    verifyOTP,
    generateOTP,
    isLoading,
    error,
    isAuthenticated,
    clearError,
  } = useAuthStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }

    // Clear any previous errors when component mounts
    return () => clearError();
  }, [isAuthenticated, navigate, clearError]);

  // Redirect if no email in search params
  useEffect(() => {
    if (!email) {
      toast.error("Email is required for OTP verification");
      navigate({ to: "/register" });
    }
  }, [email, navigate]);

  const verifyOtpForm = useForm<IVerifyOtpForm>({
    defaultValues: {
      otp: "",
    },
    resolver: verifyOtpValidator,
  });

  const onSubmit: SubmitHandler<IVerifyOtpForm> = async (values) => {
    try {
      await verifyOTP({ email, otp: values.otp });
      toast.success("OTP verified successfully");
      navigate({ to: "/cooperative-form", search: { email } });
    } catch (error) {
      // Error is already handled by the store
    }
  };

  const handleResendOTP = async () => {
    try {
      await generateOTP({ email });
      toast.success("OTP resent successfully");
    } catch (error) {
      // Error is already handled by the store
    }
  };

  // Show error from auth store if present
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const pendingSubmit = isLoading || verifyOtpForm.formState.isSubmitting;
  return (
    <div className="flex-1 flex items-center gap-2 justify-center p-4">
      <Card className="w-full max-w-sm md:min-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Please enter OTP from email
          </CardTitle>
          <CardDescription>
            Enter the 8-character OTP sent to <br /> {email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...verifyOtpForm}>
            <form
              onSubmit={verifyOtpForm.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                name="otp"
                control={verifyOtpForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        disabled={pendingSubmit}
                        maxLength={OTP_LENGTH}
                        {...field}
                      >
                        <InputOTPGroup className="mx-auto">
                          {Array.from({ length: OTP_LENGTH }).map(
                            (_, index) => (
                              <InputOTPSlot
                                key={index}
                                index={index}
                                className="size-8 md:size-12 text-base text-black"
                              />
                            ),
                          )}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <Button
                  type="submit"
                  className="w-full"
                  loading={pendingSubmit}
                >
                  Verify OTP
                </Button>
                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    onClick={handleResendOTP}
                    disabled={pendingSubmit}
                  >
                    Resend OTP
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
