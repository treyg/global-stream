import { Client } from "@notionhq/client";
//import { get } from "core-js/core/dict";

const notion = new Client({
  auth: process.env.NOTION_INTEGRATION_TOKEN,
  notionVersion: "2021-05-13",
});

//function to get types for show/movie
// async function getTypes() {
//   const database = await notion.databases.retrieve({
//     database_id: process.env.NOTION_DATABASE_ID,
//   });
//   return notionPropertiesById(database.properties)[
//     process.env.NOTION_TYPES
//   ].multi_select.options.map((option) => {
//     return { id: option.id, name: option.name };
//   });
// }

// // function to get properties for type
// function notionPropertiesById(properties) {
//   return Object.values(properties).reduce((obj, property) => {
//     const { id, ...rest } = property;
//     return { ...obj, [id]: rest };
//   }, {});
// }

async function getDatabase() {
  const response = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID,
  });
  console.log(response);
}


//function to build push new tile to notion
function createWatchSuggestion({ title, summary, isWatched, media_type, link }) {
  notion.pages.create({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID,
    },
    properties: {
      [process.env.NOTION_TITLE]: {
        title: [
          {
            type: "text",
            text: {
              content: title,
            },
          },
        ],
      },
      [process.env.NOTION_SUMMARY]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: summary,
            },
          },
        ],
      },
      [process.env.NOTION_MEDIA_TYPE]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: media_type,
            },
          },
        ],
      },
      [process.env.NOTION_STATUS]: {
        checkbox: isWatched,
      },
      [process.env.NOTION_LINK]: {
        url: link,
      },
      // [process.env.NOTION_TYPES]: {
      //   multi_select: types.map((types) => {
      //     return {
      //       id: types.id,
      //       name: types.name,
      //     };
      //   }),
      // },
    },
  });
}
export { createWatchSuggestion, getDatabase };
//Function to get all suggestions from notion
// async function getSuggestions() {
//   const notionPages = await notion.databases.query({
//     database_id: process.env.NOTION_DATABASE_ID,
//     sorts: [{ property: process.env.NOTION_TITLE, direction: "ascending" }],
//   });

//   return notionPages.map(fromNotionObject);
// }

// function fromNotionObject(notionPage) {
//   const notionPropertiesById = notionPropertiesById(notionPage.properties);

//   return {
//     //id: notionPage.id,
//     title: notionPropertiesById[process.env.NOTION_TITLE].title[0].text.content,
//     summary: notionPropertiesById[process.env.NOTION_SUMMARY].rich_text[0].text.content,
//     isWatched: notionPropertiesById[process.env.NOTION_STATUS].checkbox,
//     media_type: notionPropertiesById[process.env.NOTION_MEDIA_TYPE].rich_text[0].text.content,
//     link: notionPropertiesById[process.env.NOTION_LINK].url,
//   };

// }


// export { createWatchSuggestion, getDatabase, getSuggestions };
