const URL_EXTREMES = '/api/extremes'

export const getExtremes = async function() {
  const { data: items } = await this.$axios({
    method: 'get',
    url: URL_EXTREMES
  })

  return items
}
