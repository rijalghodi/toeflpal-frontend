import Cookies from 'js-cookie';

type AuthCookie = {
  accessToken: string;
  refreshToken?: string;
  expires?: string | Date;
};
export function setAuthCookie({
  accessToken,
  refreshToken,
  expires,
}: AuthCookie) {
  const expiresDate = expires ? new Date(expires) : undefined;
  Cookies.set('accessToken', accessToken, {
    expires: expiresDate,
    sameSite: 'Strict',
    secure: true,
  });
  if (refreshToken)
    Cookies.set('refreshToken', refreshToken, {
      expires: expiresDate,
      sameSite: 'Strict',
      secure: true,
    });
}

export function removeAuthCookie() {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
}
