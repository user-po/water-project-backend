import {defineComponent,ref,onMounted} from 'vue'
import {goodClassify} from '@/service'
import {result} from '@/helpers/utils'
import { message,Input,Modal } from 'ant-design-vue';
export default defineComponent({
     setup(){
         const title = ref('')
         const list = ref([])
         const columns =[
             {
                 title:'分类',
                 dataIndex:'title'
             },{
                 title:'操作',
                 slots:{
                     customRender:'actions'
                 }
             }
         ]
         const add = async ()=>{
           const res =  await goodClassify.add(title.value);
           result(res)
           .success(({msg})=>{
            message.success(msg)
            title.value = ''
            getList()
           })
         }
         const getList = async ()=>{
             const res = await goodClassify.list()
             result(res)
             .success(({data})=>{
                list.value = data;
             })
         }
         const updateTitle = async ({_id})=>{
                Modal.confirm({
                    title:'请输入新的分类名称',
                    okText: '确认',
                okType: 'primary',
                cancelText: '取消',
                    content:(
                        <div>
                            <Input class='_good_classify_new_title'/>
                        </div>
                    ),
                    onOk: async ()=>{
                        const title = document.querySelector('._good_classify_new_title').value
                        const res = await goodClassify.updateTitle(_id,title)

                        result(res)
                            .success(({msg})=>{
                                message.success(msg)
                                getList()
                            })
                    }
                })
         }
         const remove = async ({_id})=>{
             const res = await goodClassify.remove(_id)
             result(res)
             .success(({msg})=>{
                message.success(msg)
                getList();
             })

         }
         onMounted(()=>{
            getList()
         })
         return {
             add,
             list,
             title,
             columns,
             remove,
             updateTitle
         }
     }
})