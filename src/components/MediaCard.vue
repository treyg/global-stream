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
      <div class="hero-content-wrapper">
        <div class="details">
          <p class="release-date" v-if="release_date">
            {{ release_date | cutDate }}
          </p>
          <div class="runtime_rating">
            <span
              ><img src="../assets/clock.svg" alt="" />{{
                runtime | toHoursAndMinutes
              }}</span
            >
            <span>{{ rating }}</span>
          </div>
          <div class="genre_wrapper">
            <slot name="genre" />
          </div>
        </div>
        <div class="info-wrapper">
          <h2>
            {{ title }}
          </h2>
          <h3 v-if="tagline">"{{ tagline }}"</h3>
          <p v-if="summary">{{ summary }}</p>
        </div>
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
    runtime: Number,
    rating: String,
    genre: Array,
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
    toHoursAndMinutes(totalMinutes) {
      const minutes = totalMinutes % 60;
      const hours = Math.floor(totalMinutes / 60);
      return `${padTo2Digits(hours)}h${padTo2Digits(minutes)}m`;
      function padTo2Digits(num) {
        return num.toString().padStart(2);
      }
    },
  },
};
</script>

<style scoped>
.media-card {
  text-align: left;
}
h2 {
  font-size: 4.4em;
  margin-bottom: 0.5em;
}

h3 {
  font-size: 3.5em;
  font-style: italic;
  margin: 0.4em 0 0.8em 0;
}

p {
  font-size: 2.5em;
  margin: 0 0 1.5em 0;
}

.details .release-date {
  font-size: 1em;
  margin: 0;
  text-align: center;
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
  font-size: 2.2em;
  width: 3.5em;
  display: block;
  border-top-right-radius: 0.18em;
  color: var(--text-primary);
  text-align: center;
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
  position: relative;
  display: flex;
  justify-content: center;
  gap: 3em;
  align-items: center;
}

.details {
  font-size: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
}

.details span {
  display: flex;
}

.runtime_rating {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
}

.genre_wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
}

.details img {
  width: 1em;
  display: inline-block;
  margin-right: 0.3em;
  display: flex;
  flex-direction: column;
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

/* Desktop styles */
@media (min-width: 769px) {
  .media-card {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .hero-content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  h2 {
    font-size: 6em !important;
  }

  h3 {
  }

  p {
  }

  .details .release-date {
  }

  .media-card figure {
  }

  .votes {
  }

  .card {
  }

  .button-container {
  }

  .button-container button {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .details {
    order: 2;
    display: flex;
    align-items: start;
  }

  .details span {
  }

  .runtime_rating {
  }

  .genre_wrapper {
  }

  .details img {
  }

  .view-media-btn {
  }
}
</style>
