/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ztg09v37xqbt51w",
    "created": "2024-03-05 10:38:22.070Z",
    "updated": "2024-03-05 10:38:22.070Z",
    "name": "yarn_types",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qv5vpzec",
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
  const collection = dao.findCollectionByNameOrId("ztg09v37xqbt51w");

  return dao.deleteCollection(collection);
})
