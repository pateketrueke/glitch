process.env.NODE_ENV = process.env.ENVIRONMENT;

const Grown = require('@grown/grown')();

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
        },
        globals: {
          version: Grown.version,
          environment: Grown.env,
        },
      },
    }),
  ]);

  server.on('listen', ctx => {
    server.logger.printf('{% link Listening at: %} {% yellow %s %}\n', ctx.location.href);
    server.logger.printf('{% log Press CTRL+C to quit... %}\n');
  });
  
  console.log(process.env);

  return server;
};
