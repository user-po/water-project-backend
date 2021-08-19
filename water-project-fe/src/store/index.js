import { createStore } from 'vuex';
import {character,user,goodClassify} from '@/service'
import {result} from '@/helpers/utils'
import {getCharacterInfoById} from '@/helpers/character'
export default createStore({
  state: {
    characterInfo:[],
    userInfo:{},
    userCharacter:{},
    goodClassify:[]
  },
  // 修改state 直接设置数据
  mutations: {
    setCharacterInfo(state,characterInfo){
       state.characterInfo = characterInfo
    },
    setUserInfo(state,userInfo){
      state.userInfo = userInfo
   },
   setUserCharacter(state,userCharacter){
    state.userCharacter = userCharacter
   },
   setGoodClassify(state,goodclassify){
     state.goodClassify = goodclassify
   }
  },
  // 之前有操作就放到这里面
  actions: {
    async getGoodClassify(store){
      const res = await goodClassify.list();

      result(res).success(({data})=>{
        store.commit('setGoodClassify',data)
      })
    },
      async getCharacterInfo(store){
        const res=  await character.list();

        result(res)
        .success(({data})=>{
          
          store.commit('setCharacterInfo',data)
        })
      },
      async getUserInfo(store){
          const res  = await user.info();
     
          result(res)
          .success(({data})=>{
            store.commit('setUserInfo',data)

            store.commit('setUserCharacter',getCharacterInfoById(data.character))
          })
      }
  },
});


