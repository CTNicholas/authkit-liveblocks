import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import type { User } from "@workos-inc/node";
import { WorkOS } from "@workos-inc/node";

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export function getAuthkitUrl(redirectUrl?: string) {
  return workos.userManagement.getAuthorizationUrl({
    clientId: process.env.WORKOS_CLIENT_ID || "",
    provider: "authkit",
    redirectUri: "http://localhost:3000/api/workos-auth",
    state: redirectUrl || undefined,
  });
}

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    throw new Error("JWT_SECRET_KEY is not set");
  }

  return new Uint8Array(Buffer.from(secret, "base64"));
}

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}

// Verify the JWT and return the user
export async function getUser(): Promise<{
  isAuthenticated: boolean;
  user?: User | null;
}> {
  const token = cookies().get("token")?.value;

  if (token) {
    const verifiedToken = await verifyJwtToken(token);
    if (verifiedToken) {
      return {
        isAuthenticated: true,
        user: verifiedToken.user as User | null,
      };
    }
  }

  return { isAuthenticated: false };
}

// Clear the session and redirect to the home page
export async function signOut() {
  cookies().delete("token");
  redirect("/");
}
