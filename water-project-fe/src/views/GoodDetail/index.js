import {defineComponent,onMounted,ref} from 'vue';
import {useRoute,useRouter} from 'vue-router'
import {good,inventoryLog} from '@/service'
import {result,formatTimeStamp} from '@/helpers/utils'
import { message } from 'ant-design-vue';
import Update from '@/views/Goods/Update/index.vue'
import {CheckOutlined} from '@ant-design/icons-vue'
import {getClassifyTitleById} from '@/helpers/goodClassify'
const columns = [
    {
        title: '数量',
        dataIndex:'num'
    },
    {
        title:'操作时间',
        slots:{
            customRender:'createdAt'
        }
    }
    // {
    //     title:'',
    //     slots:{

    //     }
    // }
]
export default defineComponent({

    components:{
        Update,
        CheckOutlined
    },
        setup(){
        
            const route = useRoute();
            const router = useRouter();
            const {id} = route.params

            const detailInfo = ref({})
            const showUpdateModal = ref(false);
            const log = ref([])
            const logTotal = ref(0)
            const logCurPage = ref(1)
            const curLogType = ref('OUT_STOCK')
            //获取商品详细信息
            const getDetail = async ()=>{
                const res = await good.detail(id)
                result(res).success(({data})=>{
                    detailInfo.value = data;
                    
                })
            }
            // 获取日志
            const getInventoryLog = async ()=>{
                
                const res= await inventoryLog.list(
                    curLogType.value,
                    logCurPage.value,
                    id,
                    10);

                result(res).success(({data:{list,total}})=>{
                   
                    log.value = list;
                    logTotal.value = total;

                })
            }
            const remove = async ()=>{
                const res = await good.delOneGood(id)

                result(res).success(({msg})=>{
                    message.success(msg)
                    // 从上一页不会进入这一页了
                    router.replace('/goods')
                    
                })
            }
            const update  = (good)=>{
               
                Object.assign(detailInfo.value,good)
            }
            // 筛选日志
            const logFilter = (type)=>{
                curLogType.value = type;

                getInventoryLog();
            }
            // 日志分页
            const setLogPage = (page)=>{
                logCurPage.value = page;
                getInventoryLog();
            }
            onMounted(()=>{
                getDetail()
                getInventoryLog();
            })
            return {
                d:detailInfo,
                formatTimeStamp,
                remove,
                showUpdateModal,
                update,
                log,
                logTotal,
                setLogPage,
                logCurPage,
                columns,
                logFilter,
                curLogType,
                getClassifyTitleById
            }
        }
})