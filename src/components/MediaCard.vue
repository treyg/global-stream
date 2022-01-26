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
    <SaveButton v-on:addToWatchList="saveMedia" />
  </article>
</template>

<script>
import axios from "axios";
import SaveButton from "./SaveButton.vue";
export default {
  name: "MediaCard",
  components: { SaveButton },
  props: {
    title: String,
    vote_average: {
      type: [String, Number],
    },
    release_date: String,
    poster_path: String,
    summary: String,
    link: String,
    url: String,
    type: String,
    onList: Boolean,
    media: {},
  },
  // async mounted() {
  //   const API_URL = "http://localhost:3000/";
  //   // Custom headers, but no need for content-type.
  //   const headers = new Headers({
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   });

  //   // If the fetch fails,
  //   try {
  //     // Fetch with custom headers.
  //     const media = await fetch(API_URL, { headers })
  //       .then((response) => response.json())
  //       .then((movies) => movies);
  //     // Then set the media object to data
  //     this.media = media;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },
  methods: {
    saveMedia() {
      //function to push prop data to watchlist
      axios
        .post("http://localhost:3000/", {
          title: this.title,
          summary: this.summary,
          url: this.url,
          type: this.type,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  // mounted() {
  //   this.fetchBackend();
  // },
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
