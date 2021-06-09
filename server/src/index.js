const app = require("./app");

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`server running on ${port}`)
});

server.setTimeout(3000);