/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";

import appCss from "@/styles/app.css?url";
import { seo } from "@/utils/seo.util";
import { DefaultCatchBoundary } from "@/components/core/default-catch-boundary";
import { NotFound } from "@/components/core/not-found";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TailwindIndicator } from "@/components/helper/tailwind-indicator";
import queryClient from "@/lib/query.lib";
import { useAuthStore } from "@/context/auth-context";
import { useEffect } from "react";
import { ClientOnly } from "@/components/core/client-only";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "NCRA",
        description: "NCRA portal",
      }),
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  shellComponent: RootComponent,
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
});

function AuthInitializer() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    console.log("🚀 App starting - initializing auth...");
    initializeAuth();
  }, [initializeAuth]);

  return null;
}

function RootComponent() {
  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <ClientOnly>
          <AuthInitializer />
        </ClientOnly>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main
            className="flex flex-col h-full min-h-[calc(100vh-var(--header-height))]"
            suppressHydrationWarning
          >
            <Outlet />
          </main>
          <Footer />
        </div>
        <Toaster position="top-center" />
        <TailwindIndicator />
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      </QueryClientProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
