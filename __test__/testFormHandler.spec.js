import { handleSubmit } from "../src/client/js/formHandler";
import { textChecker } from "../src/client/js/nameChecker";

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing the submit functionality", () => {
  test("Testing the textChecker() function that is not able to input number ", () => {
    expect(textChecker("12345")).toBe(false);
  });

  test("Testing the textChecker() function that is able to input text", () => {
    expect(textChecker("I love you")).toBe(true);
  });
  expect(handleSubmit).toBeDefined();
});
