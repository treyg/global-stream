<template>
  <div id="app">
    <!-- <nav id="nav">
      <router-link to="/">Home</router-link>
    </nav> -->
    <header class="header">
      <nav class="header__nav">
        <ul class="header__navbar">
          <li class="header__item">
            <a href="#" class="header__link">
              <transition name="slide-fade">
                <!-- Header Navigation Menu Icons -->
                <button
                  class="header--button"
                  v-if="show"
                  key="on"
                  @click="show = false"
                >
                  <svg viewBox="0 0 24 24" class="header--icon">
                    <title>Close</title>
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                      fill="currentColor"
                      d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
                    />
                  </svg>
                </button>
                <button
                  class="header--button"
                  v-else
                  key="off"
                  @click="show = true"
                >
                  <svg viewBox="0 0 24 24" class="header--icon">
                    <title>Navigation Menu</title>
                    <path
                      fill="currentColor"
                      d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"
                    />
                  </svg>
                </button>
              </transition>
            </a>
            <!-- Dropdown Menu -->
            <transition name="dropdown">
              <div
                class="dropdown__menu"
                v-bind:class="{ active: show }"
                v-if="show"
              >
                <ul class="dropdown__menu-nav">
                  <li class="dropdown__menu-item">
                    <router-link to="/" class="dropdown__menu-link">
                      <div class="dropdown__menu-text">Home</div>
                    </router-link>
                  </li>
                  <li class="dropdown__menu-item">
                    <router-link to="/my-list" class="dropdown__menu-link">
                      <div class="dropdown__menu-text">My List</div>
                    </router-link>
                  </li>
                  <li class="dropdown__menu-item">
                    <router-link to="/about" class="dropdown__menu-link">
                      <div class="dropdown__menu-text">About</div>
                    </router-link>
                  </li>
                </ul>
              </div>
            </transition>
          </li>
        </ul>
      </nav>
    </header>

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
  data() {
    return {
      show: false,
    };
  },
};
</script>
<style>
:root {
  font-size: 10px;
  font-size: 1.3vw;
  --bg-primary: #263238;
  --bg-secondary: #37474f;
  --primary: #3ccafa;
  --primary-lighter: #3d7082;
  --success: #03beac;
  --warning: #ffc107;
  --danger: #ec356c;
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

/* nav {
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
} */

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

/* Sidebar styling */
.header {
  padding: 2rem 5rem 2rem 5rem;
  background-color: #11191f;
}
.header ul {
  list-style: none;
}
.header__nav {
  position: relative;
}
.header__navbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 6em;
}
.header--icon {
  width: 5.65rem;
  height: 5.65rem;
}
.header--button {
  top: 0;
  right: 0;
  position: absolute;
  margin: 0;
  padding: 0;
  color: var(--icon);
  cursor: pointer;
  border: 0.1em solid transparent;
  background-color: transparent;
  width: auto;
}
.header--button:focus {
  outline: 0;
}
.dropdown__menu {
  top: 100%;
  right: 0;
  position: absolute;
  z-index: 10;
  height: auto;
  min-width: 64.4rem;
  margin-top: 1rem;
  overflow-y: auto;
  padding: 2rem 1rem 2rem 0rem;
  border-radius: 12px;
  background-color: var(--bg-primary);
  border: 0.1rem solid var(--bg-secondary);
  background-clip: padding-box;
}
.dropdown__menu-nav {
  padding-left: 0;
}
.dropdown__menu-link {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;
  color: var(--text-primary);
  padding: 0.8rem 0 0.8rem 2rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0 0.8rem 0.8rem 0;
  font-size: 3.2rem;
  width: 88%;
}
.dropdown__menu-link:hover {
  color: var(--success);
  background-color: rgba(102, 214, 164, 0.1);
}
.dropdown__menu-svg {
  width: 1.5rem;
  height: 1.5rem;
}
.dropdown__menu-text {
  font-weight: 500;
  margin-left: 1rem;
  margin-right: 1rem;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.6s;
}
.slide-fade-enter,
.slide-fade-leave-active {
  opacity: 0;
}
.slide-fade-enter {
  transform: translateX(31px);
}
.slide-fade-leave-active {
  transform: translateX(-31px);
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 1s;
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.main {
  margin: 6rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.main__link {
  margin-right: 1.5rem;
  display: inline-block;
}
.main__link:last-child {
  margin-right: 0;
}
</style>
