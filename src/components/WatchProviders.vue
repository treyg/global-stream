<template>
  <div class="provider">
    <img
      @click="$emit('showLocations')"
      :src="logo_path"
      alt="Media provider logo."
    />
  </div>
</template>
<script>
export default {
  name: "WatchProviders",
  components: {},
  props: {
    // countries: {
    //   type: Array,
    // },
    provider_logo: String,
    provider_name: String,
    provider_id: Number,
    logo_path: String,
  },
  methods: {
    showLocations() {
      this.$emit("show-locations");
    },
  },
  // mounted: function () {
  //   this.showAllProviders();
  // },
  filters: {},
};
</script>

<style scoped>
.provider {
  width: max-content;
}
img {
  display: block;
  position: relative;
  width: 10em;
  border-radius: 0.8em;
}
</style>
