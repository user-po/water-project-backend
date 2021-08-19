<template>
    <div>
       <!-- orderNumber: String,
    //商品分类
    orderGoods:String,
    payMentWay:String,
    receiver:String,
    phone:String,
    address:String,
    orderStatus:Number, -->
     <a-modal 
     :visible="show" 
     title="添加用户"
     @ok="submit"
     @cancel="close"
        ok-text="确认"
      cancel-text="取消"
     >
      <a-form  :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="账号">
            <a-input  v-model:value="addForm.account"/>
          </a-form-item>
          <a-form-item label="密码" >
           <a-input  v-model:value="addForm.password"/>
          </a-form-item>
         <a-form-item label="角色" >
            <a-select  
                 placeholder="请选择用户角色"
                 v-model:value="addForm.character"
            >
              <a-select-option 
              v-for="item in characterInfo"
              :key="item._id"
              :value="item._id">
                {{item.title}}
              </a-select-option>
             
            </a-select>
          </a-form-item>
          
        
  </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"/>

