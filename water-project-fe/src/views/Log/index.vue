<template>
    <div>
       <a-spin :spinning="loading">
            <a-card>
            <h2>操作日志</h2>

            <a-divider/>

            <div>
                <a-table
                    bordered
                    :columns="columns"
                    :data-source="list"
                    :pagination="false"
                >
                  <template #createAt="{record}">
                     
                      {{formatTimeStamp(record.meta.createTime)}}
                  </template>
                   <template #operation="{record}">
                     
                      <a href="javascript:;" @click="remove(record)">删除</a>
                  </template>
                </a-table>

                <flex-end style="margin-top:24px;">
                    <a-pagination
                       
                      v-model:current="curPage"
                      :page-size="20"
                      :total="total"
                      @change="setPage"
                    />
                </flex-end>
            </div>
        </a-card>
       </a-spin>
    </div>
</template>


<script src="./index.js"></script>

<style lang="scss" scoped src="./index.scss"></style>


