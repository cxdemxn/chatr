import axios from "axios";
import config from "../config";

const API_URL = `http://localhost:${config.PORT}/v1/auth`;

async function testAuth() {
  try {
    console.log("➡️ Registering new user...");
    const registerRes = await axios.post(`${API_URL}/register`, {
      email: "testuser@example.com",
      username: "testuser",
      password: "password123",
    });
    console.log("✅ Register success:", registerRes.data);

    const token = registerRes.data.token;
    console.log("\nregister token:", token);

    console.log("\n➡️ Logging in with same user...");
    const loginRes = await axios.post(`${API_URL}/login`, {
      email: "testuser@example.com",
      password: "password123",
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log("✅ Login success:", loginRes.data);

    const loginToken = loginRes.data.token;
    console.log("\nlogin token:", loginToken);

    console.log("\n➡️ Calling /me with login token...");
    const meRes = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${loginToken}` },
    });
    console.log("✅ /me response:", meRes.data);
  } catch (err: any) {
    console.error("❌ Error:", err.response?.data || err.message);
  }
}

testAuth();
