import { server } from "../../services/axios";

const EXPECT_URL = "https://swapi-trybe.herokuapp.com/api";
const EXPECT_TIMEOUT = 1000;

describe("Axios settings are working as expected", () => {
  it("should contain the expected values ​​in base URL and timeout", () => {
    expect(server.defaults.baseURL).toBe(EXPECT_URL);
    expect(server.defaults.timeout).toBe(EXPECT_TIMEOUT);
  });
});
