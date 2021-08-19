<template>
    <div>
        <a-card title="重置密码列表">
            <a-table
              bordered
              :pagination="false"
              :data-source="list"
              :columns="columns"
            >
             <template #actions="{record}">
                 <a-button size="small" type="primary" @click="changeStatus(record,2)">重置</a-button>
                 &nbsp;
                 <a-button size="small" type="danger" @click="changeStatus(record,3)">忽略</a-button>
             </template>
            </a-table>

            <flex-end style="margin-top:24px;">
                <a-pagination
                  v-model:current="curPage"
                  :pageSize="20"
                  :total="total"
                  @change="setPage"
                ></a-pagination>
            </flex-end>
        </a-card>
    </div>
</template>

<script src="./index.js"/>


