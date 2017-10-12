const Grown = require('grown');

const env = process.env.ENVIRONMENT || process.env.NODE_ENV || 'development';
const cwd = process.cwd();

Grown.env(cwd);

module.exports = () => {
  // initialize a new application context
  const app = new Grown({ env, cwd });

  // rendering support
  app.use(Grown.plugs.render({
    folders: `${cwd}/lib/templates`,
  }));

  // static sources
  app.use(Grown.plugs.static({
    folders: `${cwd}/public`,
  }));

  // dynamic sources
  app.use(Grown.plugs.tarima({
    frontMatter: false,
    extensions: {
      css: 'less',
      pug: 'js',
    },
  }));

  // this mount-point will render pages (and assets) directly, e.g
  // `/example` (address bar) => `pages/example.js` (file explorer)
  app.mount(conn => {
    // take the page-identifier from the requested page
    const section = conn.request_path.replace(/^\//, '') || 'index';

    // for other assets, just render as-is
    if (/\.(js|css)$/.test(section)) {
      return conn.tarima(`${cwd}/lib/assets/${section}`)
        .then(source => {
          conn.put_resp_content_type(section.indexOf('.css') === 0 ? 'application/javascript' : 'text/css');
          conn.put_resp_header('Content-Length', source.length);
          conn.resp_body = source;
          conn.layout = false;
          conn.end();
        });
    }

    // skip extensions
    if (!/\.\w+$/.test(section)) {
      return conn.tarima(`${cwd}/lib/content/${section}`)
        .then(partial => {
          // set the page/title to be rendered
          conn.view(partial.render, { as: 'body' });

          conn.set_state('title', partial.title);
          conn.set_state('version', Grown.version);
          conn.set_state('environment', app.config('env'));

          // assign the final layout
          return conn.tarima(`${cwd}/lib/templates/${partial.layout || 'default'}`)
            .then(layout => {
              conn.layout = layout.render;
            });
        });
    }
  });

  return app;
};

// export framework version and teardown
module.exports.version = Grown.version;
module.exports.teardown = cb => Grown.burn(cb);
