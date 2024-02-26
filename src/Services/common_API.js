import axios from "axios"

export const commonAPI=async(httpMethod,url,body)=>{
    const reqConfig={
        method:httpMethod,
        url:url,
        data:body,
    }
    return await axios(reqConfig).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })
}