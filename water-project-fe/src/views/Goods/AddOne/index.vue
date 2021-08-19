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
      title="添加商品"
      @ok="submit"
      @cancel="close"
      ok-text="确认"
      cancel-text="取消"
      :ok-button-props="{ disabled: fileList.length === 0 }"
    >
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="商品名">
          <a-input v-model:value="addForm.name" />
        </a-form-item>

        <a-form-item label="商品分类">
          <a-select placeholder="请选择商品分类" v-model:value="addForm.classify">
            <a-select-option v-for="item in store.goodClassify" :key="item._id" :value="item._id">
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="商品价格">
          <a-input-number :min="0" :max="99999" v-model:value="addForm.price" />
        </a-form-item>

        <a-form-item label="商品过期时间">
          <a-date-picker
            show-time
            v-model:value="addForm.validityDate"
            type="date"
            :locale="locale_date"
            placeholder="选择过期时间"
            style="width: 100%"
            :disabled-date="disabledDate"
          />
        </a-form-item>
        <a-form-item label="商品折扣">
          <a-input-number :min="0" :max="99999" v-model:value="addForm.discount" />
        </a-form-item>
        <a-form-item label="商品库存">
          <a-input-number :min="0" :max="99999" v-model:value="addForm.stock" />
        </a-form-item>
        <a-form-item label="商品图片">
        <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload" :multiple="false" >
        <a-button>
          <upload-outlined></upload-outlined>
          选择上传 
        </a-button>
    </a-upload>
     <!-- <a-button
      type="primary"
      :disabled="fileList.length === 0"
      :loading="uploading"
      style="margin-top: 16px"
      @click="handleUpload"
    >
      {{ uploading ? 'Uploading' : 'Start Upload' }}
    </a-button> -->
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js" />

<style scoped lang="scss" src="./index.scss"></style>
