<template>
  <div class="callback-page">
    <p>Logging you in...</p>
  </div>
</template>

<script>
export default {
  async mounted() {
    console.log('🔄 Starting auth callback process...')

    try {
      await this.$auth.handleCallback()
      console.log('✅ Callback handled, loggedIn:', this.$auth.loggedIn)

      // Redirect to home (signature.vue) after successful login
      if (this.$auth.loggedIn) {
        this.$router.replace('/signature')
      } else {
        console.warn('⚠️ Not logged in after callback, redirecting to signin')
        this.$router.replace('/auth/signin')
      }

    } catch (error) {
      console.error('❌ Auth callback error:', error)
      this.$router.replace('/auth/signin')
    }
  }
}
</script>

<style scoped>
.callback-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
