<template>
  <article class="card">
    <figure class="card-image">
      <img :src="poster_path" alt="" />
      <span class="tag is-success">{{ vote_average }}</span>
    </figure>
    <div class="card-content">
      <div class="search-result-title">
        <h2 class="title is-5">
          {{ title }}
        </h2>
      </div>
      <p>{{ release_date | cutDate }}</p>
    </div>
  </article>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    title: String,
    vote_average: {
      type: [String, Number],
    },
    release_date: String,
    poster_path: String,
  },
  filters: {
    cutDate(value) {
      return value.slice(0, 4);
    },
  },
};
</script>

<style scope>
.tag {
  position: absolute;
  top: 0;
  right: 0;
}

.card {
  max-width: 48%;
  margin-bottom: 2em;
}
</style>
