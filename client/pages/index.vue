<template>
  <div>
    <Globe/>
  </div>
</template>

<script>
import Globe from '@/components/Globe/Globe'

export default {
  components: { Globe },

  fetch({ store }) {
    return store.dispatch('stations/fetchItems')
  }
}
</script>
