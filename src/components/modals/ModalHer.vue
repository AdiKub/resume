<template>
  <modal
    name="model-her"
    height="auto"
    width="100%"
    :maxWidth="790"
    :adaptive="true"
    :clickToClose="false"
  >
    <div class="bs-modal">
      <div class="bs-modal-header"> sdfsdfsdf sdfsdf sdfsdf</div>
      <h1> asdasdadad </h1>
    </div>
  </modal>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'ModalHer',
  methods: {
    showModal () {
      this.$modal.show('model-her')
    },
    closeModal () {
      this.$modal.hide('model-her')
    }
  }  
}
</script>
