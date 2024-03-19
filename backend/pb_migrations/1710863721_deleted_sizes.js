/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("aoobgr7rdr2n5mw");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "aoobgr7rdr2n5mw",
    "created": "2024-03-05 12:03:18.972Z",
    "updated": "2024-03-05 17:01:38.590Z",
    "name": "sizes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wpoelc9g",
        "name": "value",
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
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
