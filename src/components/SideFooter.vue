<template>
  <div class="bs-dashboard-content statistic-reports">
    <div class="row">
      <div class="col-lg-5">
        <div class="bs-dashboard-content--inner">
          <div class="bs-dashboard-content--header row justify-content-between">
            <div class="col-auto column col-left">
              <button
                @click="sendPaymentLink()"
                class="bs-btn btn-fix-action bs-btn-line-action"
              > ADD CARD
              </button>
            </div>
       
          </div>
          <div class="bs-dashboard-content--header row justify-content-between">
            <div class="col-auto column col-left">
              <button
                @click="makeAuthLink()"
                class="bs-btn btn-fix-action bs-btn-line-action"
              > MAKE LINK 
              </button>
            </div>
       
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import { mapState } from 'vuex'

export default {
  data: ()=> ({
    md5Id: null
  }),
  computed: {
     ...mapState('auth', {
      stylistId: state => state.user.sylistId
    }),
     ...mapState('users', {
      stylistById: state => state.getUserById.user.stylist,
      stylistEmail: state => state.getUserById.user.email
    }),
  },
  watch: {
    'stylistId' () {
      this.md5Id = this.makeMd5(this.stylistId)
    },
    'stylistById' () {
      const stylistId = this.getStylistId(this.stylistById)
      this.md5Id = this.makeMd5(stylistId)
    }
  },
  mounted() {
    this.md5Id = this.makeMd5(this.stylistId || this.getStylistId(this.stylistById))
  },
  methods: {
    sendPaymentLink() {
      const url = `https://connect.stripe.com/express/oauth/authorize?client_id=ca_HiwkZNIUbmgdij9LCrIwL7lWU2kSssRF&state=${this.md5Id}&suggested_capabilities[]=transfers&stripe_user[email]=${this.stylistEmail}&redirect_uri=https://beautybookbackend.demo.sibers.com/api/stripe/oauth#/`
      this.md5Id && this.stylistEmail && (window.open(url,'_blank'))
    },
    async makeAuthLink() {
      const getUrl = window.location;
      const baseUrl = getUrl .protocol + "//" + getUrl.host;
      const id = this.stylistId || this.getStylistId(this.stylistById)
      const link = `${baseUrl}/sign-up?stylistId=${id}`

      await this.$store.dispatch('auth/setRegisterLink', link)
      this.$modal.show('show-link')
    },
    makeMd5(id) { if (id) return   md5(id) },

    getStylistId(stylist) {
      if (stylist) {
        const stylistArr = stylist.split('/')
        return Number(stylistArr[stylistArr.length - 1])
      }
    }
  }
}
</script>