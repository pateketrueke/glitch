process.env.NODE_ENV = process.env.ENVIRONMENT;

const Grown = require('grown')();
const pkg = require('../package');

Grown.use(require('@grown/logger'));
Grown.use(require('@grown/static'));
Grown.use(require('@grown/render'));
Grown.use(require('@grown/tarima'));

module.exports = () => {
  // initialize a new application context
  const server = new Grown();

  server.plug([
    Grown.Logger,
    Grown.Static({
      static_folders: `${process.cwd()}/public`,
    }),
    Grown.Render({
      view_folders: `${__dirname}/templates`,
    }),
    Grown.Tarima({
      src_folders: __dirname,
      bundle_options: {
        frontMatter: false,
        extensions: {
          css: 'less',
          pug: 'js',
          js: 'es6',
        },
        globals: {
          version: pkg.version,
          environment: Grown.env,
        },
      },
    }),
  ]);

  server.on('listen', ctx => {
    const url = ctx.location.href.replace('uws:', 'http:');

    server.logger.printf('{% link Listening at: %} {% yellow %s %}\n', url);
    server.logger.printf('{% log Press CTRL+C to quit... %}\n');
  });

  return server;
};
