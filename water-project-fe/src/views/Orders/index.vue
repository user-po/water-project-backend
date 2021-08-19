<template>
  <a-spin :spinning="loading">
    <div>
      <a-card>
        <h2>订单列表</h2>
        <a-divider />
        <space-between>
          <div class="search">
            <a-input-search
              placeholder="输入订单号查询"
              enter-button
              v-model:value="orderNumber"
              @search="onSearch"
            />
            <a href="javascript:;" @click="backAll" v-if="isSearch">查询回退</a>
          </div>
        
          
          <div class="buttons">
              <a-button @click="timeModalShow = true" type="primary">根据时间范围操作订单</a-button>
            <a-button @click="fileModalShow = true" type="primary">批量导出订单</a-button>
            <a-button type="danger" @click="sendGoods">去发货</a-button>
            <a-button type="dashed" @click="cancelSendGoods">取消发货</a-button>
            <a-button @click="confirmReceive">确认收货</a-button>
          </div>
        </space-between>

        <a-divider />
        <a-table
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :columns="columns"
          :data-source="list"
          :pagination="false"
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
          <template #createdAt="{record}">
            {{ formatTimeStamp(record.meta.createTime) }}
          </template>
        </a-table>
        <space-between style="margin-top:24px;">
          <div />
          <a-pagination
            v-model:current="curPage"
            :total="total"
            :page-size="10"
            @change="setPage"
          />
        </space-between>
      </a-card>
      <a-modal
        :visible="timeModalShow"
        title="请选择时间范围"
        @cancel="timeModalCancel"
        @ok="timeModalConfirm"
        okText="确认"
        cancelText="取消"
      >
        <a-range-picker
          format="YYYY-MM-DD HH:mm:ss"
          :placeholder="['开始时间', '结束时间']"
          @change="onChange"
          :locale="locale_date"
          :show-time="{ format: 'HH:mm:ss' }"
        />
        <br/>
        <a-select
          v-model:value="value1"
          style="width: 350px;margin-top:10px;"
          @focus="focus"
          ref="select"
          @change="handleChange"
          placeholder="请选择订单的变更状态"
        >
          <a-select-option value="SEND_GOOD">去发货</a-select-option>
          <a-select-option value="CANCEL_SEND_GOOD">取消发货</a-select-option>
          <a-select-option value="HAS_RECEIVE">确认收货</a-select-option>
        </a-select>
      </a-modal>
      <a-modal
        :visible="fileModalShow"
        title="订单导出"
        @cancel="fileModalCancel"
        @ok="fileModalConfirm"
        okText="确认"
        cancelText="取消"
      >
        <a-range-picker
          format="YYYY-MM-DD HH:mm:ss"
          :placeholder="['开始时间', '结束时间']"
          @change="onfileChange"
          :locale="locale_date"
          :show-time="{ format: 'HH:mm:ss' }"
        />
            <a-select
          v-model:value="value1"
          style="width: 350px;margin-top:10px;"
          @focus="focus"
          ref="select"
          @change="handlefileSelectChange"
          placeholder="选择订单状态"
        >
          <a-select-option value="1">已下单</a-select-option>
          <a-select-option value="2">已发货</a-select-option>
          <a-select-option value="4">已收货</a-select-option>
        </a-select>
      </a-modal>
    </div>
  </a-spin>
</template>

<script src="./index.jsx"></script>

<style lang="scss" scoped src="./index.scss"></style>
