export default function ({ store, error, redirect }) {
  // If the user is not authenticated
  if (store.getters.getUser) {
    return redirect('/')
  }
  // if (store.getters.getUser === null && store.getters.getUser === undefined) {
  //   error({ statusCode: 403, message: '403 Forbidden' })
  // }
}
