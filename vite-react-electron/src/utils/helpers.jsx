import { getUserFromId } from "../api/user";

export function isEmpty(str) {
    return (!str || str.length === 0);
}

export function isEmptyObjectField(obj) {
    for (const key in obj) {
        if (obj[key] === "" || obj[key] === null || obj[key] == [] || obj[key] === undefined) {
            return true;
        }
    }
    return false;
};

export function getBackgroundColor(value, status) {
    if (value === 100) {
        return "green";
    } else if (value < 100 && status === "Pending") {
        return "var(--light-purple)";
    } else if (status === "Failed") {
        return "red";
    }
}

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const roles = [
    /*{
        id: "649e1e1445463b7a2cd13e0b",
        role: "Team Lead",
        permissions: "all",
    },*/
    {
        id: "649e1e3e45463b7a2cd13e0c",
        role: "Member",
        permissions: "Limited",
    },
    {
        id: "649e1e7e45463b7a2cd13e0d",
        role: "Co-Lead",
        permissions: "All",
    },
];

const rolesMapping = {
    "Member": "649e1e3e45463b7a2cd13e0c",
    "Co-Lead": "649e1e7e45463b7a2cd13e0d",
}

export const mapRoleToId = (role) => {
    return rolesMapping[role];
}

const RoleIdsMapping = {
    "649e1e3e45463b7a2cd13e0c": "Member",
    "649e1e7e45463b7a2cd13e0d": "Co-Lead",
}

export const mapRoleIdToName = (id) => {
    return RoleIdsMapping[id];
}

export const mapUserIdToObject = async (id) => {
    let response = await getUserFromId(id);
    if (response.error) {
        // console.log("error retrieving user details");
    } else {
        // console.log(response.data);
        return response;
    }
}