// export async function loginService(credentials) {
//   const { email, password } = credentials;
//   try {
//     const response = await fetch(`${process.env.API_BASE_URL}/auths/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const result = await response.json();

//     // Fix: Check the message or status instead of result.success
//     if (response.ok || result.message === "Login successful") {
//       return {
//         success: true,
//         message: "Login successful",
//         data: result, // This contains your token
//       };
//     }

//     return {
//       success: false,
//       message: result.message || "Login failed",
//     };
//   } catch (error) {
//     return { success: false, message: "Request failed" };
//   }
// }

export async function loginService(credentials) {
  const { email, password } = credentials;
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auths/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok || result.message === "Login successful") {
      return {
        success: true,
        message: "Login successful",
        data: result,
      };
    }

    return {
      success: false,
      message: result.message || "Login failed",
    };
  } catch (error) {
    return { success: false, message: "Request failed" };
  }
}