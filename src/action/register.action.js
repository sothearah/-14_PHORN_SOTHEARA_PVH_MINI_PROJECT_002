"use server";

import { registerService } from "../service/register.service";
import { redirect } from "next/navigation";

export async function registerAction(data) {
  try {
    const result = await registerService(data.name, data.email, data.password);
    console.log("Register response:", result);

    if (!result.success) {
      return result;
    }
  } catch (error) {
    console.log("Register error:", error);
    return {
      success: false,
      message: error?.message || "An error occurred during registration",
    };
  }

  redirect("/login");
}