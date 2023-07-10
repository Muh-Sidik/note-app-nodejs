const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const NoteService = require('./services/inMemory/NotesService');

const init = async () => {
  const noteService = new NoteService();
  const server = Hapi.server({
    host: process.env.APP_MODE !== 'production' ? 'localhost' : '0.0.0.0',
    port: process.env.APP_PORT ?? 9000,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: { service: noteService },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
