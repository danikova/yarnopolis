/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "oxl3iu361sqq3lb",
    "created": "2024-03-05 10:42:04.466Z",
    "updated": "2024-03-05 10:42:04.466Z",
    "name": "yarns",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fiiv5ruk",
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
      },
      {
        "system": false,
        "id": "r2qz8ohl",
        "name": "diameter",
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
        "id": "da06uoyj",
        "name": "type",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "ztg09v37xqbt51w",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "2hj0twib",
        "name": "pictures",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "in1fyqiezqpgivh",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "nso4takh",
        "name": "color",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "2dju7mcio5vaeyy",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "amtwtmqa",
        "name": "manufacturer",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "ftjzdom1g06kj9q",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
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
  const collection = dao.findCollectionByNameOrId("oxl3iu361sqq3lb");

  return dao.deleteCollection(collection);
})
