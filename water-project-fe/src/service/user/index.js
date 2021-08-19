import {
  post, get,del
} from '@/helpers/request';
export const list = (page=1,size=20,keywords='')=>{
   
    return get('/user/list',{
        
            page,
            size,
            keywords
        
    })
}

export const remove = (id)=>{
  return del(`/user/${id}`)
}

export const add = (account,password,character)=>{
  return post(`/user/add`,{
       account,
       password,
       character
  })
   
}

export const resetPassword = (id)=>{
  return post(`/user/reset/password`,{
      id
  })
   
}

export const editCharacter = (characterId,userId)=>{
  return post('/user/update/character',{
    character:characterId,
    userId:userId

  })
}
export const addMany = (key)=>{
  return post('/user/addMany',{
    key

  })
}
export const info = ()=>{
    return get('/user/info')
}