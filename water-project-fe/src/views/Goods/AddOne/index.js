import { defineComponent, reactive, ref } from "vue";
import moment from "moment";
import locale_date from "ant-design-vue/es/date-picker/locale/zh_CN";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
import { good } from "@/service";

import { result, clone } from "@/helpers/utils";
import { message } from "ant-design-vue";
import store from "../../../store";
const defaultFormData = {
  name: "",
  price: 0,
  classify: "",
  validityDate: 0,
  discount: 0,
  stock: 0
};
export default defineComponent({
  props: {
    show: Boolean
  },
  setup(props, ctx) {
    const fileList = ref([]);
    const addForm = reactive(clone(defaultFormData));
    const disabled = ref(true);
    if (store.state.goodClassify.length) {
      addForm.classify = store.state.goodClassify[0]._id;
    }

    const submit = async () => {
      let form = clone(addForm);
      form.validityDate = new Date(addForm.validityDate).getTime();


      if(!form.name || !form.classify  || !form.price || !form.stock || !form.validityDate){
          message.error('请填写完整!')
      }else{
              const res = await good.add(form);
              await  handleUpload(res.data.data._id)         
            result(res).success( (d, { data }) => {
               
              Object.assign(addForm, defaultFormData);

              message.success(data.msg);
              close();
              ctx.emit("add");
            });
      }

    };
    const handleRemove = file => {
      const index = fileList.value.indexOf(file);
      const newFileList = fileList.value.slice();
      newFileList.splice(index, 1);
      fileList.value = newFileList;
    };

    const beforeUpload = file => {
      fileList.value = [...fileList.value, file];
      return false;
    };
    
 const handleUpload = async (id)=>{
  const formData = new FormData();

  fileList.value.forEach(file => {
 
    formData.append('file',file);
    formData.append("id",id)

  }); 


 const res =  await good.upload(formData)

 console.log(res)

  
}
    const handleChange = info => {
      let resFileList = [...info.fileList]; // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new

      resFileList = resFileList.slice(-1); // 2. read from response and show file link

      resFileList = resFileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }

        return file;
      });
      fileList.value = resFileList;
    };
    const disabledDate = current => {
      // Can not select days before today and today
      return current && current < moment().endOf("day");
    };

    const close = () => {
      ctx.emit("update:show", false);
    };
    return {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 12
      },
      locale_date,
      addForm,
      submit,
      props,
      close,
      disabledDate,
      store: store.state,
      fileList,
      beforeUpload,
      handleRemove,
      handleUpload,
      handleChange,
      disabled
      
    };
  }
});
