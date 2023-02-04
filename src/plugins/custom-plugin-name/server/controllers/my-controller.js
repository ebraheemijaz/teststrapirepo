'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('custom-plugin-name')
      .service('myService')
      .getWelcomeMessage();
  },
});
