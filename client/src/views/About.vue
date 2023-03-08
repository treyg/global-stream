<template>
  <div class="about">
    <h1>About Global Stream</h1>
    <p>
      This application utilizes the TMDB API to enable users to search for
      movies and TV shows and discover available streaming options based on
      their location and preferred provider. Additionally, users can add movies
      to a watchlist that is saved locally.
    </p>
    <p>
      Global Stream provides a free and open-source alternative to sites like
      Just Watch or IMDB. If you have a feature request or suggestion, please
      feel free to open an issue on
      <a href="https://github.com/treyg/movie-app/issues" target="_blank"
        >Github</a
      >.
    </p>
    <p>Built with Vue, Node, and Express JS</p>
  </div>
</template>
<script>
export default {
  name: "About",
};
</script>
<style scoped>
.about {
  margin: auto;
  max-width: 800px;
  padding: 3em 2em;
}
.about h1 {
  font-size: 4.4em;
  margin-bottom: 0.5em;
}
.about p {
  font-size: 2.5em;
  margin: 0 0 1.5em 0;
}
</style>
