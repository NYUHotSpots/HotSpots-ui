import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "./App";

describe("App Component", () => {
  test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/HotSpots/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("snapshots", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
