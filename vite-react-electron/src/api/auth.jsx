import axios from "axios"

export async function signUp(email, password, firstName, lastName) {
    return await resolve(axios.post("http://127.0.0.1:8000/"))
}