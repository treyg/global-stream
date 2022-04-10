<template>
  <div id="app">
    <header class="header">
      <Nav />
    </header>
    <div class="container">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script>
import Nav from "./components/Nav.vue";
export default {
  name: "App",
  components: {
    Nav,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  watch: {},
};
</script>
<style>
:root {
  font-size: 10px;
  font-size: 1.3vw;
  --bg-primary: #263238;
  --bg-secondary: #37474f;
  --darkest: #11191f;
  --primary: #3ccafa;
  --primary-lighter: #3d7082;
  --success: #03beac;
  --warning: #ffc107;
  --danger: #ec356c;
  --text-primary: #ffffff;
  --icon: #617b8a;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  min-height: 100vh;
}

img {
  border-radius: 0.8em;
  display: block;
  position: relative;
  max-width: 100%;
}

article {
  padding-top: 8em;
  max-width: 100vw;
}

select {
  background-color: var(--bg-primary);
  border: none;
  border-bottom: 0.05em solid var(--primary);
  font-weight: inherit;
  color: var(--text-primary);
  font-size: 0.9em;
}
option {
  font-size: 0.6em;
  font-weight: normal;
  border-radius: 0.2em;
  padding: 2em;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.1s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* Mobile only styles */
@media (max-width: 768px) {
  .lg-only {
    display: none;
  }
}

/* Global desktop styles */
@media (min-width: 769px) {
  :root {
    font-size: 0.521vw;
  }
  .sm-only {
    display: none;
  }
}

@media (min-width: 1921px) {
  :root {
    font-size: 10px;
  }
}
/* Nav styling */
.header {
  width: 100%;
  background-color: var(--darkest);
  position: fixed;
  bottom: 0;
  z-index: 1;
}
</style>
