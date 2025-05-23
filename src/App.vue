<template>
  <div id="app">
    <SideBar
        v-if="hasLoaded"
        id="sidebar"
        @change-route="routeChange"
        @change-dir="directionChange"
        :routedata="savedData"
    />
    <LeafletMap
        id="map"
        v-if="hasLoaded"
        :forward="showForward"
        :routeData="currentRouteData"
    />

    <b-modal
        v-model="isModalVisible"
        title="Loading..."
        :no-close-on-backdrop="true"
        :ok-only="true"
        :ok-disabled="true"
        :centered="true"
    />

  </div>
</template>
<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';

import SideBar from './components/SideBar.vue';
import LeafletMap from './components/LeafletMap.vue';
import {BModal} from "bootstrap-vue-3";

const hasLoaded = ref(false);
const savedData = ref([]);
const isModalVisible = ref(false);

const showForward = ref(true);
const currentRouteData = ref({
  categoryIndex: 1,
  routeid: 10450,
  osmid: 4016613,
  routedesc: "火車站(북)─火車站(북)",
  mainColor: "#9900CC",
  extendColor: "#D699EB"
});

const routeChange = (value) => {
  isModalVisible.value = true;
  currentRouteData.value = value;
  // 여기에 Map.vue 내 watch()가 반응함
  setTimeout(() => {
    isModalVisible.value = false;
  }, 1500); // 또는 이벤트 받아서 hide 처리 가능
};

const directionChange = (value) => {
  showForward.value = value;
};

onMounted(async () => {
  try {
    isModalVisible.value = true;
    const res = await axios.get('/AllBusRoutes.json');
    savedData.value = res.data;
    hasLoaded.value = true;
  } catch (err) {
    console.error('노선 데이터 로드 실패:', err);
  } finally {
    isModalVisible.value = false;
  }
});
</script>


<style>
html, body {
  height: 100%;
  width: 100%;
}

body {
  padding-top: 55px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  height: 100%;
  width: 100%;
}

#map {
  width: auto;
  height: 100%;
}
</style>
