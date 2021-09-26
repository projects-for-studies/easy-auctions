<template>
  <b-modal :header-bg-variant="data.bg_variant"
           :header-text-variant="data.txt_variant"
           :footer-bg-variant="data.bg_variant"
           :footer-text-variant="data.txt_variant"
           :body-bg-variant="data.bg_variant"
           :body-text-variant="data.txt_variant"
           no-close-on-esc
           no-close-on-backdrop
           v-model="show"
           :id="data.id"
  >
    <template #modal-header>
      <span>{{ data.header.title }}</span>
      <span class="float-right" style="cursor: pointer" @click="data.header.close_header_action">&#9746;</span>
    </template>
      <span v-html="data.body">
      </span>
    <template #modal-footer>
      <div class="w-100">
        <b-button variant="secondary" size="sm" class="float-right" v-show="data.footer.cancel" @click="data.footer.cancel_action">
          {{ data.footer.cancel_title }}
        </b-button>
        <b-button variant="dark" size="sm" class="float-right" v-show="data.footer.ok" @click="data.footer.ok_action">
          {{ data.footer.ok_title }}
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
  export default {
    name: "Confirmation",
    data: () => ({
      show: false,
    }),
    props: {
      data:{
        type: Object,
        default: () => ({})
      },
    },
    computed:{
      show_modal: function(){
        return this.data.show
      }
    },
    watch: {
      show_modal: function(val){
        if(val == true){
          setTimeout(() => {
            this.show = true
          }, 100)
        }
      }
    }
  }
</script>

<style scoped>

</style>