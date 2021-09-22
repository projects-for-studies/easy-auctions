<template>
  <b-modal :id="data.id"
     hide-footer hide-header no-close-on-esc :no-close-on-backdrop="data.blocked"
     :body-bg-variant="data.body_variant"
     :body-text-variant="data.text_variant">
    <b-container fluid>
      <span class="h6 text-center font-weight-bold">{{ data.message }}</span>
    </b-container>
  </b-modal>
</template>

<script>
export default {
  name: "Messages",
  props: {
    data:{
      type: Object,
      default: () => ({})
    },
  },
  watch:{
    data: function(a){
      if(a.show === true){
        setTimeout(() => {
          this.$bvModal.show(a.id)
          setTimeout(() => {
            if(a.redirect === true){
              this.$bvModal.hide(a.id)
              this.$router.push(a.path)
            }else{
              this.$bvModal.hide(a.id)
            }
          }, a.time)
        }, 10)
      }
    },
  },
}
</script>

<style scoped>

</style>