import { Outlet, createFileRoute } from '@tanstack/react-router';
import { requireAuth } from '@/lib/auth-loader';

export const Route = createFileRoute('/_auth')({
  component: Outlet,
  loader: requireAuth,
});
