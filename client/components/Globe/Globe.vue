<template>
  <div class="content-center flex items-center w-full">
    <div class="mx-auto">
      <canvas id="canvas" width="800" height="700">
        Your browser does not support HTML5 Canvas.
      </canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'globe',

  props: {
    stations: Array,
    extremes: Array,
    loading: Boolean,
    future: Boolean
  },

  computed: {
    populatedStations() {
      return this.stations.map((station) => {
        const extremes = this.extremes.filter(({ lat, lng }) => lat === station.lat && lng === station.lng)

        return {
          ...station,
          extremes,
          lastExtereme: extremes.length && extremes[this.future ? extremes.length - 1 : 0] || null
        }
      })
    }
  },

  methods: {
    renderGlobe() {
      if (!this.wwd) {
        this.wwd = new WorldWind.WorldWindow("canvas")
        this.wwd.addLayer(new WorldWind.BMNGOneImageLayer())
        this.wwd.addLayer(new WorldWind.BMNGLandsatLayer())
        this.wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(this.wwd))
      }

      const tideTypes = {
        HIGH: 'High',
        LOW: 'Low'
      }

      const VOLUME_COEF = 0.2;

      if (this.polygonLayer) {
        this.wwd.removeLayer(this.polygonLayer)
        this.polygonLayer = null
      }

      this.polygonLayer = new WorldWind.RenderableLayer()
      this.wwd.addLayer(this.polygonLayer)

      this.populatedStations.forEach((station) => {
        let height = 0.0;
        const { lat, lng, lastExtereme } = station

        let color = new WorldWind.Color(169,169,169, .75)
        if (lastExtereme) {
          color = (lastExtereme.type === tideTypes.HIGH)
            ? new WorldWind.Color(50, 0, 0, .75) // red
            : new WorldWind.Color(0, 0, 50, .75) // blue
          height = Math.abs(lastExtereme.height) * 1000000.0
        }

        const polygonAttributes = new WorldWind.ShapeAttributes(null)
        polygonAttributes.interiorColor = color
        polygonAttributes.outlineColor = lastExtereme ? color : WorldWind.Color.YELLOW
        polygonAttributes.drawOutline = true
        polygonAttributes.applyLighting = true

        const boundaries = []
        boundaries.push(new WorldWind.Position(lat, lng - VOLUME_COEF, height))
        boundaries.push(new WorldWind.Position(lat + VOLUME_COEF, lng, height))
        boundaries.push(new WorldWind.Position(lat, lng + VOLUME_COEF, height))

        const polygon = new WorldWind.Polygon(boundaries, polygonAttributes)
        polygon.extrude = true

        this.polygonLayer.addRenderable(polygon)
      })
    }
  },

  watch: {
    populatedStations: {
      handler: function () {
        process.client && this.renderGlobe()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
