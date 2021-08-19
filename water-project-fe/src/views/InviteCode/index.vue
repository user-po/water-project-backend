<template>
    <div>
        <a-card title="邀请码管理">
          <div>
                 <a-input-number 
            v-model:value="count" 
            :min="1" 
            :max="20"/>
            &nbsp;
            <a-button type="primary" @click="add">创建邀请码</a-button>
          </div>
            <a-divider></a-divider>
            <div>
                <a-table
                   bordered
                   :pagination="false"
                   :columns="columns"
                   :data-source="list"
                >
                 <template #actions="{record}">
                      <a-button class="copy" :data-clipboard-text="record.code" @click="copy" type="primary">复制</a-button>
                       &nbsp;
                    <a-button @click="remove(record)" type="danger">删除</a-button>
                   
                   
                 </template>
                 <template #status="{record}">
                    {{record.user?'已使用':'未使用'}}     
                 </template>
                </a-table>  

                <flex-end style="margin-top:24px;">
                    <a-pagination

                    v-model:current="curPage"
                    :page-size="3" 
                    :total="total"
                    @change="setPage"
                    ></a-pagination>
                </flex-end>
            </div>
        </a-card>
    </div>
</template>

<script src="./index.js">
</script>