<template>
  <div class="jw-map-wrapper">
    <div ref="container"></div>
  </div>
</template>

<script>
/**
 * @copyright MIT 
 * @author Wouter van Dam (wouter@journeyworks.nl)
 * 
 * This is a basic, generic Vue wrapper component for MapBox. 
 * This module is included in the source code of the application itself for simplicity and reliability
 */

import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import vendor from '@/vendor'

/**
 * The Mapbox instance should not be reactive
 */
let map = false;

/**
 * A Generic MapBox wrapper component
 */
export default {
  name: 'MapBox',
  props: {
    accessToken: {
      type: String,
      required: true
    },
    mapStyle: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      mapbox: null
    }
  },
  mounted() {
    this.mapbox = mapboxgl
    this.mapbox.accessToken = this.accessToken
    map = new this.mapbox.Map(
      Object.assign(this.options, {
        container: this.$refs.container,
        style: this.mapStyle
      })
    )
    map.on('load', () => {
      map.addSource('address', {
        type: 'geojson',
        data: null
      })

      map.addLayer({
        id: 'address',
        type: 'fill',
        source: 'address',
        layout: {},
        paint: {
          'fill-color': vendor.style.mapboxPrimaryColor,
          'fill-opacity': 0.8,
        },
      })

      this.$emit('load', { map })
    })
  },
  beforeDestroy() {
    this.$nextTick(() => {
      if (map) map.remove()
    })
  }
}
</script>

<style>
.jw-map-wrapper,
.mapboxgl-map {
  height: 100%;
  width: 100%;
}

.mapboxgl-control-container {
  display: none;
}
/* .jw-map-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  user-select: none;
}

.mapboxgl-map {
  width: 100% !important;
  height: 100% !important;
} */
</style>
