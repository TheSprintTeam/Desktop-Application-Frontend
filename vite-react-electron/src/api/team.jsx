import axios from "axios";
import {base_url, resolve} from "../utils/apiUtils";

// POST Request for creating a team
export async function createTeam(teamName, description) {
    return await resolve(axios.post(base_url+"/teams/create-team", {teamName, description}).then(res => res.data));
}

// GET Request for getting a team's details
export async function getTeamDetails(team_id) {
    return await resolve(axios.get(base_url+"/teams/"+{team_id}).then(res => res.data));
}

// GET Request for getting a team's technologies
export async function getTeamTech(team_id) {
    return await resolve(axios.get(base_url+"/teams/"+{team_id}+"/technologies").then(res => res.data));
}

// GET Request for getting a team's members
export async function getTeamMembers(team_id) {
    return await resolve(axios.get(base_url+"/teams/"+{team_id}+"/members").then(res => res.data));
}

// PUT Request for inviting a user to a team
export async function inviteUserToTeam(team_id) {
    return await resolve(axios.put(base_url+"/teams/"+{team_id}+"/members").then(res => res.data));
}

// PUT Request for joining a team
export async function joinTeam(team_id, otp_code) {
    return await resolve(axios.put(base_url+"/teams/"+{team_id}+"/members", {otp_code}).then(res => res.data));
}

// GET Request for getting a team's prompt
export async function getTeamPrompt(team_id) {
    return await resolve(axios.get(base_url+"/teams/ml/"+{team_id}+"/prompt").then(res => res.data));
}

// POST Request for storing a team's prompt
export async function storeTeamPrompt(team_id, prompt) {
    return await resolve(axios.post(base_url+"/teams/ml/"+{team_id}+"/prompt", {prompt}).then(res => res.data));
}