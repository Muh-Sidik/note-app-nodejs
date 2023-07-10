const notesPlugin = {
  name: 'notes',
  version: '0.0.1',
  register: async (server, options) => {
    const { notes } = options;

    server.route([
      {
        method: 'GET',
        path: '/notes',
        handler: async () => notes,
      },
    ]);
  },
};

module.exports = notesPlugin;
