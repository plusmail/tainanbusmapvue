<template>
  <BusRoute :busRouteData="switchLineDirection" @get-bound="rebounds" />
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';
import BusRoute from './BusRoute.vue';

const props = defineProps({
  busRouteMasterData: {
    type: Object,
    default: () => ({})
  },
  showForward: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['return-bound']);

const switchLineDirection = computed(() => {
  return props.showForward
      ? props.busRouteMasterData.forwardRoute
      : props.busRouteMasterData.backwardRoute;
});

function rebounds(value) {
  emit('return-bound', value);
}
</script>

<style scoped>
</style>
