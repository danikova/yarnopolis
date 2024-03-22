/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "qhppylct1z57sxs",
    "created": "2024-03-22 09:12:36.677Z",
    "updated": "2024-03-22 09:12:36.677Z",
    "name": "yarn_placeholder",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wtmifjmz",
        "name": "manufacturer_name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "vnshijhs",
        "name": "avg_hook_size_min",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "813pmqa1",
        "name": "avg_hook_size_max",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "idozofmp",
        "name": "avg_yarn_size",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
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
      "query": "SELECT\n    m.id AS id,\n    m.name AS manufacturer_name,\n    AVG(y.hook_size_min) AS avg_hook_size_min,\n    AVG(y.hook_size_max) AS avg_hook_size_max,\n    AVG(y.yarn_size) AS avg_yarn_size\nFROM\n    yarns y\nJOIN\n    manufacturers m ON y.manufacturer = m.id\nGROUP BY\n    y.manufacturer;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("qhppylct1z57sxs");

  return dao.deleteCollection(collection);
})
