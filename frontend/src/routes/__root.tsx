import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createRootRoute({
  component: RootComponent,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes
      staleTime: 1000 * 60 * 5,
      // Keep data in cache for 30 minutes
      gcTime: 1000 * 60 * 30,
    },
  },
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-background text-foreground">
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
              <nav className="flex gap-4 items-center">
                <Link to="/" className="[&.active]:font-bold">
                  Home
                </Link>
                <Link to="/create-store" className="[&.active]:font-bold">
                  Add Store
                </Link>
              </nav>
              <ThemeToggle />
            </div>

            <Outlet />
          </div>
        </div>
      </ThemeProvider>
      <TanStackRouterDevtools />
    </QueryClientProvider>
  );
}

export default RootComponent;
