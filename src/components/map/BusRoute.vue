<template>
  <l-feature-group ref="features">
    <!-- Main Line -->
    <BusLine :busLineData="busRouteData.mainLine" />

    <!-- Extend Line -->
    <BusLine v-if="checkExtend" :busLineData="busRouteData.extendLine" />
  </l-feature-group>
</template>

<script setup>
import { ref, computed, onUpdated, defineEmits, defineProps } from 'vue';
import { LFeatureGroup } from '@vue-leaflet/vue-leaflet';
import BusLine from './BusLine.vue';

const props = defineProps({
  busRouteData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['get-bound']);
const features = ref(null);

const checkExtend = computed(() => {
  return props.busRouteData.extendLine !== undefined;
});

onUpdated(() => {
  const bounds = features.value?.mapObject?.getBounds();
  if (bounds) {
    emit('get-bound', bounds);
  }
});
</script>

<style scoped>
</style>
