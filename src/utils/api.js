import axios from "axios"
import { ElMessage } from 'element-plus'
import router from '../router'

// 响应拦截器

// success表示成功调到了后端接口，但业务逻辑出错
// error 表示没有调到后端接口
axios.interceptors.response.use(success => {
    // 业务逻辑错误
    if(success.status && success.status == 200){
        if(success.data.code == 500 || success.data.code == 401 || success.data.code == 403){
            ElMessage.error({message:success.data.message});
            return;
        }
    }
    if (success.data.message) {
        ElMessage.success({message:success.data.message});
    }
    return success.data;
}, error=>{
    // 去不了后端，没有json数据。所以通过response来获取信息
    if (error.response.code == 504 || error.response.code == 404){
        ElMessage.error({message:'服务器占不到了'});
    } else if(error.response.code == 403){
        ElMessage.error({message:'权限不足，请联系管理员'});
    } else if(error.response.code == 401) {
        ElMessage.error({message:'尚未登录，请登录'});
        router.replace('/');
    } else {
        if (error.response.data.message) {
            ElMessage.error({message:error.response.data.message});
        } else {
            ElMessage.error({message:'未知错误'});
        }
    }
    return;
});

let base = '';

export const postRequest = (url,params)=>{
    return axios({
        method:'post',
        url:'${base}${url}',
        data:params
    })
}