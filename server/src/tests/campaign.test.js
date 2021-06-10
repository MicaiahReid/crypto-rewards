const request = require("supertest");
const app = require("../app");

describe("Get Campaign", () => {
  it("should get all the campaigns", async () => {
    const endpoint = "/api/campaign";
    const response = await request(app).get(endpoint);
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
  });
});