import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Home from "./Home";

describe("App Component", () => {
  test("renders learn react link", () => {
    render(<Home />);
    const linkElement = screen.getByText(/HotSpots/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Home snapshots", () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
