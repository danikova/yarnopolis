/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("in1fyqiezqpgivh")

  // remove
  collection.schema.removeField("oawdjbys")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("in1fyqiezqpgivh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oawdjbys",
    "name": "description",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
})
