import rethink from 'rethinkdbdash';

const r = rethink().table('users');

export const saveUser = user => r.insert({
  ...user,
}).run();
