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
    return {};
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
  cursor: pointer;
}

button:hover {
  transform: translateY(-1px);
  transition: 0.3s ease;
}
</style>
