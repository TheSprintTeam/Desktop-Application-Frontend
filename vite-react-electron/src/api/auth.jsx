import axios from "axios";
import {base_url, resolve} from "../utils/apiUtils";

// POST Request for creating a user
export async function createUser(email, password, firstName, lastName) {
    return await resolve(axios.post(base_url+"/users/register", {
        email: email, 
        password: password, 
        first_name: firstName, 
        last_name: lastName, 
        user: "test", 
        ip: "0.0.0.0", 
        ssh_password: "test1"
    }, {
        withCredentials: true
    })
    .then(res => res.data));
}

// POST Request for logging in
export async function loginUser(email, password) {
    return await resolve(axios.post(base_url+"/users/login", {
        username: email,
        password: password
    }, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    })
    .then(res => res.data));
}

// PUT Request for verifying a user
export async function verifyUser(otp_code) {
    return await resolve(axios.put(base_url+"/users/verify", null, { 
        withCredentials: true,
        params: {
            otp_code: otp_code
    }})
    .then(res => res.data));
}

// POST Request for logging out a user
export async function logoutUser() {
    return await resolve(axios.post(base_url+"/users/logout/", null, {
        withCredentials: true
    })
    .then(res => res.data));
}

// PUT Request for changing a password
export async function changeUserPassword(oldPassword, newPassword) {
    return await resolve(axios.put(base_url+"/users/change_password", {
        old_password: oldPassword,
        new_password: newPassword
    }, {
        withCredentials: true
    })
    .then(res => res.data));
}

// DELETE Request for deleting a user's account
export async function deleteUser() {
    return await resolve(axios.delete(base_url+"/users/delete_user", {
        withCredentials: true,
    })
    .then(res => res.data));
}