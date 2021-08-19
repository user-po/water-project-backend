import {
    get
  } from '@/helpers/request';


export const baseInfo = ()=>{
    return get('/dashboard/base-info');

}

export const hourOrderInfo = ()=>{
    return get('/dashboard/hour-order-info');
}

export const DayOrderInfo = ()=>{
    return get('/dashboard/day-order-info');
}

export const getuserInfo  =()=>{
    return get('/dashboard/user-info')
}