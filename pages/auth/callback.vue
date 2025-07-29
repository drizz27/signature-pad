<template>
  <div>
    <p>Redirecting you back...</p>
    <p>If you're stuck, please try logging in again.</p>
  </div>
</template>

<script>
export default {
  async created() {
    await this.$auth.handleCallback()
  }
}
</script>
