<template>
  <modal
    name="appointment-confirmed"
    height="auto"
    width="100%"
    :maxWidth="790"
    :adaptive="true"
    :clickToClose="false"
  >
    <div class="bs-modal">
      <div class="bs-modal-header"></div>
      <div class="bs-modal-body">
        <div class="row justify-content-center">
          <div class="col-lg-8 bs-modal--content">
            <div class="appointment-confirmed text-center">
              <div class="appointment-confirmed--icon">
                <img src="@/assets/images/svg/check.svg" />
              </div>
              <div class="appointment-confirmed--text">
                <p class="mb-5">
                  Appointment Confirmed
                  <br />Friday, APRIL 04 2020
                </p>
                <button
                  @click="goToPage()"
                  class="bs-btn bs-btn-primary bs-btn-lg bs-btn-full radius-4"
                >View Your Booking</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bs-modal-footer"></div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ModalAppointmentConfirmed',

  methods: {
    goToPage() {
      this.$modal.hide('pick-date-time')
      this.$modal.hide('appointment-confirmed')
      this.$modal.hide('confirm-details')
      this.$router.push(`/client-profile/appointments`)
    }
  }
}
</script>