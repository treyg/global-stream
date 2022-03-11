<template>
  <article class="media-card">
    <router-link
      class="image-link"
      :to="{ name: 'MediaShow', params: { id: id, lang: lang } }"
    >
      <figure>
        <img :src="poster_path" alt="" />
        <span class="votes" :class="computedRatingClass">
          {{ vote_average * 10 }}%</span
        >
      </figure>
    </router-link>
    <div>
      <div>
        <p class="release-date" v-if="release_date">
          {{ release_date | cutDate }}
        </p>
        <h2>
          {{ title }}
        </h2>
        <h3 v-if="tagline">"{{ tagline }}"</h3>
      </div>
      <p v-if="summary">{{ summary }}</p>
    </div>
    <div class="button-container">
      <SaveButton v-on:addToWatchList="saveMedia" />
      <router-link
        class="view-media-btn"
        :to="{ name: 'MediaShow', params: { id: id, lang: lang } }"
      >
        View
      </router-link>
    </div>
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
    tagline: String,
    link: String,
    lang: String,
    url: String,
    type: String,
    onList: Boolean,
    media: {},
    id: Number,
    //Media Provider Data
    provider: String,
    provider_logo: String,
  },
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
    showLang() {
      console.log(this.lang);
    },
  },
  computed: {
    computedRatingClass() {
      if (this.vote_average >= 8) {
        return "goodRating";
      } else if (this.vote_average >= 6) {
        return "averageRating";
      } else {
        return "badRating";
      }
    },
  },
  filters: {
    cutDate(value) {
      return value.slice(0, 4);
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 4.4em;
  margin-bottom: 0.5em;
}

h3 {
  font-size: 3.5em;
  font-style: italic;
  margin: 0 0 0.2em 0;
}

p {
  font-size: 2.5em;
  margin: 0 0 1.5em 0;
}

.release-date {
  font-size: 2.8em;
  margin: 0;
}

figure {
  position: relative;
  margin-bottom: 3em;
  transition: transform 0.2s ease-in-out;
}

figure:hover {
  border-radius: 0.8em;
  transform: scale(1.01);
  box-shadow: 0 0.5em 1.3em 0.7em rgba(13, 35, 42, 0.54);
}

.votes {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2.5em;
  width: 3.5em;
  display: block;
  border-top-right-radius: 0.18em;
  color: var(--text-primary);
}

.badRating {
  background-color: var(--danger);
}

.averageRating {
  background-color: var(--warning);
  color: var(--bg-primary);
}

.goodRating {
  background-color: var(--success);
}

.card {
  margin-bottom: 2em;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 3em;
  align-items: center;
}

.view-media-btn {
  color: var(--text-primary);
  font-size: 2.8em;
  text-decoration: none;
  background-color: var(--success);
  border: none;
  border-radius: 0.32em;
  font-size: 2.5em;
  width: 8em;
  height: 2.5em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
