<template>
  <nav class="nav-wrapper">
    <ul id="nav-list">
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/408x161-powered-by-rectangle-green-bb4301c10ddc749b4e79463811a68afebeae66ef43d17bcfd8ff0e60ded7ce99.png"
        alt="logo"
        class="lg-only"
      />
      <div class="nav-list--li-wrap">
        <li>
          <router-link aria-label="Home." to="/"
            ><img class="sm-only" src="../assets/home.svg" /><span
              class="lg-only"
              >Home</span
            ></router-link
          >
        </li>
        <li>
          <router-link aria-label="My list." to="/mylist">
            <img class="sm-only" src="../assets/list.svg" />
            <span class="lg-only">My List</span>
          </router-link>
        </li>
        <li>
          <a @click="focusSearch" aria-label="Search.">
            <img class="sm-only" src="../assets/search.svg" /><span
              class="lg-only"
              >Search</span
            >
          </a>
        </li>
        <li>
          <router-link aria-label="About." to="/about"
            ><img class="sm-only" src="../assets/about.svg" /><span
              class="lg-only"
              >About</span
            ></router-link
          >
        </li>
      </div>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {};
  },
  methods: {
    focusSearch() {
      this.$router.push({ path: "/", hash: "#search" });
    },
  },
};
</script>

<style scoped>
#nav-list {
  display: flex;
  justify-content: space-between;
  padding: 2.7rem 3rem;
}

.nav-list--li-wrap {
  display: flex;
  justify-content: space-between;
  width: 67rem;
  margin: auto;
}

#nav-list a {
  font-size: 1.8rem;
  text-decoration: none;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#nav-list button {
  width: auto;
  height: auto;
  background: none;
}

#nav-list img {
  width: 5rem;
  border-radius: 0;
}

@media (min-width: 768px) {
  .nav-wrapper {
    display: flex;
    width: 100%;
  }

  #nav-list {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  #nav-list li a,
  #nav-list li button {
    font-size: 2.6rem;
    font-weight: bold;
    line-height: 1;
    padding: 0;
  }

  #nav-list li a:after,
  #nav-list li button:after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: width 0.3s;
  }

  #nav-list li a:hover:after,
  #nav-list li button:hover:after {
    width: 100%;
  }
}
</style>