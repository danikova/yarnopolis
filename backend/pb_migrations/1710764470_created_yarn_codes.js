/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "msyi2qxjy2q3cue",
    "created": "2024-03-18 12:21:10.512Z",
    "updated": "2024-03-18 12:21:10.512Z",
    "name": "yarn_codes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "odidibgu",
        "name": "code",
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
  const collection = dao.findCollectionByNameOrId("msyi2qxjy2q3cue");

  return dao.deleteCollection(collection);
})
