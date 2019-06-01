// const Cookie = process.client ? require('js-cookie') : undefined

export default function ({ store, error, redirect }) {
  // If the user is not authenticated
  if (!store.getters.getUser) {
    error({ statusCode: 403, message: '403 Forbidden' })
  }
}
