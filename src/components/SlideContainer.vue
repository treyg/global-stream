<template>
  <div>
    <h2>
      {{ type }} in
      <select
        :value="value"
        @input="$emit('input', $event.target.value)"
        @change="$emit('fetchNewParam')"
      >
        <option v-for="region in regions" :key="region.id" :value="region.id">
          {{ region.name }}
        </option>
      </select>
    </h2>
    <section class="slide-container">
      <vue-horizontal :button="false" class="scroll-container">
        <slot name="media" />
      </vue-horizontal>
    </section>
  </div>
</template>

<script>
import VueHorizontal from "vue-horizontal";

export default {
  name: "SlideContainer",
  components: { VueHorizontal },
  props: {
    type: String,
    include_adult: Boolean,
    value: {
      type: String,
      default: "US",
    },
    regions: {
      type: Array,
    },
    lang: { String, default: "en-US" },
  },
  methods: {
    fetchNewParam() {
      this.$emit("fetch-new-param");
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 5.5em;
  margin-bottom: 0;
  text-align: left;
  margin-left: 0.8em;
}

/* Hide MediaCard buttons for top-rated movies */
::v-deep .media-card figure {
  margin: 0;
  padding: 0;
  width: 100%;
}
::v-deep .media-card button,
::v-deep .media-card .view-media-btn {
  display: none;
}

/* Scroll container styling */
.scroll-container >>> .v-hl-container {
  gap: 2em;
  margin-bottom: 0;
  margin: 0 0 0 3em;
}

.scroll-container >>> .v-hl-container:not(.v-hl-scroll) {
  margin-bottom: 0;
}
</style>
