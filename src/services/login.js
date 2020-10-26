import { API } from "services/settings";
import axios from "axios";

export default async function login({ email, password }) {
  try {
    const res = await axios.post(
      `${API}authenticate`,
      {
        email: email,
        password: password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data.token;
  } catch (error) {
    throw new Error('INVALID_CREDENTIALS');
  }
}
