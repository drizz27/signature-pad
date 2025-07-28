<template>
  <v-app dark>
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          @click="item.action && item.action()"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>

      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />

      <v-btn
        v-if="$auth.loggedIn && $route.path !== '/signin'"
        color="red"
        dark
        @click="logout"
      >
        <v-icon left>mdi-logout</v-icon> Logout
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container>
        <h1 class="text-h5 mb-4">Signature Pad</h1>

        <!-- Color & Width Controls -->
        <v-row align="center" class="mb-4">
          <v-col cols="4" md="2">
            <v-text-field
              label="Select a Color"
              v-model="penColor"
              type="color"
              @input="updatePenOptions"
            />
          </v-col>
          <v-col cols="8" md="4">
            <v-slider
              label="Stroke Width"
              v-model="penWidth"
              :min="1"
              :max="10"
              @change="updatePenOptions"
            />
          </v-col>
        </v-row>

        <vue-signature-pad
          ref="signaturePad"
          :options="options"
          style="border: 1px solid #ccc; width: 100%; height: 300px;"
        />

        <v-row class="mt-4" justify="start" align="center">
          <v-btn color="grey darken-2" class="mr-2" @click="clearSignature">
            <v-icon left>mdi-close</v-icon> Clear
          </v-btn>
          <v-btn color="green darken-2" class="mr-2" @click="saveSignature">
            <v-icon left>mdi-content-save</v-icon> Save
          </v-btn>
        </v-row>

        <v-card v-if="savedImage" class="mt-6 pa-4" elevation="2">
          <h2 class="text-h6 mb-3">Preview ng Na-save na Pirma:</h2>
          <v-img :src="savedImage" max-height="300" contain class="mb-3" />
          <v-row>
            <v-btn color="red darken-1" class="mr-2" @click="clearPreview">
              <v-icon left>mdi-delete</v-icon> Clear Preview
            </v-btn>
            <v-btn color="blue darken-2" @click="downloadSignature">
              <v-icon left>mdi-download</v-icon> Download
            </v-btn>
          </v-row>
        </v-card>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      title: 'e-Signature',

      savedImage: null,
      penColor: '#000000',
      penWidth: 2,
      options: {
        penColor: '#000000',
        minWidth: 2,
        maxWidth: 2,
        backgroundColor: "white"
      }
    }
  },

  computed: {
    items() {
      const baseItems = [

      ]

      if (this.$auth.loggedIn && this.$route.path !== '/signin') {
        baseItems.push({
          icon: 'mdi-logout',
          title: 'Logout',
          to: '#',
          action: this.logout
        })
      } else if (!this.$auth.loggedIn && this.$route.path !== '/signin') {
        baseItems.push({
          icon: 'mdi-login',
          title: 'Sign In',
          to: '/auth/signin'
        })
      }

      return baseItems
    }
  },

  methods: {
    clearSignature() {
      this.$refs.signaturePad.clearSignature()
    },
    saveSignature() {
      if (!this.$refs.signaturePad.isEmpty()) {
        const dataUrl = this.$refs.signaturePad.$el.querySelector("canvas").toDataURL("image/png")
        this.savedImage = dataUrl
        localStorage.setItem('savedSignature', dataUrl)
        this.$toast?.success("Pirma ay na-save!") || alert("Pirma ay na-save!")
      } else {
        this.$toast?.error("Walang laman ang pirma!") || alert("Walang laman ang pirma!")
      }
    },
    clearPreview() {
      this.savedImage = null
      localStorage.removeItem('savedSignature')
      this.$toast?.info("Na-clear ang preview ng pirma.") || alert("Na-clear ang preview ng pirma.")
    },
    downloadSignature() {
      if (this.savedImage) {
        const a = document.createElement('a')
        a.href = this.savedImage
        a.download = 'pirma.png'
        a.click()
      }
    },
    async logout() {
      await this.$auth.logout()
      this.$router.push('/auth/signin')
    },
    updatePenOptions() {
      const canvas = this.$refs.signaturePad.signaturePad
      canvas.penColor = this.penColor
      canvas.minWidth = this.penWidth
      canvas.maxWidth = this.penWidth
    }
  },

mounted() {
  const stored = localStorage.getItem('savedSignature')
  if (stored) {
    this.savedImage = stored
  }

  // Initialize pen options
  this.updatePenOptions()

  // ✅ Debugging login loop
  console.log('Auth Logged In:', this.$auth.loggedIn)
  console.log('Auth User:', this.$auth.user)
}

}
</script>

<style scoped>
h1 {
  font-weight: 600;
}
</style>
