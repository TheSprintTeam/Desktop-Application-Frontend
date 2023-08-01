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