import { defineComponent, ref, onMounted } from "vue";
import { InviteCode } from "@/service";
import { result } from "@/helpers/utils";
import { message } from "ant-design-vue";
import Clipboard from 'clipboard'
export default defineComponent({
  setup() {
    const columns = [
      {
        title: "邀请码",
        dataIndex: "code"
      },
      {
        title: "使用状态",
        slots:{
          customRender:'status'
        }
      },
      {
        title: "操作",
        slots: {
          customRender: "actions"
        }
      }
    ];
    const count = ref(1);
    const curPage = ref(1);
    const total = ref(0);
    const list = ref([]);
    const copyData = ref('')
    const getList = async () => {
      const res = await InviteCode.list(curPage.value, 3);

      result(res).success(({ data: { list: l, total: t } }) => {
        list.value = l;
        total.value = t;
      });
    };
    const setPage = page => {
      curPage.value = page;
      getList();
    };
    const copy = () => {
      let clipboard = new Clipboard('.copy')
      clipboard.on('success', (e) => {
          message.success('复制成功')
          // 释放内存
          clipboard.destroy()
      })
      clipboard.on('error', (e) => {
          // 不支持复制
          message.error('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
      })
  }
    const add = async () => {
      const res = await InviteCode.add(count.value);

      result(res).success(() => {
        message.success(`成功添加${count.value}条邀请码`);
        getList();
      });
    };
    const remove = async ({ _id }) => {
      const res = await InviteCode.remove(_id);
      result(res).success(({ msg }) => {
        message.success(msg);
        getList();
      });
    };
    onMounted(() => {
      getList();
    });
    return {
      count,
      list,
      total,
      columns,
      curPage,
      setPage,
      add,
      remove,
      copy
    };
  }
});
