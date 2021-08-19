import {
    get
  } from '@/helpers/request';
export const list = (type='OUT_STOCK',page=1,goodId,size=20)=>{
   
    return get('/inventory-log/list',{
        
            type,
            page,
            goodId,
            size
        
    })
}
