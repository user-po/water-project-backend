import { computed, defineComponent, ref, onMounted } from "vue";
import {resetPassword} from '@/service'
import { result, formatTimeStamp } from "@/helpers/utils";
import { message } from "ant-design-vue";
export default defineComponent({


      setup(){

        const list  = ref([]);
        const curPage = ref(1);
        const total = ref(0)
        const columns = [
            {
                title:'账户',
                dataIndex:'account'
            },
            {
                title:'操作',
                slots:{
                    customRender:'actions'
                }
            }
        ]
        const getList = async ()=>{
           const res =  await resetPassword.list(curPage.value,20)
            result(res)
            .success(({data:{list:l,total:t}})=>{
                list.value = l;
                total.value =t;
            })
        }
        const setPage = (page)=>{
            curPage.value = page;
            getList();
        }
        const changeStatus = async ({_id},status)=>{
            const res = await resetPassword.updateStatus(_id,status)
        
            result(res).success(({msg})=>{
                message.success(msg)

                getList()
            })
        }
        onMounted(()=>{
             getList();
        })
        return {
            total,
            list,
            columns,
            changeStatus,
            setPage,
            curPage
            
        }
      }
})