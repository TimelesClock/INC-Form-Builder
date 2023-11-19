export { default } from "next-auth/middleware"

export const config = { matcher: ["/edit/:path*","/form/:path*"] }