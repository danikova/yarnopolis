/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "in1fyqiezqpgivh",
    "created": "2024-03-05 10:36:38.786Z",
    "updated": "2024-03-05 10:36:38.786Z",
    "name": "pictures",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ccss040m",
        "name": "file",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
        }
      },
      {
        "system": false,
        "id": "oawdjbys",
        "name": "description",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
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
  const collection = dao.findCollectionByNameOrId("in1fyqiezqpgivh");

  return dao.deleteCollection(collection);
})
