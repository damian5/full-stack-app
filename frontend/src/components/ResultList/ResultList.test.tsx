import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { ResultList } from "./ResultList";
import "@testing-library/jest-dom/vitest";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("ResultList", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("shows empty state message when not searching and list is empty", () => {
    renderWithRouter(
      <ResultList result={{ list: [], type: "people" }} searching={false} />
    );
    expect(screen.getByText(/there are zero matches/i)).toBeInTheDocument();
  });
});
