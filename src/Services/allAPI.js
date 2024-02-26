import { baseURL } from "./base_URL"
import { commonAPI } from "./common_API"

export const registerAPI=async(body)=>{
    return await commonAPI('POST',`${baseURL}/user/register`,body)
}

export const loginAPI=async(body)=>{
    return await commonAPI('POST',`${baseURL}/user/login`,body)
}