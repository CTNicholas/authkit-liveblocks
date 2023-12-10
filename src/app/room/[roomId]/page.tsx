import Room from "@/app/room/[roomId]/Room";
import { CollaborativeApp } from "@/components/CollaborativeApp";
import { getUser } from "@/auth";
import { SignIn } from "@/components/SignIn";

export default async function Page({ params }: { params: { roomId: string } }) {
  const { isAuthenticated } = await getUser();

  if (!isAuthenticated) {
    return <SignIn redirectUrl={`/room/${params.roomId}`} />;
  }

  return (
    <Room>
      <CollaborativeApp />
    </Room>
  );
}
