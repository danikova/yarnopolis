/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oxl3iu361sqq3lb")

  // remove
  collection.schema.removeField("gcv6h07m")

  // remove
  collection.schema.removeField("xyinpyk0")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oxl3iu361sqq3lb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gcv6h07m",
    "name": "hook_size_rel",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xyinpyk0",
    "name": "yarn_size_rel",
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
