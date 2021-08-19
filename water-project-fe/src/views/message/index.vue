<template>
    <div>
        <a-card title="消息管理">
            <div>
               <a-textarea
      v-model:value="messages"
      placeholder="输入要新建的消息"
      style="width:200px"
      :auto-size="{ minRows: 2, maxRows: 5 }"
    />
                &nbsp;
                <a-button @click="add" type="primary" size="large">添加</a-button>
            </div>
            <a-divider/>
            <div>
                <a-table
                    bordered
                    :pagination="false"
                    :data-source="list"
                    :columns="columns"
                >
               <template #actions="{record}">
                    <a-button 
                    @click="remove(record)" 
                    type="danger">删除</a-button>
                    &nbsp;
                    <a-button 
                    @click="updateStatus(record)" 
                    type="primary">{{record.show===false?'展示':'不展示'}}</a-button>
               </template>
          
                </a-table>
            </div>
        </a-card>
    </div>
</template>

<script src="./index.js">
</script>
<style scoped lang="scss" src="./index.scss">
 
</style>