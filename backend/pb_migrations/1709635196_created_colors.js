/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "2dju7mcio5vaeyy",
    "created": "2024-03-05 10:39:56.271Z",
    "updated": "2024-03-05 10:39:56.271Z",
    "name": "colors",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "q82f0sbl",
        "name": "hue",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "tob5jeij",
        "name": "saturation",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "kgk4cdeo",
        "name": "lightness",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2dju7mcio5vaeyy");

  return dao.deleteCollection(collection);
})
