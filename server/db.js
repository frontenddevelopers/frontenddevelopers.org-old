import rethink from 'rethinkdbdash';
import moment from 'moment';
import settings from '../settings';

const r = rethink({ db: settings.db.name, silent: true });

export const getUserByEmail = search =>
  r.table('users')
    .getAll(search, { index: 'email' })
    .nth(0)
    .default(null)
    .run();

export const createUser = ({
  email,
  name,
  about,
  reference,
}) =>
  r.table('users').insert({
    email,
    name,
    about,
    reference,
    createdAt: moment().format(),
  }, { returnChanges: true });
