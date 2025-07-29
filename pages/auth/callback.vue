<template>
  <div class="callback-page">
    <p>Logging you in...</p>
  </div>
</template>

<script>
export default {
  mounted() {
    // Wait a moment to let auth finish, then redirect
    setTimeout(() => {
      if (this.$auth.loggedIn) {
        console.log('✅ Already logged in! Redirecting to /signature...')
        this.$router.replace('/signature')
      } else {
        console.warn('⚠️ Still not logged in, going to /auth/signin...')
        this.$router.replace('/signature')
      }
    }, 1000) // Give it time to auto-login
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
