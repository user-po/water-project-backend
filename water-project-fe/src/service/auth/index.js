import { post } from '@/helpers/request';

export const register = (account,password,inviteCode,companyName)=>{
    return post('/auth/register',{
        account,
        password,
        inviteCode,
        companyName
    })
}
export const login = (account,password)=>{
    return post('/auth/login',{
        account,
        password
    })
}

// export const test  =()=>{
//     return axios.post('http://localhost:8000/api/edu/student/new',{
//         name:"朱振强",
//         sex:1,
//         age:2,
//         Intake:"1609430400000",
//         birth:"1625414400000",
//         class_no:"1",
//         address:"山东省临沂市",
//         parent_name:"朱振强",
//         parent_phone:"17853593228",
//         class_id:1,
//         grade:"2019",
//         classLevel:"小班",
//         lng:"0",
//         lat:"0",
//         admin_code:"0"
//     })
// }