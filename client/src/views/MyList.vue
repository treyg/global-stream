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
.card-grid {
  display: flex;
  flex-direction: column;
}

::v-deep .hero-content-wrapper {
  display: none;
}
::v-deep .media-card a {
  display: block;
  width: max-content;
}
</style>
