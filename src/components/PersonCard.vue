<template>
  <article>
    <router-link :to="{ name: 'PersonShow', params: { id: id, lang: lang } }">
      <figure>
        <img :src="img_path" alt="" />
        <figcaption>
          <h4>{{ name }}</h4>
          <h5>{{ character }}</h5>
        </figcaption>
      </figure>
    </router-link>
    <div class="more-info">
      <p>{{ bio }}</p>
    </div>
  </article>
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
  },
};
</script>

<style scoped>
figure {
  margin: 0;
}

h4 {
  font-size: 3em;
  margin: 0.5em 0 0.2em 0;
  line-height: 1.2;
}

h5 {
  font-size: 2em;
  margin: 0;
  font-style: italic;
}
</style>
