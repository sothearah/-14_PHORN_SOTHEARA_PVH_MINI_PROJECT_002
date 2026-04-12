"use server";

import { redirect } from "next/navigation";
import { loginService } from "../service/login.service";
import { cookies } from "next/headers";

export async function loginAction(data) {
  let isSuccess = false;

  try {
    console.log("Raw data received:", data);

    // Remove LoginSchema.parse — validate in the form instead
    const result = await loginService(data);
    console.log("Backend response:", result);

    if (result.success) {
      console.log("Token:", result.data?.payload?.token);
      const token = result.data.payload.token;

      const cookieStore = await cookies();
      cookieStore.set("next-auth.session-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });

      isSuccess = true;
    } else {
      console.log("Login failed:", result.message);
      return result;
    }
  } catch (error) {
    console.log("Caught error:", error);
    return {
      success: false,
      message: error?.message || "An error occurred during login",
    };
  }

  if (isSuccess) {
    redirect("/");
  }
}