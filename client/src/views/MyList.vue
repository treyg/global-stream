<template>
  <div>
    <h1>My List</h1>
    <div class="card-grid">
      <media-card
        v-for="item in mediaList"
        :key="item.id"
        :poster_path="item.image"
        :vote_average="item.vote_average"
        :title="item.title"
        :lang="item.lang"
        :id="item.id"
        ><template slot="removeBtn">
          <button @click="removeMedia(item.id)" class="remove-btn">
            <img src="../assets/x-symbol.svg" alt="" />
          </button> </template
      ></media-card>
    </div>
    <!-- Button to clear entire list -->
    <button @click="clearList()" class="clear-btn">
      Clear Entire Watchlist
    </button>
  </div>
</template>

<script>
import MediaCard from "../components/MediaCard.vue";
export default {
  name: "MyList",
  components: { MediaCard },
  data() {
    return {
      mediaList: [],
    };
  },
  methods: {
    getMediaList() {
      this.mediaList = JSON.parse(localStorage.getItem("mediaList"));
    },
    removeMedia(id) {
      this.mediaList = this.mediaList.filter((item) => item.id !== id);
      localStorage.setItem("mediaList", JSON.stringify(this.mediaList));
    },
    clearList() {
      if (confirm("Are you sure you want to clear your watchlist?")) {
        this.mediaList = [];
        localStorage.setItem("mediaList", JSON.stringify(this.mediaList));
      }
    },
  },
  mounted() {
    this.getMediaList();
  },
};
</script>

<style scoped>
h1 {
  font-size: 6rem;
  padding-top: 9rem;
  padding-bottom: 0;
  margin: 0;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50rem, 1fr));
  padding-bottom: 15em;
}

.remove-btn {
  background-color: var(--warning);
  color: var(--text-primary);
  width: max-content;
  height: max-content;
}

@media (max-width: 768px) {
  .remove-btn {
  }
}

.remove-btn img {
  width: 3.5rem;
}

.clear-btn {
  width: max-content;
  padding: 0 2em;
  background-color: var(--danger);
  margin-bottom: 10rem;
}

::v-deep .hero-content-wrapper {
  display: none;
}

::v-deep .media-card {
  margin: auto;
  flex-direction: column;
}

::v-deep .media-card a {
  display: block;
  width: 100%;
}

::v-deep .button-container {
  position: relative;
}

::v-deep .media-card #saveBtn {
  display: none;
}
</style>
