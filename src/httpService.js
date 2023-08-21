import axios from "axios"
const baseURL="https://cars-backend-c238.onrender.com"
function get(url,obj){
    return axios.get(baseURL+url,obj);
}
function post (url,obj){
    return axios.post(baseURL+url,obj);
}
function put (url,obj){
    return axios.put(baseURL+url,obj);
}
function deleteApi (url){
    return axios.delete(baseURL+url,{validateStatus: false});
}


export default{
    get,
    post,
    put,
    deleteApi,
};