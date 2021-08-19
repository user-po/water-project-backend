import { computed, defineComponent, ref, onMounted } from "vue";
import { orders } from "@/service";
import { result, formatTimeStamp } from "@/helpers/utils";
import { message,Modal,RangePicker } from "ant-design-vue";
import moment from 'moment';
import locale_date from 'ant-design-vue/es/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
export default defineComponent({
  setup() {
    const rangeDate = ref([])
    const columns = [
      {
        title: "订单号",
        dataIndex: "orderNumber"
      },
      {
        title: "下单时间",
        slots: {
          customRender: "createdAt"
        }
      },
      {
        title: "订单内容",
        dataIndex: "orderGoods"
      },
      {
        title: "支付方式",
        dataIndex: "payMentWay"
      },
      {
        title: "收货人",
        dataIndex: "receiver"
      },
      {
        title: "收货电话",
        dataIndex: "phone"
      },
      {
        title: "收货地址",
        dataIndex: "address"
      },
      {
        title: "收货人微信昵称",
        dataIndex: "wxName"
      },
      {
        title: "状态",
        dataIndex: "orderStatus",
        customRender: data => {
          switch (data.text) {
            case 1:
              return "已下单";
            case 2:
              return "已发货";
            case 3:
              return "未发货";
            case 4:
              return "已收货";
            default:
              return "状态未知";
          }
        }
      }
    ];
    let curPage = ref(1);
    const orderNumber = ref("");
    const total = ref(0);
    let list = ref([]);
    let selectedRowKeys = ref([]);
    const isSearch = ref(false);
    const loading = ref(false)
    const hasSelected = computed(() => selectedRowKeys.length > 0);
    const timeModalShow = ref(false)
    const fileModalShow = ref(false)
    const timeRanges = ref([])
    const startTime = ref('');
    const endTime = ref('')
    const dateArr = ref([])
    const type = ref('')
    const fileType = ref('')
    const fileDateArr = ref([])
    const onSelectChange = data => {
      selectedRowKeys.value = data;
      console.log(selectedRowKeys.value);
    };
    const sendGoods = async () => {
      let res;
      if(selectedRowKeys.value.length===0){
        message.error('至少选中一行')
        return;
      }
      for (let item of selectedRowKeys.value) {
         res = await orders.updateStatus({
          id: list.value[item]._id,
          type: "SEND_GOOD"
        });
       
      }
      result(res).success((data)=>{
       
         message.success(data.msg)
      })
     
      getList();
    };

    const cancelSendGoods = async ()=>{
      let res;
      if(selectedRowKeys.value.length===0){
        message.error('至少选中一行')
        return;
      }
      for (let item of selectedRowKeys.value) {
         res = await orders.updateStatus({
          id: list.value[item]._id,
          type: "CANCEL_SEND_GOOD"
        });
       
      }
      result(res).success((data)=>{
       
        message.success(data.msg)
     })
    
      getList();
    }
    const onOk = (value)=>{
          console.log(value)
    }
    const confirmReceive = async ()=>{
      let res;
      if(selectedRowKeys.value.length===0){
        message.error('至少选中一行')
        return;
      }
      for (let item of selectedRowKeys.value) {
         res = await orders.updateStatus({
          id: list.value[item]._id,
          type: "HAS_RECEIVE"
        });

      }
      result(res).success((data)=>{
       
        message.success(data.msg)
     })
      
      getList();
    }
    const onSearch = ()=>{
      getList();
      // 类型转化
      isSearch.value = Boolean(orderNumber.value);
    }
        //  回到全部列表
        const backAll = () => {
          orderNumber.value = "";
          isSearch.value = false;
          getList();
        };
    const getList = async () => {
      loading.value = true;
      const res = await orders.list({
        page: curPage.value,
        orderNumber: orderNumber.value
      });
      loading.value = false;
      result(res).success(({ data: { list: l, total: t } }) => {
        list.value = l;
        total.value = t;
      });
    };

    const timeModalCancel = ()=>{
        timeModalShow.value = false;
    }
    const fileModalCancel  = ()=>{
        fileModalShow.value = false;
    }
    const fileModalConfirm = async ()=>{
      fileModalShow.value = false;
      
       let res = await orders.exportFileByTime(new Date(fileDateArr.value[0]).getTime(),new Date(fileDateArr.value[1]).getTime(),fileType.value)
       const filename = res.headers["content-disposition"];
       console.log(res)
       let blob = new Blob([res.data],{type:'application/vnd.openxmlformats'})  
       let href = window.URL.createObjectURL(blob)
       const link = document.createElement('a')
       link.style.display = 'none'
       link.href = href
       link.download =decodeURIComponent(filename.split("filename=")[1]);
       document.body.appendChild(link)
       link.click()
       document.body.removeChild(link)
       window.URL.revokeObjectURL(link)
    }
    const timeModalConfirm = async()=>{
      timeModalShow.value = false;
      if(!type.value){
        message.error('请选择将订单变更为什么状态')
        return;
      }
      const res = await orders.updateStatusByTime(new Date(dateArr.value[0]).getTime(),new Date(dateArr.value[1]).getTime(),type.value)

      result(res)
        .success(({msg})=>{
          message.success(msg)
          getList()
        })
    
    }
  const onChange = (date,dateString)=>{
    // console.log(date,dateString)
    dateArr.value =dateString;
  }

  const onfileChange = (date,dateString)=>{
    fileDateArr.value = dateString
  }
    //设置页码
    const setPage = page => {
      curPage.value = page;
      getList();
    };
    const handleChange = (val) => {
      // console.log(`selected ${value}`);
      type.value = val;
    };
    const handlefileSelectChange = (val)=>{
      fileType.value =val;
    }
  
    onMounted(async () => {
      getList();
    });
    return {
      columns,
      setPage,
      orderNumber,
      total,
      list,
      formatTimeStamp,
      curPage,
      onSelectChange,
      hasSelected,
      selectedRowKeys,
      sendGoods,
      cancelSendGoods,
      confirmReceive,
      onSearch,
      backAll,
      isSearch,
      loading,
      rangeDate,
      timeModalShow,
      timeModalCancel,
      timeModalConfirm,
      timeRanges,
      onOk,
      locale_date,
      startTime,
      endTime,
      moment,
      onChange,
      handleChange,
      fileModalShow,
      onfileChange,
      fileModalCancel,
      fileModalConfirm,
      handlefileSelectChange
    };
  }
});
