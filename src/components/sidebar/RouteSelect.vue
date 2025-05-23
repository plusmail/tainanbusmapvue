<template>
  <b-nav-form>
    <b-form-select v-model="categoryselected" :options="categoryoptions" />
    <b-form-select v-model="routeselected" :options="routeoptions" @change="changeroute" />
  </b-nav-form>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineEmits, defineProps } from 'vue';

const props = defineProps({
  datas: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['change-route']);

const categoryselected = ref(1);
const routeselected = ref(10450);

const categoryoptions = computed(() => {
  return props.datas.map(element => ({
    value: element.categoryIndex,
    text: element.categoryName
  }));
});

const routeoptions = computed(() => {
  return getRouteSelectOptions(props.datas, categoryselected.value);
});

watch(categoryselected, () => {
  detectRouteChange();
});

function changeroute(value) {
  emit('change-route', getRouteSelectData(props.datas, categoryselected.value, value));
}

function detectRouteChange() {
  const firstRoute = getRouteSelectOptions(props.datas, categoryselected.value)[0]?.value;
  if (firstRoute !== undefined) {
    routeselected.value = firstRoute;
    changeroute(firstRoute);
  }
}

function getRouteSelectData(d, selC, selR) {
  const category = d.find(el => el.categoryIndex === selC);
  const route = category.routes.find(el => el.RouteCode === selR);
  return {
    categoryIndex: category.categoryIndex,
    routeid: route.RouteCode,
    osmid: route.RouteOSMRelation,
    routedesc: route.RouteDescription,
    mainColor: category.categoryLineColor,
    extendColor: category.categoryLineColor2,
    oneWay: route.OneWay
  };
}

function getRouteSelectOptions(d, sel) {
  const category = d.find(el => el.categoryIndex === sel);
  return category?.routes.map(route => ({
    value: route.RouteCode,
    text: route.RouteName
  })) || [];
}

onMounted(() => {
  detectRouteChange();
});
</script>

<style scoped>
</style>
