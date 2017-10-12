const Grown = require('grown');

const env = process.env.ENVIRONMENT || process.env.NODE_ENV || 'development';
const cwd = process.cwd();

Grown.env(cwd);

module.exports = () => {
  // initialize a new application context
  const app = new Grown({ env, cwd });

  // rendering support
  app.use(Grown.plugs.render({
    folders: `${cwd}/src/templates`,
  }));

  // static sources
  app.use(Grown.plugs.static({
    folders: `${cwd}/public`,
  }));

  // dynamic sources
  app.use(Grown.plugs.tarima({
    bundleOptions: {
      frontMatter: false,
      extensions: {
        css: 'less',
        pug: 'js',
      },
    },
  }));

  return app;
};

// export framework version and teardown
module.exports.version = Grown.version;
module.exports.teardown = cb => Grown.burn(cb);
