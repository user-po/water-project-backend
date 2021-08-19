<template>
  <div class="container">
    <a-spin :spinning="loading">
      <a-card>
      <h1>欢迎您使用{{$$.COMPANY_NAME}}信息服务系统</h1>
      <h2>企业名称:{{company}}</h2>
      <a-divider></a-divider>
      <div class="list">
        <div class="item">
          <div class="count">共{{baseInfo.order}}条订单</div>
          <div class="title">订单</div>
        </div>
        <div class="item">
          <div class="count">共{{baseInfo.user}}个用户</div>
          <div class="title">用户</div>
        </div>
        <div class="item">
          <div class="count">共{{baseInfo.log}}条日志</div>
          <div class="title">日志</div>
        </div>
      </div>

    
    </a-card>
    <a-divider></a-divider>
    <a-card>
        <space-between>
          <div id="myChart"
     :style="{ width: '600px', height: '400px' }"></div>
     <div id="myChart2"
     :style="{ width: '600px', height: '400px' }"></div>
        </space-between>
    </a-card>
    </a-spin>
  </div>
</template>

<script src="./index.js"></script>

<style scoped lang="scss" src="./index.scss"></style>
