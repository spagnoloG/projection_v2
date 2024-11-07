import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const PesmiPage = lazy(() => import('src/pages/pesmi'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const NovaPesemPage = lazy(() => import('src/pages/nova-pesem'));
export const UrediPesemPage = lazy(() => import('src/pages/uredi-pesem'));
export const Kategorije = lazy(() => import('src/pages/kategorije'));
const NovaKategorijaPage = lazy(() => import('src/pages/nova-kategorija'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'pesmi', element: <PesmiPage /> },
        { path: 'nova-pesem', element: <NovaPesemPage /> },
        { path: 'uredi-pesem/:id', element: <UrediPesemPage /> },
        { path: 'kategorije', element: <Kategorije /> },
        { path: 'nova-kategorija', element: <NovaKategorijaPage /> },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
