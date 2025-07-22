<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-5" elevation="10" rounded="xl">
          <v-card-title class="text-h5 justify-center">
            Sign In
          </v-card-title>

          <v-card-text>
            <v-form ref="form">
              <!-- Email Field -->
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                prepend-icon="mdi-email"
                outlined
                dense
                class="mb-4"
              />

              <!-- Password Field -->
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                prepend-icon="mdi-lock"
                outlined
                dense
                class="mb-4"
              />

              <!-- Email/Password Login Button (placeholder for future use) -->
              <v-btn
                color="primary"
                block
                class="mb-4"
                @click="submitLogin"
              >
                <v-icon left>mdi-login</v-icon>
                Login
              </v-btn>

              <!-- GitHub Login Button -->
              <v-btn
                color="black"
                block
                class="mb-2"
                @click="loginWithGitHub"
              >
                <v-icon left>mdi-github</v-icon>
                Login with GitHub
              </v-btn>

              <!-- Discord Login Button -->
              <v-btn
                color="#5865F2"
                dark
                block
                @click="loginWithDiscord"
              >
                <v-icon left>mdi-discord</v-icon>
                Login with Discord
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submitLogin() {
      alert('Email/password login not set up. Use GitHub or Discord instead.')
    },
    loginWithGitHub() {
      this.$auth.loginWith('github')
    },
    loginWithDiscord() {
      this.$auth.loginWith('discord')
    }
  }
}
</script>
