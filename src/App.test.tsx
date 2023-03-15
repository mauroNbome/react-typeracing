import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

describe("App component", () => {
    test("renders without crashing", () => {
        render(<App />);
    });

    test("renders Sentence, InputBox, and Timer components", () => {
        render(<App />);
        expect(screen.getByText(/Typing Race App/i)).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(screen.getByText(/Time: 0 seconds/i)).toBeInTheDocument();
    });

    test("starts the game and countdown", async () => {
        render(<App />);
        const startButton = screen.getByRole("button", { name: /start/i });
        fireEvent.click(startButton);

        await waitFor(
            () => {
                const countdownElement = screen.getByTestId("countdown");
                expect(countdownElement.textContent).toContain("Countdown: 1");
            },
            { timeout: 4000 }
        );
    });

    test("input change and matching logic", async () => {
        const { container } = render(<App />);
        const startButton = screen.getByRole("button", { name: /start/i });
        fireEvent.click(startButton);

        await waitFor(
            () => {
                const countdownElement = screen.getByTestId("countdown");
                expect(countdownElement.textContent).toContain("Countdown: 1");
            },
            { timeout: 4000 }
        );

        const inputElement = container.querySelector("input");
        if (inputElement) {
            fireEvent.change(inputElement, { target: { value: "Test" } });
            expect(inputElement.value).toBe("Test");
        } else {
            fail("Input element not found");
        }
    });
});
