import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Typography } from "../ui/typography";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm mb-3">
          <Typography variant="body">
            &copy; 2025 NCRA. All rights reserved.
          </Typography>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a
              href="/privacy"
              className={cn(
                buttonVariants({ variant: "link", size: "sm" }),
                "text-gray-300",
              )}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className={cn(
                buttonVariants({ variant: "link", size: "sm" }),
                "text-gray-300",
              )}
            >
              Terms of Service
            </a>
          </div>
        </div>

        {/* Developed by section */}
        <div className="border-t border-gray-600 pt-3 text-center">
          <Typography variant="small" className="text-gray-400" asChild>
            <span>
              Developed by{" "}
              <a
                href="/about"
                className={cn(
                  buttonVariants({ variant: "link", size: "sm" }),
                  "text-white px-0",
                )}
              >
                Dibugsoft
              </a>
            </span>
          </Typography>
        </div>
      </div>
    </footer>
  );
}
