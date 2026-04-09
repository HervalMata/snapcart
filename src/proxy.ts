import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function proxy(req:NextRequest) {
    const {pathname} = req.nextUrl

    const publicRoutes = ["/login", "/register", "/api/auth", "/favicon.ico", "/_next"]

    if (publicRoutes.some((path) => pathname.startswith(path))) {
        return NextResponse.next()
    }

    const token = await getToken({req, secret: process.env.BETTER_AUTH_SECRET})

    if (!token) {
        const loginUrl = new URL("/login", req.url)
        loginUrl.searchParams.set("callbackUrl", req.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/((?|api|_next/static|]_next/image|favico.ico'
}

//export { auth as proxy } from "@/auth"