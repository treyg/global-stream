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
      />
    </div>
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
}

::v-deep .hero-content-wrapper {
  display: none;
}

::v-deep .media-card {
  margin: auto;
}

::v-deep .media-card a {
  display: block;
  width: 100%;
}

::v-deep .media-card #saveBtn {
  display: none;
}
</style>
