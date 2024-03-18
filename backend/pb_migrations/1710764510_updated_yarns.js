/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oxl3iu361sqq3lb")

  // remove
  collection.schema.removeField("n3y6xyse")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vkox2xko",
    "name": "code",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "msyi2qxjy2q3cue",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oxl3iu361sqq3lb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n3y6xyse",
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
  }))

  // remove
  collection.schema.removeField("vkox2xko")

  return dao.saveCollection(collection)
})
