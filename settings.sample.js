// server settings
// in production set keys and secrets in env
// and use e.g. `process.env.MY_API_KEY` to get access to them
export default {
  server: {
    host: '0.0.0.0',
    port: 8049,
    proxyHost: '0.0.0.0',
    proxyPort: 8050,
  },
  auth: {
    slack: process.env.SLACK_API_KEY,
  },
  slack: {
    // channel id for invited user to join
    inviteChannel: '',
  },
  db: {
    // the name of the database to use
    name: '',
  },
  bot: {
    name: 'Steve',
    reporting: {
      active: false,
      channel: '', // channel id to report in
    },
  },
};
