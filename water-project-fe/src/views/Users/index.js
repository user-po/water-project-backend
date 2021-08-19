import { defineComponent,ref,onMounted, reactive } from "vue";
import { user } from "@/service";
import {message} from 'ant-design-vue'
import {result,formatTimeStamp } from '@/helpers/utils';
import AddOne from "./AddOne/index.vue";
import {getCharacterInfoById} from '@/helpers/character'
import {EditOutlined} from  '@ant-design/icons-vue'
import store from "../../store";
import {getHeaders} from "@/helpers/request"
export default defineComponent({
    components:{
        AddOne,
        EditOutlined
    },
  setup() {
    const list = ref([]);
    const curPage = ref(1)
    const total = ref(0)
    const showAddModel = ref(false)
    const keywords = ref('')
    const isSearch = ref(false)
    const showEditCharacterModal = ref(false)
    const editForm = reactive({
        character:'',
        current:{}
    })
    const columns = [
        {
            title: '账户',
            dataIndex:'account'
        },
        {
            title: '创建日期',
            slots:{
                customRender:'createdTime'
            }
        },
        {
            title: '角色',
            slots:{
                customRender:'character'
            }
        },
        {
            title: '所属公司',
            dataIndex:'companyName'
        },
        {
            title: '操作',
            slots:{
                customRender:'actions'
            }
        },
    ]
    const getUser = async ()=>{
        const res = await user.list(curPage.value,10,keywords.value)

        result(res)
        .success(({data:{list:l,total:t}})=>{
            list.value = l;
            total.value = t;
        })
    }

    const setPage = (page)=>{
     curPage.value = page;
     getUser()
    }
    const remove = async ({_id})=>{
        const res = await user.remove(_id)

        result(res)
             .success(({msg})=>{
                 message.success(msg)
                 getUser()
             })
    }
    const onEdit = (record)=>{
            showEditCharacterModal.value=true
            editForm.current = record;
            editForm.character = record.character
    }
    const updateCharacter = async ()=>{
          const res = await user.editCharacter(editForm.character,editForm.current._id)
          result(res)
            .success(({msg})=>{
                 message.success(msg)
                 showEditCharacterModal.value = false;
                 getUser();
            })
    }
    const resetPassword = async ({_id})=>{
        const res = await user.resetPassword(_id);

        result(res)
        .success(({msg})=>{
            console.log(msg)
            message.success(msg)
        })
    }
   onMounted(()=>{
    getUser();
   })
   const onSearch = ()=>{
        getUser()
        isSearch.value = !!keywords.value
   }

   const backAll = ()=>{
    isSearch.value = false
    keywords.value = '';
    getUser();
   }

   const onUploadChange =  ({file})=>{
        if(file.response){
            result(file.response)
                .success(async (key)=>{
                    const res = await user.addMany(key)
                    result(res).success(({msg})=>{
                        message.success(msg)
                        getUser()
                    })
                })
        }
   }
    return {
        list,
        total,
        curPage,
        columns,
        formatTimeStamp,
        remove,
        showAddModel,
        getUser,
        setPage,
        resetPassword,
        onSearch,
        backAll,
        keywords,
        isSearch,
        getCharacterInfoById,
        showEditCharacterModal,
        editForm,
        onEdit,
        characterInfo:store.state.characterInfo,
        updateCharacter,
        onUploadChange,
        headers:getHeaders()
        
    }
  }
});
