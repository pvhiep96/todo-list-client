<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="window-height window-width row justify-center items-center"
        style="background: linear-gradient(#8274C5, #5A4A9F);"
      >
        <!-- Login -->
        <div class="column q-pa-lg">
          <div class="row">
            <q-card square class="shadow-24" style="width:300px;height:535px;">
              <q-card-section class="bg-deep-purple-7">
                <h4 class="text-h5 text-white q-my-md">Company &amp; Co</h4>
              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm q-pt-xl">
                  <q-input square clearable v-model="email" type="email" label="Email">
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input square clearable v-model="password" type="password" label="Password">
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-lg">
                <q-btn v-on:click="login()" clunelevated size="lg" color="purple-4" class="full-width text-white" label="Sign In" />
              </q-card-actions>
              <q-card-section class="text-center q-pa-sm">
                <p class="text-grey-6">Forgot your password?</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      let self = this;
      this.$withoutAuth.post('/auth/login', {email: this.email, password: this.password}).then((response) => {
        window.localStorage.setItem('token', response.data.token);
        self.$router.push('/')
      })
    },
  },
}
</script>
