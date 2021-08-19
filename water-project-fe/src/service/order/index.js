import {
     post, get
  } from '@/helpers/request';

import axios  from 'axios';
export const add = (form)=>{
   
    return post('/order/add',form)
}
export const updateStatus = (data)=>{
   
    return post('/order/updateStatus',data)
}
export const list = (para)=>{
    
    return get('/order/list',{
      
            
            para,
          
            
        
    })

}
export const updateStatusByTime  = (startTime,endTime,type)=>{
    
    return post('/order/updateStatusByTime',{
        startTime,
        endTime,
        type
    })
}
export const exportFileByTime = (startTime,endTime,fileType)=>{
    return axios({
          url:'/order/order-get-excel',
          method:'GET',
          responseType:'blob',
          params:{
           startTime,
           endTime,
        fileType
          }
    })
   
}
