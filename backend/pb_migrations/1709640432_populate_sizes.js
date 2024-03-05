/// <reference path="../pb_data/types.d.ts" />
migrate(db => {
  const dao = new Dao(db);

  const collection = dao.findCollectionByNameOrId('sizes');

  for (let i = 0.5; i <= 12.0; i += 0.5) {
    const record = new Record(collection);
    record.set('value', i);
    dao.saveRecord(record);
  }
});
