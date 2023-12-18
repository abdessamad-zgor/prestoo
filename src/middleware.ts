import { NextRequest, NextResponse } from "next/server";
import {PRESTOO_COOKIE_TOKEN} from "$/lib/util"

export function middleware(req: NextRequest) {
  console.log(req.cookies)
  if(!req.cookies.has(PRESTOO_COOKIE_TOKEN)){
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/presentation/:path*"]
}
