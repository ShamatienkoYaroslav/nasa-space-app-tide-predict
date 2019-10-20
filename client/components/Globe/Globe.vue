<template>
  <div>
    <canvas id="canvasOne" width="800" height="700">
      Your browser does not support HTML5 Canvas.
    </canvas>
  </div>
</template>

<script>
export default {
  name: 'globe',

  methods: {
    renderGlobe() {
      var wwd = new WorldWind.WorldWindow("canvasOne");

      wwd.addLayer(new WorldWind.BMNGOneImageLayer());
      wwd.addLayer(new WorldWind.BMNGLandsatLayer());
      wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
    }
  },

  mounted() {
    process.client && this.renderGlobe()
  }
}
</script>
