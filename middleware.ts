import { NextResponse } from "next/server";


let locales = ['en-US', 'ja-JP']; // Define your supported locales here
 
// Get the preferred locale, similar to the above or using a library
function getLocale(request: any): string {
  // Example: check for a locale in headers or default to 'en-US'
  // You can enhance this logic as needed
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferred = locales.find(locale => acceptLanguage.includes(locale));
    if (preferred) return preferred;
  }
  return 'en-US';
}
 
export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (pathnameHasLocale) return
 
  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}