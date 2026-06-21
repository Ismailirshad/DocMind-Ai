import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token")
    return Response.json({ message: "Logged out successfully" }, { status: 200 });
  } catch (error: any) {
    return Response.json({ message: "Failed to log out" }, { status: 500 });
  }
}
