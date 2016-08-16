import qs from 'querystring';
import settings from '../settings';
import { checkStatus } from './utils';

const TEAM = 'frontenddevelopers';
const API_BASE = `https://${TEAM}.slack.com/api`;
const INVITE_URL = `${API_BASE}/users.admin.invite`;
const CHANNEL_URL = `${API_BASE}/chat.postMessage`;

const generateForm = user => {
  const form = new FormData();
  form.append('t', (new Date).getTime());
  form.append('first_name', user.first_name);
  form.append('last_name', user.last_name);
  form.append('email', user.email);
  form.append('token', user.token);
  form.append('set_active', user.set_active);
  form.append('channels', user.channels);

  return form;
};

export const fetchInvite = user => {
  fetch(INVITE_URL, {
    method: 'POST',
    body: generateForm(user),
  })
    .then(checkStatus)
    .then(res => res.json())
    .then(res => {
      if (!res.ok) { throw new Error(res.error); }
      return res;
    });
};

export const fetchSlackLogging = user => {
  if (settings.bot.reporting.active) {
    const logData = error => qs.stringify({
      token: settings.slack.token,
      username: settings.bot.name,
      channel: settings.bot.reporting.channel,
      text: !!error
        ? `An error has occurred attempting to invite ${user.email}.\n${error}`
        : `${user.name} [${user.email}] has been invited to Frontend Developers.`,
    });

    return fetch(`${CHANNEL_URL}?${logData()}`)
      .catch(err =>
        fetch(`${CHANNEL_URL}?${logData(err.message)}`)
      );
  }
  return Promise.resolve(user);
};
