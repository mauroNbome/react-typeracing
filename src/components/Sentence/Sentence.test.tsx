import { render, screen } from "@testing-library/react";
import Sentence from "./Sentence";

test("renders sentence with highlighted text", () => {
    const sentence = "The quick brown fox jumps over the lazy dog.";
    const input = "The quick brown";
    const inputWords = input.split(" ");

    render(<Sentence sentence={sentence} input={input} />);

    sentence.split(" ").forEach((word, index) => {
        const expectedColor =
            index < inputWords.length && word === inputWords[index]
                ? "green"
                : "white";
        const elements = screen.getAllByText(word);
        let found = false;

        for (const element of elements) {
            if (element.style.color === expectedColor) {
                found = true;
                break;
            }
        }

        expect(found).toBeTruthy();
    });
});
