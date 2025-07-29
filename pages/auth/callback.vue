<template>
  <div class="callback-page">
    <p>Logging you in…</p>
  </div>
</template>

<script>
export default {
  async mounted () {
    console.log('🔄 callback.vue mounted, starting loginWith…')

    try {
      // Determine which provider was used
      const isGithub = this.$route.query.state?.includes('github')
      const strategy = isGithub ? 'github' : 'discord'

      // Exchange code for token + fetch user
      await this.$auth.loginWith(strategy)
      console.log('✅ loginWith succeeded:', this.$auth.loggedIn, this.$auth.user)

      // Redirect upon success
      this.$router.replace('/signature')
    } catch (err) {
      console.error('❌ loginWith error:', err)
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
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
