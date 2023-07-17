import axios from "axios";
import {base_url, resolve} from "../utils/apiUtils";

// POST Request for creating a user
export async function signUp(email, password, firstName, lastName) {
    return await resolve(axios.post({base_url}+"users/register", {email, password, firstName, lastName}).then(res => res.data));
}

// POST Request for logging in
export async function login(email, password) {
    return await resolve(axios.post({base_url}+"users/login", {email, password}).then(res => res.data));
}

// PUT Request for verifying a user
export async function verifyUser(otp_code) {
    return await resolve(axios.put({base_url}+"users/verify", {otp_code}).then(res => res.data));
}

// POST Request for logging out a user
export async function logoutUser() {
    return await resolve(axios.post({base_url}+"users/logout").then(res => res.data));
}

// PUT Request for changing a password
export async function changePassword() {
    return await resolve(axios.put({base_url}+"users/change_password").then(res => res.data));
}

// DELETE Request for deleting a user's account
export async function deleteUser() {
    return await resolve(axios.delete({base_url}+"users/delete_user").then(res => res.data));
}