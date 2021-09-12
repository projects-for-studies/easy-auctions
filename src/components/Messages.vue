<template>
  <div>
    <b-toast :id="id_msg" :variant="variant" toaster="b-toaster-top-center" solid>
      <template #toast-title>
        <div class="d-flex">
          <strong class="mr-auto">{{ title }}</strong>
        </div>
      </template>
      {{ msg }}
    </b-toast>
  </div>
</template>

<script>
export default {
  name: "Messages",
  props: {
    variant: {type: String, default: ''},
    id_msg: { type: String, default: 'msg' },
    title: { type: String, default: '' },
    msg: { type: String, default: '' },
    time: { type: String, default: "500" }
  },
  created(){
    this.$bvToast.show(this.id_msg)
    setTimeout(() => {
      this.$bvToast.hide(this.id_msg)
    }, parseInt(this.time))
  }
}
</script>

<style scoped>

</style>