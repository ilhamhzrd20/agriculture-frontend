// const Cookie = process.client ? require('js-cookie') : undefined

export default function ({ store, error, redirect }) {
  // If the user is not authenticated
  if (!store.getters.getUser) {
    error({ statusCode: 403, message: '403 Forbidden' })
  }
  // if (store.state.user === null && store.state.user === undefined) {
  //   // eslint-disable-next-line no-console
  //   console.log(store.state.user)
  //   error({ statusCode: 403, message: '403 Forbidden' })
  // }
}
