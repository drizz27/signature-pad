<template>
  <div>
    <p>Redirecting you back...</p>
    <p>If you're stuck, please try logging in again.</p>
  </div>
</template>

<script>
export default {
  // The auth module automatically handles the callback when this page is loaded.
  // You don't usually need extra logic here for the auth module itself.
  // You might add a loading spinner or a message.
  mounted() {
    // You can add a small delay or a check if the auth process completed
    // For example, if(!this.$auth.loggedIn) { // redirect to login or show error }
  }
}
</script>