import React from "react";
import "./styles.css";

type Props = {
  onStartStop: () => void;
  isStart: boolean;
  onReset: () => void;
};

export default function Controller({ onStartStop, isStart, onReset }: Props) {
  return (
    <div className="controller">
      <button id="start_stop" onClick={onStartStop}>
        {isStart ? "Stop" : "Start"}
      </button>
      <button id="reset" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}
