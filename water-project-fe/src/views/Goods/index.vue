<template>
  <div>
    <a-card>
      <h2>商品列表</h2>
      <a-divider />
      <space-between>
        <div class="search">
          <a-input-search
            placeholder="输入商品名查询"
            enter-button
            v-model:value="keywords"
            @search="onSearch"
          />
          <a href="javascript:;" @click="backAll" v-if="isSearch">查询回退</a>
        </div>

        <div class="buttons">
          <a-button 
          type="primary" 
          @click="show = true" 
           v-only-admin

           >添加一条</a-button>
        </div>
      </space-between>

      <a-divider />
      <a-table :columns="columns" :data-source="list" :loading="loading" :pagination="false" bordered>
        <a slot="name" slot-scope="text">{{ text }}</a>
        <template #actions="data">
          <a-popconfirm
            title="你确定要删除这个商品吗"
            ok-text="确定"
            cancel-text="取消"
            @confirm="confirm(data)"
            @cancel="cancel"
          >
            <a href="javascript:;"  v-only-admin>删除</a>
            
          </a-popconfirm>
          &nbsp;
          <a href="javascript:;" @click="update(data)"  v-only-admin>编辑</a>
           &nbsp;
          <a href="javascript:;" @click="toDetail(data)"  v-only-admin>详情</a>
        </template>
        <template #goodImg="{record}">
            <a-image
                :width="100"
                :src="record.goodImgUrl"
              />
        </template>
        <template #stock="{record}">
          <a href="javascript:;" @click="editStock('IN_STOCK',record)">入库</a>
          {{record.stock}}
         <a href="javascript:;" @click="editStock('OUT_STOCK',record)">出库</a>
        </template>

        <template #classify="{record}">
          {{getClassifyTitleById(record.classify)}}
        </template>
      </a-table>
      <space-between style="margin-top:24px;">
        <div />
        <a-pagination 
        v-model:current="curPage"
         :total="total" 
         :page-size="20" 
         @change="setPage" />
      </space-between>
    </a-card>
    <add-one v-model:show="show" @add="getList" />
    <update 
    v-model:show="showUpdateModal" 
    :good="curEditGood"
    @updatedGood="updatedGoods"
    />
  </div>
</template>

<script src="./index.jsx"></script>

<style lang="scss" scoped src="./index.scss"></style>
