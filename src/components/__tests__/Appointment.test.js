import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Application />);
  });
  //x is for skip the test
  xit("does something it is supposed to do", () => {
    // ...
  });

  xit("does something else it is supposed to do", () => {
    // ...
  });
});