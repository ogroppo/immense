import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { act } from "react-dom/test-utils";

test("renders learn react link", () => {
  act(() => {
    render(<App />);
  });
  const linkElement = screen.getByText(/Fleet Management/i);
  expect(linkElement).toBeInTheDocument();
});
