import { createServer } from "node:http";

const server = createServer((request, response) => {
  const result = { location: "Mars" };
  console.log("request received");

  response.statusCode = 200;

  response.setHeader("Content-Type", "application/json");
  response.setHeader("Content-Length", JSON.stringify(result).length);

  response.end(JSON.stringify(result));
});

server.listen(3000, () => {
  console.log("il server è partito");
});
