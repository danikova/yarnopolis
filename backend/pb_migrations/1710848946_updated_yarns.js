/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oxl3iu361sqq3lb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k1yqdwzg",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oxl3iu361sqq3lb")

  // remove
  collection.schema.removeField("k1yqdwzg")

  return dao.saveCollection(collection)
})
