import { nanoid } from "nanoid";
import { getAuthkitUrl, getUser, signOut } from "@/auth";
import { SignIn } from "@/components/SignIn";

export default async function Home() {
  const { isAuthenticated, user } = await getUser();

  if (!isAuthenticated) {
    return <SignIn />;
  }

  return (
    <main>
      <h2>Welcome back{user?.firstName && `, ${user?.firstName}`}</h2>
      <a href={"/room/" + nanoid()}>Join a random room</a>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign-out</button>
      </form>
    </main>
  );
}
