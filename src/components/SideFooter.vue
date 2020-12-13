<template>
  <div class="bs-dashboard-content statistic-reports">
    <div class="row">
      <div class="col-lg-5">
        <div class="bs-dashboard-content--inner">
         
        </div>
      </div><div class="col-lg-5">
        <div class="bs-dashboard-content--inner">
         
        </div>
      </div><div class="col-lg-5">
        <div class="bs-dashboard-content--inner">
         
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
    })
  },
  watch: {
 
  },
  mounted() {
    this.md5Id = this.makeMd5(this.stylistId || this.getStylistId(this.stylistById))
  },
  methods: {
    }
}
</script>