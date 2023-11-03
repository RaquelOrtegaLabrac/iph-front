import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useTerminals } from "./use.terminals";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../core/store/store";
import userEvent from "@testing-library/user-event";

import { TerminalRepository } from "../../core/services/terminal.repository";

jest.mock("../components/config", () => ({
  url: "",
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

const mockTerminal = {
  inventor: "a",
  name: "name",
  developed: "a",
  shortDescription: "a",
  classification: "Idiophones",
} as unknown as FormData;

describe("Given UseTerminals hook", () => {
  const TestComponent = () => {
    const { handleLoadTerminals, handleCreateTerminal } = useTerminals();
    return (
      <>
        <button onClick={handleLoadTerminals}>handleLoad</button>
        <button onClick={() => handleCreateTerminal(mockTerminal)}>
          handleCreate
        </button>{" "}
      </>
    );
  };

  describe("When it is called", () => {
    let elements: HTMLElement[];
    beforeEach(async () => {
      (TerminalRepository.prototype.getAll = jest.fn()),
        await act(() =>
          render(
            <Router>
              <Provider store={store}>
                <TestComponent></TestComponent>
              </Provider>
            </Router>
          )
        );
    });
    test("Then it should return handleLoadTerminals function", () => {
      elements = screen.getAllByRole("button");
      expect(elements[0]).toBeInTheDocument();
    });
    test("Then...", async () => {
      await act(async () => {
        elements = screen.getAllByRole("button");

        await userEvent.click(elements[0]);
        expect(TerminalRepository.prototype.getAll).toHaveBeenCalled();
      });
    });
    describe("When it is called", () => {
      let elements: HTMLElement[];
      beforeEach(async () => {
        (TerminalRepository.prototype.createTerminal = jest.fn()),
          await act(() =>
            render(
              <Router>
                <Provider store={store}>
                  <TestComponent></TestComponent>
                </Provider>
              </Router>
            )
          );
      });
      test("Then...", async () => {
        await act(async () => {
          elements = screen.getAllByRole("button");

          await userEvent.click(elements[1]);
        });
      });
    });
  });
});
