import {defineComponent,reactive} from 'vue'
import moment from 'moment';
import 'moment/locale/zh-cn';
import  {user} from '@/service'
moment.locale('zh-cn');
import {result,clone,formatTimeStamp} from '@/helpers/utils'
import {message} from 'ant-design-vue'
import store from '../../../store';
const defaultFormData = {
 account:'',
 password:'',
 character:''

}
export default defineComponent({
  props:{
    show:Boolean
  },
      setup(props,ctx){

        const {characterInfo} = store.state;
        const addForm = reactive(clone(defaultFormData))
        
        addForm.character = characterInfo[1]._id;
        const submit = async ()=>{
          
          let form = clone(addForm)
          const res = await user.add(form.account,form.password,form.character)
         
          result(res)
          .success((d,{data})=>{
              Object.assign(addForm,defaultFormData)
              message.success(data.msg)
              close();
              ctx.emit('add')
          })
        }
    
        const close = ()=>{
          ctx.emit('update:show',false)
        }
          return {
            labelCol: {
              span: 6,
            },
            wrapperCol: {
              span: 12,
            },
            addForm ,
            submit,
            props,
            close,
            characterInfo
          }
      }
      
})