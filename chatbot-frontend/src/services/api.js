// Simple JSON API service

const API_BASE_URL = "http://localhost:8080/api/chat";

// Check backend health
export const checkBackendStatus = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.text();
    return data === "API is working";
  } catch (error) {
    console.error("Health check failed:", error);
    return false;
  }
};

// Send message to backend
export const sendMessage = async (message) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }), // { "message": "hello" }
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json(); // { "response": "bot reply" }
    return data.response; // Return the reply text
    
  } catch (error) {
    console.error("Send message error:", error);
    throw new Error(error.message || "Failed to connect to server");
  }
};