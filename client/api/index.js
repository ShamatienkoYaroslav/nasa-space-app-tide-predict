import * as stations from '@/api/stations.api'
import * as extremes from '@/api/extremes.api'

export const mapBindMethods = (context, methods) => {
  const obj = {}
  Object.keys(methods).forEach(key => {
    obj[key] = methods[key].bind(context)
  })
  return obj
}

export default (context) => {
  return {
    stations: mapBindMethods(context, stations),
    extremes: mapBindMethods(context, extremes),
  }
}
