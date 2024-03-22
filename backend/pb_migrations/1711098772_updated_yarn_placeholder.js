/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qhppylct1z57sxs")

  collection.name = "yarn_averages"

  // remove
  collection.schema.removeField("wtmifjmz")

  // remove
  collection.schema.removeField("vnshijhs")

  // remove
  collection.schema.removeField("813pmqa1")

  // remove
  collection.schema.removeField("idozofmp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wwgk8qjw",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bbirzmq3",
    "name": "avg_hook_size_min",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "18okfhsk",
    "name": "avg_hook_size_max",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cyyj4fug",
    "name": "avg_yarn_size",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qhppylct1z57sxs")

  collection.name = "yarn_placeholder"

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("wwgk8qjw")

  // remove
  collection.schema.removeField("bbirzmq3")

  // remove
  collection.schema.removeField("18okfhsk")

  // remove
  collection.schema.removeField("cyyj4fug")

  return dao.saveCollection(collection)
})
