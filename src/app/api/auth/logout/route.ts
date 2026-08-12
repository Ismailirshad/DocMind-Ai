import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("refreshToken");
    return Response.json(
      { message: "Logged out successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Logout failed:", error);
    return Response.json({ message: "Failed to log out" }, { status: 500 });
  }
}
