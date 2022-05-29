// eslint-disable-next-line import/no-extraneous-dependencies
export default {
  'POST  /api/antdproregister': (_, res) => {
    res.send({
      data: {
        status: 'ok',
        currentAuthority: 'user',
      },
    });
  },
};