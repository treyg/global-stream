<template>
  <div>
    <figure>
      <img :src="img_path" alt="" />
      <figcaption>
        <h4>{{ name }}</h4>
        <h5>{{ character }}</h5>
      </figcaption>
    </figure>
  </div>
</template>

<script>
export default {
  name: "CastCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    character: {
      type: String,
      required: true,
    },
    img_path: {
      type: String,
      required: true,
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
