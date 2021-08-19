import { defineComponent, onMounted, ref } from "vue";
import { log } from "@/service";
import { result,formatTimeStamp } from "@/helpers/utils";
import { getLogInfoByPath } from "../../helpers/log";
import { message } from "ant-design-vue";
export default defineComponent({
  setup() {
    const curPage = ref(1);
    const total = ref(0);
    const list = ref([]);
    const loading = ref(false)
    const columns = [
      {
        title: "用户名",
        dataIndex: "user.account"
      },
      {
        title: "动作",
        dataIndex: "action"
      },
      {
        title: "记录时间",
       slots:{
         customRender:'createAt'
       }
      },
      {
        title: "操作",
       slots:{
         customRender:'operation'
       }
      }
    ];
    const getList = async () => {
      loading.value = true;
      const res = await log.list(curPage.value, 20);
      loading.value = false;
      result(res).success(({ data: { list: l, total: t } }) => {
       
        l.forEach(item => {
            item.action = getLogInfoByPath(item.request.url)
        });
        list.value = l;
        total.value = t;
      });
    };
    const remove = async ({_id})=>{
       const res = await log.remove(_id);
       result(res).success(({msg})=>{
        message.success(msg);
        getList();
       })
       
    }
    const setPage = (page)=>{
      curPage.value = page;
      getList();
    }
    onMounted(() => {
      getList();
    });

    return {
      curPage,
      list,
      total,
      columns,
      setPage,
      loading,
      formatTimeStamp,
      remove
    };
  }
});
