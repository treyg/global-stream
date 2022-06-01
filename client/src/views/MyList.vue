<template>
  <div>
    <h1>My List</h1>
    <!-- <div v-for="item in mediaList" :key="item.id">
            <h2>{{ item.title }}</h2>
        </div> -->
    <media-card
      v-for="item in mediaList"
      :key="item.id"
      :poster_path="item.image"
      :title="item.title || item.original_name"
    />
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

<style scoped></style>
