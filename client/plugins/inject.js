import generateApi from '@/api'

export default (context, inject) => {
  inject('api', generateApi(context))
}
