import React from "react";

interface Props {
    timer: number;
}

const Timer: React.FC<Props> = ({ timer }) => {
    return <p>Time: {timer} seconds</p>;
};

export default Timer;
