export const userActivityType = {
    CREATE_BBD_RECORD : "CREATE_BBD_RECORD",
    UPDATE_BBD_RECORD : "UPDATE_BBD_RECORD",
    REMOVAL_TYPE_GIVE : "REMOVAL_TYPE_GIVE",
    REMOVAL_TYPE_SALE : "REMOVAL_TYPE_SALE",
    DELETE_BBD_RECORD : "DELETE_BBD_RECORD",

    CHECK_BBD_PAST_PRODUCT_DONT_EXIST : "CHECK_BBD_PAST_PRODUCT_DONT_EXIST",
    CHECK_BBD_PAST_PRODUCT_REMOVED : "CHECK_BBD_PAST_PRODUCT_REMOVED",
    ADD_PRODUCT_BY_BBD_TRACKER : "ADD_PRODUCT_BY_BBD_TRACKER",
};

export const user = {
    getUserId : () => {
        return localStorage.getItem("userId") ? parseInt(localStorage.getItem("userId")!) : 0
    },
}

export const store = {
    getStoreId : () => {
        return localStorage.getItem("storeId") ? parseInt(localStorage.getItem("storeId")!) : 0
    },
}

export const utilFunctions = {
    convertLocalDateStringToTurkeyDateString : (localDateString : String) => 
        `${localDateString.substring(8)}-${localDateString.substring(5,7)}-${localDateString.substring(0,4)}`,
  
    
}