import axios from "axios";
import {base_url, resolve} from "../utils/apiUtils";

// GET Request for getting a user's account details
export async function getUser() {
    return await resolve(axios.get(base_url + "/users/me")
    .then(res => res.data));
}

// GET Request for getting all of a user's teams
export async function getUserTeams() {
    return await resolve(axios.get(base_url+"/users/me/teams")
    .then(res => res.data));
}
