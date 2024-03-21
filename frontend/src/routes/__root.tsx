import { queryClient } from '@/@data/client';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/toaster';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <ReactQueryDevtools client={queryClient} />
      <TanStackRouterDevtools />
      <Toaster />
    </>
  ),
});
