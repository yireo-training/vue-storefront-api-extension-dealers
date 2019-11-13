import { apiStatus } from "../../../lib/util";
import { Router } from "express";
import fetch from "node-fetch";

module.exports = ({ config, db }) => {
  let router = Router();
  let graphqlUrl = config.magento2.url + "graphql";

  router.get("/test", (request, response) => {
      return apiStatus(response, graphqlUrl, 200);
  });

  router.get("/getDealers", (request, response) => {
    fetch(graphqlUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          {
            dealers {
              items {
                id
                name
                address
              }
            }
          }
        `
      })
    })
      .then(result => result.json())
      .then(result => apiStatus(response, result.data, 200))
      .catch(error => console.log(error));
  });

  return router;
};
