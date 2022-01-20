<template>
  <section><h3>Notion Area</h3></section>
</template>

<script>
//import { Client } from "@notionhq/client";

export default {
  name: "Notion",
  data() {
    return {
      apiURL: "http://localhost:3000/",
      restults: [],
    };
  },
  methods: {
    // async getDB() {
    //   const notion = new Client({
    //     auth: process.env.VUE_APP_NOTION_INTEGRATION_TOKEN,
    //     notionVersion: "2021-05-13",
    //   });
    //   const response = await notion.databases.retrieve({
    //     database_id: this.databaseId,
    //   });
    //   console.log(response);
    // },
    getNotionAPI() {
      fetch(this.apiURL)
        .then((response) => response.json())
        .then((data) => {
          this.restults = data;
          console.log(this.restults);
        });
    },
  },
  created() {
    this.getNotionAPI();
  },
};
</script>
