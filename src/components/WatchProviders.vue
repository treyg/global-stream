<template>
  <div class="provider">
    <img :src="logo_path" alt="Media provider logo." />
  </div>
</template>
<script>
export default {
  name: "WatchProviders",
  components: {},
  props: {
    provider_logo: String,
    provider_name: String,
    provider_id: Number,
    logo_path: String,
  },
  methods: {
    // showLocations() {
    //   this.$emit("show-locations");
    // },
  },
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
  border-radius: 2.3em;
}
</style>
