<template>
  <div>
    <a-card v-only-admin>
      <h2>用户管理</h2>

      <a-divider></a-divider>
      <space-between>
        <div class="search">
          <a-input-search
            placeholder="输入用户查询"
            enter-button
            v-model:value="keywords"
            @search="onSearch"
          />
          <a href="javascript:;" @click="backAll" v-if="isSearch">查询回退</a>
        </div>
        <div>
          <a-button @click="showAddModel = true">添加用户</a-button>
          &nbsp;
          <a-upload 
          @change="onUploadChange"
          action="http://localhost:3000/upload/file"
          :headers="headers"
          name="excel"
          >
            <a-button @click="upload" type="primary">上传excel添加用户</a-button>
          </a-upload>
        </div>
      </space-between>
      <a-divider></a-divider>

      <div>
        <a-table bordered :pagination="false" :columns="columns" :data-source="list">
          <template #createdTime="{record}">
            {{ formatTimeStamp(record.meta.createTime) }}
          </template>
          <template #character="{record}">
            <a href="javascript:;" @click="onEdit(record)"><EditOutlined /></a>
            {{ getCharacterInfoById(record.character).title }}
          </template>
          <template #actions="{record}">
            <a href="javascript:;" @click="resetPassword(record)">重置密码</a>
            &nbsp;
            <a href="javascript:;" @click="remove(record)">删除</a>
          </template>
        </a-table>
      </div>

      <flex-end style="margin-top:24px;" v-if="!isSearch">
        <a-pagination v-model:current="curPage" :total="total" :page-size="10" @change="setPage" />
      </flex-end>
    </a-card>
    <add-one v-model:show="showAddModel" @add="getUser" />

    <a-modal v-model:visible="showEditCharacterModal" title="修改角色" @ok="updateCharacter">
      <a-select
        placeholder="请选择用户角色"
        v-model:value="editForm.character"
        style="width:200px;"
      >
        <a-select-option v-for="item in characterInfo" :key="item._id" :value="item._id">
          {{ item.title }}
        </a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>

<style scoped lang="scss" src="./index.scss"></style>
