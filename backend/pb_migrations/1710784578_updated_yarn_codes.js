/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("msyi2qxjy2q3cue")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "656hoqut",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("msyi2qxjy2q3cue")

  // remove
  collection.schema.removeField("656hoqut")

  return dao.saveCollection(collection)
})
