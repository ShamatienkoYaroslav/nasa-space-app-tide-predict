const URL_STATIONS = '/api/stations'

export const getStations = async function() {
  const { data: items } = await this.$axios({
    method: 'get',
    url: URL_STATIONS
  })

  return items
}
