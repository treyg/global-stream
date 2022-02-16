<template>
  <button
    class="button is-primary is-small"
    v-on:click="$emit('addToWatchList')"
  >
    Save
  </button>
</template>

<script>
export default {
  name: "SaveButton",
  data() {
    return {
      //   apiURL: "http://localhost:3000/",
      //   restults: [],
      //toggleAdd: "Save",
      //   title: "",
      //   type: "",
      //   summary: "",
      //   link: "",
      //   isWatched: false,
    };
  },
  methods: {
    addToWatchlist() {
      this.$emit("add-to-watchlist");
    },
  },
};
</script>
<style>
button {
  background-color: var(--primary);
  color: var(--text-primary);
  border: none;
  border-radius: 0.32em;
  font-size: 2.5em;
  width: 8em;
  height: 2.5em;
}
</style>
