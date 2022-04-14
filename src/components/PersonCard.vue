<template>
  <main class="person-card">
    <article>
      <router-link :to="{ name: 'PersonShow', params: { id: id } }">
        <figure>
          <img :src="img_path" alt="" />
          <figcaption>
            <h4>{{ name }}</h4>
            <h5>{{ character }}</h5>
          </figcaption>
        </figure>
      </router-link>
    </article>
  </main>
</template>

<script>
export default {
  name: "PersonCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    character: {
      type: String,
    },
    img_path: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: false,
    },
    bio: {
      type: String,
    },
    combined_credits: {
      type: Object,
    },
  },
};
</script>

<style scoped>
article {
  padding: 0;
}

figure {
  margin: 0;
}

a {
  text-decoration: none;
}

h4 {
  font-size: 3em;
  margin: 0.5em 0 0.2em 0;
  line-height: 1.2;
  color: var(--text-primary);
  text-decoration: none;
}

h5 {
  font-size: 2em;
  margin: 0;
  font-style: italic;
  color: var(--text-primary);
  text-decoration: none;
}
</style>
