<template>
  <div @mouseover="hover = true" @mouseleave="hover = false" class="provider">
    <img :src="logo_path" alt="Media provider logo." />
    <span v-if="hover">{{ provider_name }}</span>
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
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    // showLocations() {
    //   this.$emit("show-locations");
    // },
  },
};
</script>

<style scoped>
.provider {
  width: max-content;
  position: relative;
  cursor: pointer;
}
img {
  display: block;
  position: relative;
  width: 10em;
  border-radius: 2.3em;
}

span {
  font-size: 2rem;
  position: absolute;
  transform: translate(-50%, -50%);
  top: -1.5em;
  background-color: var(--icon);
  padding: 0.1em 0.4em;
  border-radius: 0.2em;
  width: max-content;
}
</style>
