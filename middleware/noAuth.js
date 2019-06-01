export default function ({ store, error, redirect }) {
  // If the user is not authenticated
  if (store.getters.getUser) {
    return redirect('/')
  }
}
