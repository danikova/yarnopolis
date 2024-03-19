/// <reference path="../pb_data/types.d.ts" />
migrate(db => {
  const dao = new Dao(db);
  const yarns = dao.findRecordsByFilter('yarns', 'code = null || code = ""');
  // console.log('yarns length with empty code:', yarns.length);

  for (const yarn of yarns) {
    if (yarn.get('code_old')) {
      const yarn_code = dao.findRecordById('yarn_codes', yarn.get('code_old'));
      yarn.set('code', yarn_code.get('name'));
      dao.saveRecord(yarn);
    }
  }
});
