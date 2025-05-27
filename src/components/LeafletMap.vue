<template>
  <div class="layout">
    <!-- 분리된 사이드바 컴포넌트 -->
    <RouteSidebar :routes="routes" @select-route="selectRoute" />

    <!-- 지도 영역 -->
    <div class="map-container">
      <l-map
          ref="map"
          :zoom="zoom"
          :center="center"
          style="height: 100%; width: 100%"
      >
        <l-tile-layer :url="url" :attribution="attribution"/>
        <BusRouteMaster
            v-if="hasLoaded"
            :show-forward="forward"
            :bus-route-master-data="routeGraphData"
            @return-bound="setBounds"
        />
      </l-map>
    </div>
  </div>
</template>

<script setup>
import {ref, watch, defineProps} from 'vue';
import L from 'leaflet';
import {LMap, LTileLayer} from '@vue-leaflet/vue-leaflet';
import BusRouteMaster from './map/BusRouteMaster.vue';
import axios from 'axios';
import * as xmlTool from './../xmlUtilities.js';
import RouteSidebar from "@/components/RouteSidebar.vue";

const downloadAPIUrl = 'https://api.openstreetmap.org/api/0.6/relation/';
const queryFull = '/full';

const props = defineProps({
  forward: {
    type: Boolean,
    default: true
  },
  routeData: {
    type: Object,
    default: () => ({})
  }
});

const zoom = ref(13);
const center = ref(L.latLng(22.9981, 120.2151));
const url = ref('https://{s}.tile.osm.org/{z}/{x}/{y}.png');
const attribution = ref('&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors');
const hasLoaded = ref(false);
const routeGraphData = ref({});
const map = ref(null);

watch(() => props.routeData, async () => {
  hasLoaded.value = false;
  window?.$bvModal?.show("loading");
  const res = await handleRouteMaster(props.routeData.osmId);
  const data = await buildData(res);
  routeGraphData.value = data;
  hasLoaded.value = true;
  window?.$bvModal?.hide("loading");
});

function setBounds(value) {
  map.value?.mapObject?.fitBounds(value);
}

async function handleRouteMaster(osmID) {
  const response = await axios.get(downloadAPIUrl + osmID, {
    responseType: 'document',
    headers: {Accept: 'text/plain, */*'}
  });
  return xmlTool.getSubRelation(response.data);
}

async function handleSingleRoute(osmIDs) {
  const responses = await Promise.all(
      osmIDs.map(id =>
          axios.get(downloadAPIUrl + id + queryFull, {
            responseType: 'document',
            headers: {Accept: 'text/plain, */*'}
          })
      )
  );
  return responses.map(res => xmlTool.getProxyData(res.data));
}

async function buildData(routeMaster) {
  const forward = {mainLine: undefined, extendLine: undefined};
  const backward = {mainLine: undefined, extendLine: undefined};
  const result = {forwardRoute: forward, backwardRoute: backward};

  if (routeMaster.forwardRoute.mainLine.length)
    result.forwardRoute.mainLine = constructSingleRouteData(await handleSingleRoute(routeMaster.forwardRoute.mainLine), true);

  if (routeMaster.forwardRoute.extendLine.length)
    result.forwardRoute.extendLine = constructSingleRouteData(await handleSingleRoute(routeMaster.forwardRoute.extendLine), false);

  if (routeMaster.backwardRoute.mainLine.length)
    result.backwardRoute.mainLine = constructSingleRouteData(await handleSingleRoute(routeMaster.backwardRoute.mainLine), true);

  if (routeMaster.backwardRoute.extendLine.length)
    result.backwardRoute.extendLine = constructSingleRouteData(await handleSingleRoute(routeMaster.backwardRoute.extendLine), false);

  return result;
}

function constructSingleRouteData(proxyDatas, isMainRoute) {
  const result = {
    Stops: [],
    Roads: [],
    Color: isMainRoute ? props.routeData.mainColor : props.routeData.extendColor
  };

  for (const proxyData of proxyDatas) {
    for (const feature of proxyData) {
      if (feature.type === 'node') {
        result.Stops.push({
          Name: getBusStopName(feature.tags),
          ID: getBusStopCode(feature.tags),
          CategoryIndex: props.routeData.categoryIndex,
          Position: feature.latLng
        });
      } else {
        result.Roads.push({Points: feature.nodes.map(n => n.latLng)});
      }
    }
  }
  return result;
}

function getBusStopName(tags) {
  return tags.name || '';
}

function getBusStopCode(tags) {
  return tags.ref || 0;
}
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  width: 100%;
}

.sidebar {
  width: 300px;
  height: 100vh;
  background-color: #ffffff;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  z-index: 1000;
}

.sidebar h2 {
  margin-top: 0;
  font-size: 1.2rem;
}

.sidebar input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.route-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.route-list li {
  padding: 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.route-list li:hover {
  background-color: #f0f0f0;
}

.map-container {
  flex: 1;
  height: 100vh;
}

</style>
