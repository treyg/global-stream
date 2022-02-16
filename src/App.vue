<template>
  <div id="app">
    <div id="nav">
      <router-link to="/about">About</router-link>
    </div>

    <div class="container">
      <router-view />
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
  --mild: #ffc107;
  --text-primary: #fbfcfd;
  --icon: #617b8a;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-primary);
}

#nav {
  padding: 30px;
  background-color: var(--bg-secondary);
}

#nav a {
  font-weight: bold;
  color: var(--text-primary);
}

#nav a.router-link-exact-active {
  color: #42b983;
}

img {
  border-radius: 0.8em;
  display: block;
  position: relative;
}

article {
  padding-top: 10em;
}
</style>
