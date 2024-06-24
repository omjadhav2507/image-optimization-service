const request = require("supertest");
const app = require("./server");
const path = require("path");

describe("Image Optimization Service", () => {
  it("should optimize the image and return it in the specified format", async () => {
    const response = await request(app)
      .post("/optimize")
      .auth("admin", "password")
      .attach("image", path.resolve(__dirname, "test/email.png"))
      .query({ format: "webp", width: 800, quality: 80 });

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("image/webp");
  });

  it("should return 400 if no file is uploaded", async () => {
    const response = await request(app)
      .post("/optimize")
      .auth("admin", "password");

    expect(response.status).toBe(400);
    expect(response.text).toBe("No file uploaded.");
  });

  it("should return 400 for unsupported format", async () => {
    const response = await request(app)
      .post("/optimize")
      .auth("admin", "password")
      .attach("image", path.resolve(__dirname, "test/email.png"))
      .query({ format: "unsupported_format" });

    console.log(response.status, response.text);

    expect(response.status).toBe(400);
    expect(response.text).toContain("Invalid format");
  });
});
