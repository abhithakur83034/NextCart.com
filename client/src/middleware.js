import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();
  const isLogin = request.cookies.get("logged");

  if (!isLogin) {
    const loginRequiredPaths = [
      "/components/addproducts",
      "/components/address",
      "/components/addtocart",
      "/components/babysproduct",
      "/components/womensproduct",
      "/components/mensproduct",
      
      
    ];

    if (loginRequiredPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
      return NextResponse.rewrite(new URL("/", request.url));
    }
  } else {
    const allowedPaths = [
      "/components/login",
      "/components/register",
      "/components/admin",
    ];

    if (allowedPaths.includes(url.pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

//   if (request.nextUrl.pathname.startsWith("/components/feedback")) {
//     return NextResponse.rewrite(new URL("/components/login", request.url));
//   }
}
