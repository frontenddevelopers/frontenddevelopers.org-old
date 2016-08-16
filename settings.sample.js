export default {
  auth: {
    slack: process.env.SLACK_TOKEN || null,
  },
  bot: {
    name: 'Steve',
    reporting: {
      active: false,
      channel: '',
    },
  },
};
