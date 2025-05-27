<template>
  <l-marker :lat-lng="busStopData.Position">
    <l-icon
      :icon-url="iconLocation"
      :icon-size="iconSize"
    />
    <l-popup>
      <h5>{{ busStopData.Name }}</h5>
      <br>站牌代碼：<b>{{ busStopData.ID }}</b><br>
      <b-button
        size="sm"
        @click="queryRealtime"
      >
        經過路線/동적
      </b-button>
    </l-popup>
  </l-marker>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';
import { LMarker, LPopup, LIcon } from '@vue-leaflet/vue-leaflet';

const props = defineProps({
  busStopData: {
    type: Object,
    default: () => ({})
  }
});

const iconSize = ref([20, 20]);

const iconLocation = computed(() => {
  return `./Icons/busIcon${props.busStopData.CategoryIndex}.png`;
});

// function selectStop() {
//   this.$emit('select-stop', this.busStopData);
// }

function queryRealtime() {
  window.open(
      `http://www.2384.com.tw/qrcode/vstop?code=${props.busStopData.ID}`,
      props.busStopData.ID.toString()
  );
}
</script>

<style scoped>
</style>
