<template>
  <b-modal header-bg-variant="light"
           header-text-variant="dark"
           footer-bg-variant="light"
           footer-text-variant="dark"
           body-bg-variant="light"
           body-text-variant="dark"
           no-close-on-esc
           no-close-on-backdrop
           :id="data.id"
  >
    <template #modal-header>
      <span>{{ data.header.title }}</span>
      <span class="float-right" style="cursor: pointer" @click="data.header.close_header_action">&#9746;</span>
    </template>
    <span v-html="data.body">
      </span>
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-end">
        <b-button variant="secondary" size="sm" style="margin-right: 10px" v-show="data.footer.cancel" @click="data.footer.cancel_action">
          {{ data.footer.cancel_title }}
        </b-button>
        <b-button variant="dark" size="sm" v-show="data.footer.ok" @click="data.footer.ok_action">
          {{ data.footer.ok_title }}
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "Confirmation",
  props: {
    data:{
      type: Object,
      default: () => ({})
    },
  }
}
</script>

<style scoped>

</style>