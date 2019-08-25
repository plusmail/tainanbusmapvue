<template>
  <div id="app">
    <SideBar v-if="hasLoaded" id="sidebar" @change-route="routeChange" @change-dir="directionChange" :routedata="savedData"></SideBar>
    <Map id="map" v-if="hasLoaded" :forward="showForward" :routeData="currentRouteData"></Map>

    <b-modal id="loading" title="Loading...." 
    :no-close-on-backdrop="noclick"
    :ok-only="noclick"
    :ok-disabled="noclick"
    :centered="noclick">
    </b-modal>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
import Map from './components/Map.vue'
import axios from 'axios'

let routeChange = function(value){
  this.currentRouteData = value;
};

let directionChange = function(value){
  this.showForward = value;
};

export default {
  name: 'app',
  data : function(){
    return {
      noclick : true,
      hasLoaded : false,
      savedData : [],
      showForward:true,
      currentRouteData:{ categoryIndex:1 ,routeid:10450 , osmid:4016613 ,routedesc:"火車站(北)─火車站(北)" , mainColor:"#9900CC" , extendColor:"#D699EB"}
    }
  },
  components: {
    SideBar,
    Map
  },
  methods:{
    routeChange,
    directionChange
  },
  created: function(){
    let _this = this;
    axios.get('./AllBusRoutes.json')
    .then(function(response){
      _this.savedData = response.data;
      _this.hasLoaded = true;
    });
  }
}
</script>

<style>
html , body {
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
  
  height:100%;
  width: 100%;
}

#map {
  width: auto;
  height: 100%;
}
</style>
