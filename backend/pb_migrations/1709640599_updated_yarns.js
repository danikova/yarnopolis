/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oxl3iu361sqq3lb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gcv6h07m",
    "name": "size",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "aoobgr7rdr2n5mw",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oxl3iu361sqq3lb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gcv6h07m",
    "name": "size",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "aoobgr7rdr2n5mw",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
