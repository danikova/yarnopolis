/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("clhvwm3pshl7gog");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "clhvwm3pshl7gog",
    "created": "2024-03-10 09:04:09.068Z",
    "updated": "2024-03-10 09:05:39.715Z",
    "name": "yarn_codes",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kpcsode4",
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
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT\n    id,\n    code\nFROM\n    yarns\nWHERE\n    code IS NOT NULL AND code != ''\nGROUP BY\n    code;"
    }
  });

  return Dao(db).saveCollection(collection);
})
