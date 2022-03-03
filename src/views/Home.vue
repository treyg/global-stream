<template>
  <div class="home">
    <section class="hero">
      <h1>Find Where To Stream Any Movie</h1>
      <Search />
    </section>
    <PopularMovies />
  </div>
</template>
<script>
import Search from "../components/Search.vue";
import PopularMovies from "../components/PopularMovies.vue";
export default {
  name: "Home",
  components: { Search, PopularMovies },
};
</script>
<style scoped>
.hero {
  height: 100%;
  background-image: linear-gradient(
    180deg,
    hsl(206deg 29% 9%) 0%,
    hsl(204deg 25% 11%) 28%,
    hsl(203deg 23% 13%) 41%,
    hsl(202deg 22% 14%) 52%,
    hsl(201deg 21% 15%) 62%,
    hsl(201deg 20% 16%) 73%,
    hsl(200deg 20% 17%) 86%,
    hsl(200deg 19% 18%) 100%
  );
  display: flex;
  flex-direction: column;
  padding: 25em 0 15em;
}

h1 {
  font-size: 8em;
  margin: 0 0 0.8em 0;
  line-height: 1.1;
  background: -webkit-linear-gradient(
    45deg,
    var(--primary),
    var(--success) 80%
  );
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
