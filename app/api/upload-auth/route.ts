import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;

  if (!privateKey || !publicKey) {
    return Response.json(
      { error: "Missing ImageKit credentials" },
      { status: 500 }
    );
  }

  // TODO: Verify the user is authenticated

  const { token, expire, signature } = getUploadAuthParams({
    privateKey,
    publicKey,
  });

  return Response.json({
    token,
    expire,
    signature,
    publicKey,
  });
}