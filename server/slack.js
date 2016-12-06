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
  if (user.firstName) {
    form.append('first_name', user.firstName);
  }
  if (user.lastName) {
    form.append('last_name', user.lastName);
  }
  form.append('email', user.email);
  form.append('token', settings.auth.slack);
  form.append('channels', settings.slack.inviteChannel);

  return form;
};

export const fetchInvite = user =>
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

export const fetchSlackLogging = user => {
  if (settings.bot.reporting.active) {
    const logData = error => qs.stringify({
      token: settings.auth.slack,
      username: settings.bot.name,
      channel: settings.bot.reporting.channel,
      text: !!error
        ? `An error has occurred attempting to invite ${user.email}.\n\n${error}`
        : `${user.firstName} ${user.lastName} [${user.email}] has been invited.`,
    });

    return fetch(`${CHANNEL_URL}?${logData()}`)
      .catch(err =>
        fetch(`${CHANNEL_URL}?${logData(err.message)}`)
      );
  }
  return Promise.resolve(user);
};
