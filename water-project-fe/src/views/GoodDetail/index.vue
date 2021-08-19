<template>
  <div>
    <a-card>
      <space-between>
        <h2>{{d.name}}</h2>
        <div v-only-admin>
          <a-button size="small" type="primary" @click="showUpdateModal=true">编辑</a-button>
          &nbsp;
          <a-button size="small" type="danger" @click="remove">删除</a-button>
        </div>
      </space-between>
      <a-divider />
      <div class="basic-info">
        <div class="items">
          <div class="item">
            <div class="title">商品名</div>
            <div class="content">{{d.name}}</div>
          </div>
          <div class="item">
            <div class="title">价格</div>
            <div class="content">{{d.price}}</div>
          </div>
          <div class="item">
            <div class="title">有效期</div>
            <div class="content">{{formatTimeStamp(d.validityDate)}}</div>
          </div>
        </div>
        <div class="items">
          <div class="item">
            <div class="title">折扣</div>
            <div class="content">{{d.discount}}</div>
          </div>
          <div class="item">
            <div class="title">库存</div>
            <div class="content">{{d.stock}}</div>
          </div>
          <div class="item">
            <div class="title">商品类型</div>
            <div class="content">{{getClassifyTitleById(d.classify)}}</div>
          </div>
        </div>
      </div>
    </a-card>

    <div class="log">
      <a-card title="出入库日志">
          <template #extra>
              <span>
            
                  <a href="javascript:;"  @click="logFilter('OUT_STOCK')">
                        <CheckOutlined v-if="curLogType=== 'OUT_STOCK'"/>
                      出库日志

                    </a>
              </span>
              <span style="margin-left:12px;">
                
                  <a href="javascript:;" @click="logFilter('IN_STOCK')">
                  <CheckOutlined v-if="curLogType=== 'IN_STOCK'"/>
                    入库日志
                    </a>
              </span>
          </template>
        <div>
            <a-table 
            :columns="columns" 
            :data-source="log" 
      
            bordered 
            :pagination="false">
             <template #createdAt="{record}">
                {{formatTimeStamp(record.meta.createTime)}}
             </template>
            </a-table>
        </div>

        <space-between style="margin-top:24px;">
            <div/>
            <a-pagination
               v-model:current="logCurPage"
              :total="logTotal" 
              :page-size="10" 
              @change="setLogPage"
            />
        </space-between>
      </a-card>
    </div>
   <update 
    v-model:show="showUpdateModal" 
    :good="d"
    @updatedGood="update"
    />
  </div>
</template>

<script src="./index.js"></script>

<style scoped lang="scss" src="./index.scss"></style>
