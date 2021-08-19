import {
    del, post, get
  } from '@/helpers/request';
export const add = (form)=>{
   
    return post('/goods/add',form)
}

export const list = (para)=>{
    
    return get('/goods/list',{
     
            
            para
            
        
    })

}
export const delOneGood = (id)=>{
     
    return del(`/goods/${id}`)

}

export const updateStock = (data = {})=>{
    return post(`/goods/update/stock`,data)
}
export const update = (data = {})=>{
    return post(`/goods/update`,data)
}

export const detail = (id)=>{
    return get(`/goods/detail/${id}`)
}

export const upload = (formData)=>{

return post('/goods/upload',formData)
}
// export const login = (account,password)=>{
//     return axios.post('http://localhost:3000/auth/login',{
//         account,
//         password
//     })
// }