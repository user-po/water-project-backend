const TOKEN_STORAGE_KEY = '_tt'
export const getToken = ()=>{
   
    return localStorage.getItem(TOKEN_STORAGE_KEY) || ''
}

export const setToken = async (token)=>{
        return new Promise((resolve,reject)=>{
            localStorage.setItem(TOKEN_STORAGE_KEY,token);
            resolve(token)
        })

        //return token;
}