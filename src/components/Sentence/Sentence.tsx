import React from "react";

interface Props {
    sentence: string;
    input: string;
}

const Sentence: React.FC<Props> = ({ sentence, input }) => {
    const sentenceWords = sentence.split(" ");
    const inputWords = input.split(" ");

    return (
        <div className='sentence' data-testid='sentence'>
            {sentenceWords.map((word, index) => {
                let color = "white";
                if (inputWords[index] === word) {
                    color = "green";
                } else if (inputWords[index] && inputWords[index] !== word) {
                    color = "red";
                }
                return (
                    <span
                        key={index}
                        style={{
                            color,
                            marginRight: "0.25rem",
                            whiteSpace: "pre"
                        }}
                    >
                        {word}
                    </span>
                );
            })}
        </div>
    );
};

export default Sentence;
