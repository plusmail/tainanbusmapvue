<template>
  <section>
    <b-navbar
      fixed="top"
      type="dark"
      variant="info"
    >
      <b-navbar-brand>타이난시 버스 노선 지도</b-navbar-brand>
      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <RouteInfo
          :route-desc="currentDesc"
          :route-i-d="currentRouteID"
        />
        <b-navbar-nav class="ml-auto">
          <RouteSelect
            :datas="routeData"
            @change-route="routeChange"
          />
          <RouteDirection
            :is-one-way="oneWay"
            @change-dir="routeDirChange"
          />
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </section>
</template>

<script setup>
// ✅ defineProps 자동 인식되므로 별도 import 불필요
defineProps({
  routeData: {
    type: Array,
    default: () => []
  }
});

// ❌ defineEmits는 더 이상 import하지 않아도 됨
const emit = defineEmits(['change-route', 'change-dir']);

import { ref } from 'vue';
import RouteInfo from './sidebar/RouteInfo.vue';
import RouteSelect from './sidebar/RouteSelect.vue';
import RouteDirection from './sidebar/RouteDirection.vue';

const currentRouteID = ref(10450);
const currentDesc = ref("기차역(북)─기차역(북)");
const oneWay = ref(false);

function routeChange(value) {
  currentRouteID.value = value.routeId;
  currentDesc.value = value.routeDesc;
  oneWay.value = value.oneWay;

  emit('change-route', value);
}

function routeDirChange(value) {
  emit('change-dir', value);
}
</script>

<style scoped>
</style>
