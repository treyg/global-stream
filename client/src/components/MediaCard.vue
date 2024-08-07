<template>
  <article class="media-card">
    <router-link
      class="image-link"
      :to="{
        name: 'MediaShow',
        params: { mediaType: mediaType, id: id, lang: lang },
      }"
    >
      <figure>
        <img :src="poster_path" alt="" />
        <span class="votes" :class="computedRatingClass">
          {{ Math.round(vote_average * 10) }}%
        </span>
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
        <SaveButton id="saveBtn" v-on:addToWatchList="saveMedia" />
        <slot name="removeBtn" />
      </div>
    </div>
  </article>
</template>

<script>
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
    mediaType: {
      type: String,
      default: "movie",
    },
    poster_path: String,
    summary: String,
    tagline: String,
    link: String,
    lang: {
      type: String,
      default: "en",
    },
    url: String,
    onList: Boolean,
    media: {},
    id: Number,
    //Media Provider Data
    provider: String,
    provider_logo: String,
    runtime: [Array, Number],
    rating: String,
    genre: Array,
  },
  data() {
    return {};
  },
  mounted() {
    this.checkOnList();
  },
  methods: {
    saveMedia() {
      let mediaItem = {
        title: this.title,
        summary: this.summary,
        url: this.url,
        id: this.id,
        vote_average: this.vote_average,
        runtime: this.runtime,
        image: this.poster_path,
        type: this.$route.params.mediaType,
        lang: this.lang,
      };
      //push mediaItem to object in local storage
      let mediaList = JSON.parse(localStorage.getItem("mediaList"));
      if (mediaList === null) {
        mediaList = [];
      }
      mediaList.push(mediaItem);
      localStorage.setItem("mediaList", JSON.stringify(mediaList));

      const saveBtn = document.getElementById("saveBtn");
      saveBtn.classList.add("saved");
      saveBtn.innerHTML = "Saved";
    },
    //check if media is on watchlist
    checkOnList() {
      let mediaList = JSON.parse(localStorage.getItem("mediaList"));
      if (this.$route.name == "MediaShow") {
        if (mediaList !== null) {
          mediaList.forEach((item) => {
            if (item.id == this.$route.params.id) {
              const saveBtn = document.getElementById("saveBtn");
              saveBtn.classList.add("saved");
              saveBtn.innerHTML = "Saved";
              saveBtn.style.pointerEvents = "none";
              saveBtn.style.cursor = "not-allowed";
            }
          });
        }
      }
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

.saved {
  background-color: var(--success);
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.saved::after {
  content: "\2713";
  position: absolute;
  top: 50%;
  right: 11%;
  height: auto;
  width: auto;
  transform: translateY(-50%);
  font-size: 1.1em;
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
  width: max-content;
  margin-left: auto;
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
    align-items: flex-start;
  }

  h2 {
    font-size: 6em !important;
  }

  .button-container button {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .details {
    order: 2;
    display: flex;
    align-items: flex-start;
  }
}
</style>
