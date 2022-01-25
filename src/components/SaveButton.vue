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
