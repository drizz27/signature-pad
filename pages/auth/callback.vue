<script>
export default {
  async created() {
    console.log('Before handleCallback', this.$auth.loggedIn)

    try {
      await this.$auth.handleCallback()
      console.log('After handleCallback', this.$auth.loggedIn)

      if (this.$auth.loggedIn) {
        this.$router.push('/signature') // force redirect
      }
    } catch (error) {
      console.error('Auth callback error:', error)
    }
  }
}
</script>
