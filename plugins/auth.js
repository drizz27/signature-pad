export default function({ $auth }) {
  $auth.onError((error, name, endpoint) => {
    console.error(`[AUTH ERROR] ${name}:`, error)
  })
}
