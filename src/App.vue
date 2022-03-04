<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">Home</router-link>
    </nav>
    <div class="container">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style>
:root {
  font-size: 10px;
  font-size: 1.3vw;
  --bg-primary: #263238;
  --bg-secondary: #37474f;
  --primary: #4bcffa;
  --primary-lighter: #3d7082;
  --success: #03dac5;
  --danger: #ec4279;
  --text-primary: #fbfcfd;
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

nav {
  height: 3em;
  background-color: var(--bg-secondary);
  font-size: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav a {
  font-weight: bold;
  color: var(--text-primary);
  font-size: 1.5em;
}

nav a.router-link-exact-active {
  color: var(--success);
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

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
