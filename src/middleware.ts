import { NextRequest, NextResponse } from 'next/server';

import { vanillaFetch } from './services/vanillaFetch';
import { routes } from './utils/constant/routes';

const adminPath = ['/admin', '/form'];

const userPath = ['/toefl', '/lesson', '/practice', '/dashboard'];

const authPath = ['/login', '/register', '/forgot-password'];

export async function middleware(request: NextRequest, response: NextResponse) {
  const loginPage = new URL(routes.auth.login, request.url);
  const homePage = new URL(routes.home, request.url);
  const superadminDashboard = new URL(routes.adminToeflList, request.url);
  const dashboardPage = new URL(routes.dashboard, request.url);

  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  const isAdminPage = adminPath.find((path) => {
    return pathname.startsWith(path);
  });

  const isAuthPage = authPath.some((path) => pathname.startsWith(path));

  const isUserPage = userPath.find((path) => {
    return pathname.startsWith(path);
  });

  if (isUserPage || (!isAuthPage && !isAdminPage)) {
    return NextResponse.next();
  }

  try {
    // --- Fetch user role information ---
    const userResponse = await vanillaFetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/user/self`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + accessToken },
      },
    );

    const roles = (await userResponse.json())?.data?.roles;

    // --- auth page permissions ---

    // ------ If user has been logged in, redirect to dashboard ----
    if (isAuthPage && roles) {
      if (roles.includes('superadmin')) {
        return NextResponse.redirect(superadminDashboard);
      }
      return NextResponse.redirect(dashboardPage);
    }

    // --- User page permissions ---

    if (isUserPage && roles?.includes('superadmin')) {
      return NextResponse.redirect(superadminDashboard);
    }

    // --- Admin page permissions ---

    if (isAdminPage && !roles?.includes('superadmin')) {
      return NextResponse.redirect(loginPage);
    }

    return NextResponse.next();
  } catch {
    // Remove a cookie
    response.cookies.delete('accessToken');
    return NextResponse.redirect(`${homePage}`);
  }
}

export const config = {
  matcher: [...authPath, ...userPath, ...adminPath],
};
