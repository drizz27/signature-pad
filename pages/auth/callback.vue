<template>
  <div>Logging you in…</div>
</template>

<script>
export default {
  async mounted () {
    try {
      const strategy = this.$route.query.provider
      await this.$auth.loginWith(strategy)
      this.$router.replace('/signature')
    } catch (err) {
      this.$router.replace('/signature')
    }
  }
}
</script>
