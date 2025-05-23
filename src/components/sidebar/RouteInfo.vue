<template>
  <b-navbar-nav>
    <b-nav-text>{{ routeDesc }}</b-nav-text>
    <b-button size="sm" variant="dark" @click="queryBusInfo">노선 정보</b-button>
  </b-navbar-nav>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  routeDesc: {
    type: String,
    default: ''
  },
  routeID: {
    type: Number,
    default: 0
  }
});

function queryBusInfo() {
  window.open(`http://www.2384.com.tw/ebus/pathInfo.jsp?pathId=${props.routeID}`, props.routeID.toString());
}
</script>

<style scoped>
</style>
