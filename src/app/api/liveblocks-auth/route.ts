import { Liveblocks } from "@liveblocks/node";
import { getUser } from "@/auth";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});

export async function POST(request: Request) {
  const { isAuthenticated, user } = await getUser();

  if (!isAuthenticated || !user) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 400,
    });
  }

  const { id, firstName, lastName, email } = user;
  const session = liveblocks.prepareSession(id, {
    userInfo: {
      firstName,
      lastName,
      email,
    },
  });

  /**
   * Implement your own security here.
   *
   * It's your responsibility to ensure that the caller of this endpoint
   * is a valid user by validating the cookies or authentication headers
   * and that it has access to the requested room.
   */
  const { room } = await request.json();
  session.allow(room, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
