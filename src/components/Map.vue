<template>
<section>
    <l-map :zoom="zoom" :center="center" ref="map">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <BusRouteMaster
        v-if="hasLoaded"
        :showForward="forward"
        :busRouteMasterData="routeGraphData"
        @return-bound="setBounds"></BusRouteMaster>
    </l-map>
</section>
</template>

<script>
import L from 'leaflet'
import { LMap, LTileLayer } from 'vue2-leaflet'

import BusRouteMaster from './map/BusRouteMaster.vue'
import axios from 'axios'
import * as xmlTool from './../xmlUtilities.js'

const downloadAPIUrl = 'https://api.openstreetmap.org/api/0.6/relation/'
const queryFull = '/full'

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    BusRouteMaster
  },
  data() {
    return {
      zoom:13,
      center: L.latLng(22.9981,120.2151),
      url:'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      hasLoaded : false,
      routeGraphData:{}
    }
  },
  props:{
    forward:{
          type:Boolean,
          default: true
    },
    routeData:{
          type: Object,
          default:() => {}
    }
  },
  watch:{
    routeData : function(){
      let _this = this;
      this.hasLoaded = false;

      this.$bvModal.show("loading");

      this.handleRouteMaster(this.routeData.osmid)
      .then(function(res){
        return _this.buildData(res);
      })
      .then(function(data){
        _this.hasLoaded = true;
        _this.routeGraphData = data;

        _this.$bvModal.hide("loading");
      })
    }
  },
  methods:{
    handleRouteMaster : function(osmID){
      return new Promise((resolve , reject) => {
        let _resolve = resolve;
        axios.get(downloadAPIUrl + osmID , {responseType: 'document'})
        .then(function(response){
          _resolve(xmlTool.getSubRelation(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      });
    },
    handleSingleRoute : function(osmID){
      return new Promise((resolve , reject) => {
        let _resolve = resolve;
        let get_promises = [];
        let results = [];

        for (let i = 0; i < osmID.length; i++) {
          get_promises.push(axios.get(downloadAPIUrl + osmID[i] + queryFull , {responseType: 'document'}));
        }
        
        Promise.all(get_promises).then(function(response){
          for (let j = 0; j < response.length; j++) {
            results.push(xmlTool.getProxyData(response[j].data));
          }

          _resolve(results);
        });
      });
    },
    buildData: function(routeMaster){
      let _this = this;

      return new Promise((resolve , reject) => {
        let forward = {
        mainLine : undefined ,
        extendLine : undefined
        };
        let backward = {
        mainLine : undefined ,
        extendLine : undefined
        };
        let result = {
        forwardRoute : forward,
        backwardRoute: backward
        };

        if(routeMaster.forwardRoute.mainLine.length !== 0){
          this.handleSingleRoute(routeMaster.forwardRoute.mainLine)
          .then(function(res1){
            result.forwardRoute.mainLine = _this.constructSingleRouteData(res1 , true);
          });
        }

        if(routeMaster.forwardRoute.extendLine.length !== 0){
          this.handleSingleRoute(routeMaster.forwardRoute.extendLine)
          .then(function(res2){
            result.forwardRoute.extendLine = _this.constructSingleRouteData(res2 , false); 
          });
        }

        if(routeMaster.backwardRoute.mainLine.length !== 0){
          this.handleSingleRoute(routeMaster.backwardRoute.mainLine)
          .then(function(res3){
            result.backwardRoute.mainLine = _this.constructSingleRouteData(res3 , true);
          });
        }

        if(routeMaster.backwardRoute.extendLine.length !== 0){
          this.handleSingleRoute(routeMaster.backwardRoute.extendLine)
          .then(function(res4){
            result.backwardRoute.extendLine = _this.constructSingleRouteData(res4 , false);
          });
        }

        resolve(result);
      });
    },
    constructSingleRouteData :function(proxyDatas , isMainRoute){

      let result = {
        Stops:[],
        Roads:[],
        Color:""
      }

      if (isMainRoute === true)
        result.Color = this.routeData.mainColor;
      else
        result.Color = this.routeData.extendColor;

      for (let j = 0; j < proxyDatas.length; j++) {
        let proxyData = proxyDatas[j];
        
        for (let i = 0; i < proxyData.length; i++) {
          let feature = proxyData[i];

          if (feature.type === "node") {
            let stopData = {
              Name: this.getBusStopName(feature.tags),
              ID: this.getBusStopCode(feature.tags),
              CategoryIndex : this.routeData.categoryIndex,
              Position:feature.latLng
            }

            result.Stops.push(stopData);
          } 
          else 
          {
            let road = {
              Points : []
            }

            for (let j = 0; j < feature.nodes.length; j++) {
              road.Points.push(feature.nodes[j].latLng);
            }

            result.Roads.push(road);
          }
        }
      }

      return result;
    },
    getBusStopName: function(tags) {
        let Name = "";

        for (let key in tags) {
            if (key == "name") {
                Name = tags[key];
                break;
            }
            //console.log(key);
        }
        return Name;
    },
    getBusStopCode:function(tags){
        let Code = 0;

        for (let key in tags) {
            if (key == "ref") {
                Code = tags[key];
                break;
            }
            //console.log(key);
        }
        return Code;
    },
    setBounds(value){
      this.$refs.map.mapObject.fitBounds(value);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>