/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("clhvwm3pshl7gog")

  collection.options = {
    "query": "SELECT\n    id,\n    code\nFROM\n    yarns\nWHERE\n    code IS NOT NULL AND code != ''\nGROUP BY\n    code;"
  }

  // remove
  collection.schema.removeField("rt5fvt67")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("clhvwm3pshl7gog")

  collection.options = {
    "query": "SELECT\n    id,\n    MIN(created) AS created,\n    MAX(updated) AS updated,\n    code\nFROM\n    yarns\nGROUP BY\n    code;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rt5fvt67",
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
  collection.schema.removeField("kpcsode4")

  return dao.saveCollection(collection)
})
