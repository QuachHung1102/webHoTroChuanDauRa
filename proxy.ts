import NextAuth from "next-auth";
import { edgeAuthConfig } from "@/lib/auth/edge-config";
import { appProxy } from "@/lib/proxy/app-proxy";

const { auth } = NextAuth(edgeAuthConfig);

export default auth(appProxy);

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};