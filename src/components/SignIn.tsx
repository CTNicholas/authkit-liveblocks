import { getAuthkitUrl } from "@/auth";

export function SignIn({ redirectUrl }: { redirectUrl?: string }) {
  return (
    <div>
      <h2>Sign-in</h2>
      <p>Sign-in to view your account details</p>
      <a href={getAuthkitUrl(redirectUrl)}>Sign-in</a>
    </div>
  );
}
