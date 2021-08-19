import { defineComponent, onMounted, ref } from "vue";
import { Message } from "@/service";
import { result,formatTimeStamp } from "@/helpers/utils";
import { getLogInfoByPath } from "../../helpers/log";
import { message } from "ant-design-vue";
export default defineComponent({
  setup() {
      const messages = ref('')
      const columns = [
        {
            title: "消息",
            dataIndex: "message"
          },
          {
            title: "展示状态",
            dataIndex: "show",
            customRender: (data)=>{
              
              switch (data.text) {
                  case true:
                      return '展示'
                  case false:
                      return '不展示'                
                  default:
                      return '状态未知'
                      
              }
          }
          },
          {
            title: "操作",
            slots: {
              customRender: "actions"
            }
          }
      ]
      const curPage =ref(1);
      const list = ref([])
      const total = ref(0)
      const show = ref(false)
      const add = async ()=>{
        const res = await Message.add(messages.value)

        result(res)
              .success(({msg})=>{
                   message.success(msg)
                   getList()
              })
      }
      const getList  = async ()=>{
        const res = await Message.list(curPage.value);
       
        result(res).success(({ data: { list: l, total: t } }) => {
     
           
            list.value = l;
            total.value = t;
            console.log(l)
          });

      
      }

      onMounted(()=>{
        getList();
      })
      const remove =  async ({_id})=>{
            const res =  await Message.remove(_id)

            result(res)
                .success(({msg})=>{
                    message.success(msg)
                    getList()
                })
      }
      const updateStatus = async ({_id})=>{
            const res = await Message.updateStatus(_id,true);
       
            result(res)
                  .success(({msg})=>{
                       message.success(msg)
                       getList()
                  })
      }
    return {
        messages,
        add,
        columns,
        list,
        curPage,
        updateStatus,
        remove,
        show
    };
  }
});
