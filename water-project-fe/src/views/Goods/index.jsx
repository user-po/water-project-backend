import {defineComponent, ref, onMounted } from "vue";
import AddOne from "./AddOne/index.vue";
import { good,goodClassify } from "@/service";
import { result, formatTimeStamp } from "@/helpers/utils";
import { message, Modal, Input } from "ant-design-vue";
import Update from "./Update/index.vue";
import { useRouter } from "vue-router";
import {getClassifyTitleById} from '@/helpers/goodClassify'
export default defineComponent({
  components: {
    AddOne,
    Update
  },
  setup() {
    const router = useRouter();
    const columns = [
      {
        title: "商品图片",
        slots: {
          customRender: "goodImg"
        }
      },
      {
        title: "商品名",
        dataIndex: "name"
      },
      {
        title: "商品价格",
        dataIndex: "price"
      },
      {
        title: "商品有效期",
        dataIndex: "validityDate",
        customRender: val => {
          return formatTimeStamp(val.text);
        }
      },
      {
        title: "折扣",
        dataIndex: "discount"
      },
      {
        title: "商品库存",
        slots: {
          customRender: "stock"
        }
      },
      {
        title: "商品类型",
        slots:{
          customRender:'classify'
        }
      },
      {
        title: "商品销量",
        dataIndex: "saleNumber"
      },
      {
        title: "商品状态",
        dataIndex: "status",
        customRender: (data)=>{
          
          switch (data.text) {
              case 1:
                  return '正常'
              case 0:
                  return '过期'                
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
    ];
    let show = ref(false);
    const loading = ref(false);
    let list = ref([]);
    const total = ref(0);
    let curPage = ref(1);
    const keywords = ref("");
    const isSearch = ref(false);
    const showUpdateModal = ref(false);
    const curEditGood = ref({});
    const access = ref(false)
    //获取列表
    const getList = async () => {
      const res = await good.list({
        page: curPage.value,
        keywords: keywords.value,
        size:20
      });

    
      result(res).success(({ data: { list: l, total: t } }) => {
        
       
        list.value = l;
        total.value = t;
      });
    };
    //设置页码
    const setPage = page => {
      curPage.value = page;
      getList();
    };
    onMounted(async () => {
      
      getList();
    });
    //搜索
    const onSearch = () => {
      getList();
      // 类型转化
      isSearch.value = Boolean(keywords.value);
    };
    //  回到全部列表
    const backAll = () => {
      keywords.value = "";
      isSearch.value = false;
      getList();
    };
    const remove = async _id => {
      const res = await good.delOneGood(_id);

      result(res).success(({ msg }) => {
        message.success(msg);
        getList();
      });
    };
    const update = ({ record }) => {
      showUpdateModal.value = true;
      curEditGood.value = record;
    };
    const confirm = ({ record }) => {
      remove(record._id);
    };

    const cancel = e => {
      message.error("删除取消");
    };
    //编辑库存
    const editStock = (type, record) => {
      let word = "增加";
      if (type === "OUT_STOCK") {
        word = "减少";
      }
      Modal.confirm({
        title: `要${word}多少库存?`,
        okText: '确认',
                okType: 'primary',
                cancelText: '取消',
        content: (
          <div>
            <Input class="good_inputStock" />
          </div>
        ),
        onOk: async () => {
          const el = document.querySelector(".good_inputStock");
          
          const res = await good.updateStock({
            id: record._id,
            num: el.value,
            type,
            goodId:record._id
          });
          result(res).success(data => {
            message.success(data.msg);
            getList();
          });
        }
      });
    };
    //更新列表
    const updatedGoods = () => {
      getList();
    };
    const toDetail = ({ record }) => {
     
      if(record.status === 1){
        router.push(`/goods/${record._id}`);
      }else{
        message.error('商品已过期')
      }
    
    };
    return {
      columns,
      show,
      list,
      formatTimeStamp,
      loading,
      total,
      curPage,
      setPage,
      keywords,
      onSearch,
      backAll,
      isSearch,
      remove,
      confirm,
      cancel,
      editStock,
      showUpdateModal,
      update,
      curEditGood,
      updatedGoods,
      toDetail,
      access,
      getList,
      getClassifyTitleById
      
      
    };
  }
});
