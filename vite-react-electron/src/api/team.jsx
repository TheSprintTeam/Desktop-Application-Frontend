import axios from "axios";
import {base_url, resolve} from "../utils/apiUtils";

// POST Request for creating a team
export async function createTeam(teamName, description, technologies) {
    return await resolve(axios.post(base_url+"/teams/create-team", {
        name: teamName, 
        description: description,
        technologies: technologies,
        invites: [],
        members: [],
    }, {
        withCredentials: true,
    })
    .then(res => res.data));
}

// GET Request for getting a team's details
export async function getTeamDetails(team_id) {
    return await resolve(axios.get(base_url+"/teams/"+team_id, {
        withCredentials: true,
    })
    .then(res => res.data));
}

// GET Request for getting a team's technologies
export async function getTeamTech(team_id) {
    return await resolve(axios.get(base_url+"/teams/"+team_id+"/technologies", {
        withCredentials: true,
    })
    .then(res => res.data));
}

// GET Request for getting a team's members
export async function getTeamMembers(team_id) {
    return await resolve(axios.get(base_url+"/teams/"+team_id+"/members", {
        withCredentials: true,
    })
    .then(res => res.data));
}

// PUT Request for inviting a user to a team
export async function inviteUserToTeam(team_id, email, role_id) {
    return await resolve(axios.put(base_url+"/teams/"+team_id+"/invite", {
        email: email,
        role_id: role_id
    }, {
        withCredentials: true,
    })
    .then(res => res.data));
}

// PUT Request for joining a team
export async function joinTeam(team_id, otp_code) {
    return await resolve(axios.put(base_url+"/teams/join", {
        otp_code: otp_code
    }, {
        withCredentials: true,
        params: {
            otp_code: otp_code
        }
    })
    .then(res => res.data));
}

// GET Request for getting a team's prompt
export async function getTeamPrompt(team_id) {
    return await resolve(axios.get(base_url+"/teams/ml/"+{team_id}+"/prompt")
    .then(res => res.data));
}

// POST Request for storing a team's prompt
export async function storeTeamPrompt(team_id, prompt) {
    return await resolve(axios.post(base_url+"/teams/ml/"+{team_id}+"/prompt", {
        prompt: prompt
    })
    .then(res => res.data));
}