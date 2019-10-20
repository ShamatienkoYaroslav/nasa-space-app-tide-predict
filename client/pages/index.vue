<template>
  <div class="flex">
    <div class="shadow w-1/4 p-4">
      <button
        class="bg-gray-800 p-2 rounded text-white w-full"
        @click="future = !future"
      >
        {{ future ? 'Past': 'Future' }}
      </button>

      <button
        class="bg-blue-500 bg-yellow-500 mt-4 p-2 rounded text-white w-full"
        @click="fetch"
      >
        {{ 'Update' }}
      </button>
    </div>

    <div
      v-show="loading"
      class="fixed h-screen w-full w-screen z-10 flex items-center justify-center"
      style="background-color: rgba(187, 187, 187, 0.75);"
    >
      <div class="bg-black font-semibold p-10 px-40 py-10 rounded text-white uppercase">Loading...</div>
    </div>

    <Globe
      :stations="stations"
      :extremes="extremes"
      :loading="loading"
      :future="future"
    />
  </div>
</template>

<script>
import Globe from '@/components/Globe/Globe'

export default {
  components: { Globe },

  data: () => ({ future: false }),

  computed: {
    stations() {
      return this.$store.state.stations.items
    },

    extremes() {
      return this.$store.state.extremes.items
    },

    loading() {
      return this.$store.state.stations.loading && this.$store.state.extremes.loading
    }
  },

  methods: {
    async fetch() {
      return await Promise.all([
        this.$store.dispatch('stations/fetchItems'),
        this.$store.dispatch('extremes/fetchItems')
      ])
    }
  },

  async fetch({ store }) {
    return await Promise.all([
      store.dispatch('stations/fetchItems'),
      store.dispatch('extremes/fetchItems')
    ])
  }
}
</script>
