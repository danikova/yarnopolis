/// <reference path="../pb_data/types.d.ts" />
migrate(db => {
  const dao = new Dao(db);
  const yarns = dao.findRecordsByFilter('yarns', 'hook_size_min = 0');
  console.log('yarns:', JSON.stringify(yarns, null, 2));

  function findSizesRecord(id) {
    try {
      return dao.findRecordById('sizes', id);
    } catch (e) {
      console.log('Error finding size record:', id);
      return null;
    }
  }

  for (const yarn of yarns) {
    const hook_sizes = yarn.get('hook_size_rel').map(hookSizeId => {
      return findSizesRecord(hookSizeId);
    });
    const hook_size_min = Math.min(
      ...hook_sizes.map(hook_size => hook_size.get('value'))
    );
    const hook_size_max = Math.max(
      ...hook_sizes.map(hook_size => hook_size.get('value'))
    );
    const yarn_size = findSizesRecord(yarn.get('yarn_size_rel')).get('value');
    if (hook_size_min) {
      yarn.set('hook_size_min', hook_size_min);
    }
    if (hook_size_max) {
      yarn.set('hook_size_max', hook_size_max);
    }
    if (yarn_size) {
      yarn.set('yarn_size', yarn_size);
    }
    console.log(
      'yarn:',
      yarn.get('id'),
      'hook_size_min:',
      hook_size_min,
      'hook_size_max:',
      hook_size_max,
      'yarn_size:',
      yarn_size
    );
    dao.saveRecord(yarn);
  }
});
