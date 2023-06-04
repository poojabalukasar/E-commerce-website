const webpack = require("webpack");

module.exports = {
  // other configuration options
  devServer: {
    // other devServer options
    setupMiddlewares: (devServer) => {
      // Add your middleware logic here
      devServer.app.use(function (req, res, next) {
        console.log(req.method, req.url);
        next();
      });
    },
  },
  plugins: [
    // other plugins
    new webpack.LoaderOptionsPlugin({
      // suppresses warnings about deprecated options
      options: {
        onAfterSetupMiddleware: () => {
          console.log("Middleware setup complete.");
        },
        onBeforeSetupMiddleware: (devServer) => {
          console.log("Middleware is starting to set up.");
        },
      },
    }),
  ],
};
