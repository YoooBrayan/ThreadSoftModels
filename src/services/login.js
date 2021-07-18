import { API } from "services/settings";
import axios from "axios";

export default async function login({ username, password }) {

console.log("User ", username, " pass ", password);

    try {
        const res = await axios.post(
            `${API}authenticate`, {
                username: username,
                password: password,
            }, {
                headers: { "Content-Type": "application/json" },
            }
        );

        console.log("res" ,res);
        return res.data.jwt;
    } catch (error) {
        throw new Error('INVALID_CREDENTIALS');
    }
}