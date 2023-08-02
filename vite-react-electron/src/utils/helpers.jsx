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