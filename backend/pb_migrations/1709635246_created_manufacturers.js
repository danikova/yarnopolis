/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ftjzdom1g06kj9q",
    "created": "2024-03-05 10:40:46.815Z",
    "updated": "2024-03-05 10:40:46.815Z",
    "name": "manufacturers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "eswm6tre",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("ftjzdom1g06kj9q");

  return dao.deleteCollection(collection);
})
