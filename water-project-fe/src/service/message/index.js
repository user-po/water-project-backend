import {
     del, post, get
   } from '@/helpers/request';

export const list  = (page=1,size=20)=>{
         return get('/message/list',{
             
                page,
                size
              
         })

}

export const add = (message,show=false)=>{
    return post('/message/add',{
         message,
         show
    })
}
export const updateStatus = (id,show)=>{
    return post('/message/update/status',{
        id,
        show
   })
}


export const remove =  (id)=>{
  return del(`/message/${id}`)
}