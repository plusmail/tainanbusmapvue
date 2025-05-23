<template>
  <div v-if="checkDataIsExist">
    <!-- Line -->
    <l-polyline
        v-for="(road, index) in busLineData.Roads"
        :key="'Roads_' + index"
        :lat-lngs="road.Points"
        :color="busLineData.Color"
        :interactive="false"
    />

    <!-- Stops -->
    <BusStop
        v-for="(stop, index) in busLineData.Stops"
        :key="'Stops_' + index"
        :busStopData="stop"
    />
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { LPolyline } from '@vue-leaflet/vue-leaflet';
import BusStop from './BusStop.vue';

const props = defineProps({
  busLineData: {
    type: Object,
    default: () => ({})
  }
});

const checkDataIsExist = computed(() => {
  return props.busLineData !== undefined;
});
</script>

<style scoped>
</style>
