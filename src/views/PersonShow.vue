<template>
  <div>
    <PersonCard
      :key="person.id"
      :name="person.name"
      :img_path="`${img_base_url}${person.profile_path}`"
      :bio="person.biography"
    />
  </div>
</template>

<script>
import PersonCard from "../components/PersonCard.vue";
export default {
  name: "PersonShow",
  components: { PersonCard },
  data() {
    return {
      personID: this.$route.params.id,
      img_base_url: "https://image.tmdb.org/t/p/w500",
      STATIC_API: "https://api.themoviedb.org/3/person",
      person: [],
    };
  },
  methods: {
    //fetch person info
    async fetchPersonInfo() {
      console.log(this.personID);
      const response = await fetch(
        `${this.STATIC_API}/${this.personID}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
      );
      const data = await response.json();
      this.person = data;
    },
  },
  created: async function () {
    await this.fetchPersonInfo();
  },
};
</script>

<style scoped>
</style>