import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_INTEGRATION_TOKEN,
  notionVersion: "2021-05-13",
});

async function getTypes() {
  const database = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID,
  });
  return notionPropertiesById(database.properties)[
    process.env.NOTION_TYPES
  ].multi_select.options.map((option) => {
    return { id: option.id, name: option.name };
  });
}

function notionPropertiesById(properties) {
  return Object.values(properties).reduce((obj, property) => {
    const { id, ...rest } = property;
    return { ...obj, [id]: rest };
  }, {});
}

function createWatchSuggestion({ title, summary, isWatched, url, types }) {
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
      [process.env.NOTION_STATUS]: {
        checkbox: isWatched,
      },
      [process.env.NOTION_LINK]: {
        url: url,
      },
      [process.env.NOTION_TYPES]: {
        multi_select: types.map((types) => {
          return {
            id: types.id,
            //name: type.name,
          };
        }),
      },
    },
  });
}

module.exports = {
  createWatchSuggestion,
  getTypes,
};

// getTypes().then((types) => {
//   createWatchSuggestion({
//     title: "Test Suggestion",
//     summary: "Hello world",
//     isWatched: false,
//     url: "https://www.google.com",
//     types: types,
//   });
// });
