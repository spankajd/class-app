
export const updateSharedList = (sharedList) => {
    return {
        type: "UPDATE_SHARED_LIST",
        payload: sharedList
    };
}  
export const updateLanguage = (lang) => {
    return {
        type: "UPDATE_LANGUAGE",
        payload: lang
    };
}  