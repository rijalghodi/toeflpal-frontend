import { NextRequest, NextResponse } from 'next/server';

import { vanillaFetch } from './services/vanillaFetch';
import { routes } from './utils/constant/routes';

const adminPath = ['/admin', '/form'];

const userPath = ['/toefl', '/lesson', '/practice', '/dashboard'];

export async function middleware(request: NextRequest) {
  const loginPage = new URL(routes.auth.login, request.url);
  const homePage = new URL(routes.home, request.url);
  const superadminDashboard = new URL(routes.adminToeflList, request.url);
  const dashboardPage = new URL(routes.dashboard, request.url);

  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  const authPages = Object.values(routes.auth).map((v) => v.toString());

  try {
    // --- Fetch user role information ---
    const userResponse = await vanillaFetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/user/profile`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + accessToken },
      },
    );

    const roles = (await userResponse.json())?.data?.roles;

    // --- auth page permissions ---

    const isAuthPage = authPages.some((authPage) =>
      pathname.startsWith(authPage),
    );

    // ------ If user has been logged in, redirect to dashboard ----
    if (isAuthPage && roles) {
      if (roles.includes('superadmin')) {
        return NextResponse.redirect(superadminDashboard);
      }
      return NextResponse.redirect(dashboardPage);
    }

    // --- User page permissions ---

    const isUserPage = userPath.find((path) => {
      return pathname.startsWith(path);
    });

    if (isUserPage && roles?.includes('superadmin')) {
      return NextResponse.redirect(superadminDashboard);
    }

    // --- Admin page permissions ---

    const isAdminPage = adminPath.find((path) => {
      return pathname.startsWith(path);
    });

    if (isAdminPage && !roles?.includes('superadmin')) {
      return NextResponse.redirect(loginPage);
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(`${homePage}`);
  }
}

export const config = {
  matcher: [...Object.values(routes.auth), '/admin'],
};
