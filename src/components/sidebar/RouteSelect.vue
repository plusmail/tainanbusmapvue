<template>
  <b-nav-form>
    <b-form-select
      v-model="categorySelected"
      :options="categoryOptions"
    />
    <b-form-select
      v-model="routeSelected"
      :options="routeOptions"
      @change="changeRoute"
    />
  </b-nav-form>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineEmits, defineProps } from 'vue';
import {BNavForm} from "bootstrap-vue-3";

const props = defineProps({
  datas: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['change-route']);

const categorySelected = ref(1);
const routeSelected = ref(10450);

const categoryOptions = computed(() => {
  return props.datas.map(element => ({
    value: element.categoryIndex,
    text: element.categoryName
  }));
});

const routeOptions = computed(() => {
  return getRouteSelectOptions(props.datas, categorySelected.value);
});

watch(categorySelected, () => {
  detectRouteChange();
});

function changeRoute(value) {
  emit('change-route', getRouteSelectData(props.datas, categorySelected.value, value));
}

function detectRouteChange() {
  const firstRoute = getRouteSelectOptions(props.datas, categorySelected.value)[0]?.value;
  if (firstRoute !== undefined) {
    routeSelected.value = firstRoute;
    changeRoute(firstRoute);
  }
}

function getRouteSelectData(d, selC, selR) {
  const category = d.find(el => el.categoryIndex === selC);
  const route = category.routes.find(el => el.RouteCode === selR);
  return {
    categoryIndex: category.categoryIndex,
    routeId: route.RouteCode,
    osmId: route.RouteOSMRelation,
    routeDesc: route.RouteDescription,
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
