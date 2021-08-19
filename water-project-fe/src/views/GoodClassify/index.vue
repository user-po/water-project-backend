<template>
    <div>
        <a-card title="商品分类管理">
            <div>
                <a-input 
                v-model:value="title"
                 placeholder="输入商品分类"
                 style="width:200px;"

                 ></a-input>
                &nbsp;
                <a-button @click="add" type="primary">添加</a-button>
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
                    @click="updateTitle(record)" 
                    type="primary">修改</a-button>
               </template>
          
                </a-table>
            </div>
        </a-card>
    </div>
</template>

<script src="./index.jsx">
</script>