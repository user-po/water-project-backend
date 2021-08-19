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
     title="修改商品"
     @ok="submit"
     @cancel="close"
        ok-text="确认"
      cancel-text="取消"
     >
      <a-form  :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="商品名">
            <a-input  v-model:value="editForm.name"/>
          </a-form-item>
              <a-form-item label="商品分类">
            <a-select  
                 placeholder="请选择商品分类"
                 v-model:value="editForm.classify"
            >
              <a-select-option 
               v-for="item in store.goodClassify"
               :key="item._id"
               :value="item._id"
              >
                {{item.title}}
                </a-select-option>
            
            </a-select>
          </a-form-item>
          <a-form-item label="商品价格" >
           <a-input-number  :min="0" :max="99999" v-model:value="editForm.price" />
          </a-form-item>
        
          <a-form-item label="商品过期时间">
            <a-date-picker
              show-time
              v-model:value="editForm.validityDate"
              type="date"
              :locale="locale_date"
              placeholder="选择过期时间"
              style="width: 100%"
              :disabled-date="disabledDate"
              
            />
          </a-form-item>
          <a-form-item label="商品折扣">
            <a-input-number  :min="0" :max="99999"  v-model:value="editForm.discount" />
          </a-form-item>
            <a-form-item label="商品状态">
            <a-select  
                 placeholder="请选择商品状态"
                 v-model:value="editForm.status"
            >
              <a-select-option value="1">正常</a-select-option>
              <a-select-option value="0">过期</a-select-option>
            </a-select>
          </a-form-item>
        
  </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"/>

