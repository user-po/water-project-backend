import { defineComponent, onMounted, ref,onUnmounted } from "vue";
import { dashboard } from "@/service";
import { result } from "@/helpers/utils";
import * as echarts from "echarts";
import store from "../../store";
export default defineComponent({
  setup() {
    var myChart_2;
    var myChart_1;
    const loading = ref(false);
    const baseInfo = ref({});
    const company = ref('桂林后浪科技有限公司')
    const getBaseInfo = async () => {
      loading.value = true;
      const res = await dashboard.baseInfo();
      loading.value=false;
     // loading.value=false;
      result(res).success(({ data: { total } }) => {
        baseInfo.value = total;
      });
    };
    const getHourInfo = async () => {
      const res = await dashboard.hourOrderInfo();
     
      result(res).success(() => {
       
        
       
      }).finally(({ data: { hourCount } })=>{
        myChart_1.setOption({
        
          title: {
            text: "用户下单时间对比分析"
          },

          xAxis: {
            type: "category",
            name: "小时",
            data: [
              "0",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23"
            ],
            axisLabel: {
              interval: 0
            }
          },
          yAxis: {
            name: "数量",
            type: "value"
          },
          series: [
            {
              data: hourCount,
              type: "line"
            }
          ]
        });
      })
    };
    onUnmounted(()=>{
      if (myChart_2 != null && myChart_2 != "" && myChart_2 != undefined) {
				myChart_2.dispose();
			}
      if (myChart_1 != null && myChart_1 != "" && myChart_1 != undefined) {
				myChart_1.dispose();
			}
    })
    const getDayInfo = async ()=>{
        const res = await dashboard.DayOrderInfo();
        
        result(res).success(()=>{
           
            
        
        }).finally(({data:{monthCount,thritydays}})=>{
          myChart_2.setOption({
            
            title: {
              text: "30天内下单数量对比"
            },
  
            xAxis: {
              type: "category",
              name: "日期",
              data: thritydays,
             
            },
            yAxis: {
              name: "订单量",
              type: "value"
            },
            series: [
              {
                data: monthCount,
                type: "line"
              }
            ]
          });
        })
    }

    const getUserInfo = async ()=>{
          const res =  await dashboard.getuserInfo()

          result(res).success(({data:{companyName}})=>{
            if(companyName){
              company.value = companyName
            }
          })
    }
    onMounted(() => {
      
       myChart_2 = echarts.init(document.getElementById("myChart2"));
       myChart_1 = echarts.init(document.getElementById("myChart"));
      getBaseInfo();
      getHourInfo();
      getDayInfo();
      getUserInfo()
    });

    return {
      baseInfo,
      store,
      company,
      loading
    };
  }
});
