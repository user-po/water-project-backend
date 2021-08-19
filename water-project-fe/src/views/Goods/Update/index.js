import {defineComponent,reactive,watch} from 'vue'
import moment from 'moment';
import locale from 'ant-design-vue/lib/locale-provider/zh_CN';
import locale_date from 'ant-design-vue/es/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import  {good} from '@/service'
moment.locale('zh-cn');
import {result,clone,formatTimeStamp} from '@/helpers/utils'
import {message} from 'ant-design-vue'
import store from '../../../store';
export default defineComponent({
  props:{
    show:Boolean,
    good:Object
  },
      setup(props,ctx){

  
      const editForm = reactive({
        name: '',
        price:0,
        classify:'',
        validityDate:0,
        discount:0,
        status:1
      })

        const disabledDate = current => {
          // Can not select days before today and today
          return current && current < moment().endOf('day');
        };
    
        const submit = async ()=>{
             const res = await good.update({
               id:props.good._id,
               name: editForm.name,
               price:editForm.price,
               classify:editForm.classify,
               validityDate:editForm.validityDate.valueOf(),
               discount:editForm.discount,
               status:editForm.status
             })

             result(res).success(({data})=>{
               
              ctx.emit('updatedGood',data)
              message.success(res.data.msg);
             
              close()
       
             })
        }
        const close = ()=>{
          ctx.emit('update:show',false)
        }
        watch(()=>props.good,(current)=>{
          Object.assign(editForm,current)
          editForm.validityDate = moment(Number(editForm.validityDate))
        })
          return {
            labelCol: {
              span: 6,
            },
            wrapperCol: {
              span: 12,
            },
            locale_date,
            submit,
            props,
            close,
            disabledDate,
            editForm,
            store:store.state
          }
      }
      
})