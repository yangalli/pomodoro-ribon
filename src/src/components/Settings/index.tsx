import React from "react";
import "./styles.css";

type Props = {
  breakLength: number;
  sessionLength: number;
  isStart: boolean;
  onDecreaseBreak: () => void;
  onDecreaseSession: () => void;
  onIncreaseBreak: () => void;
  onIncreaseSession: () => void;
};

export default function Settings({
  breakLength,
  sessionLength,
  isStart,
  onDecreaseBreak,
  onDecreaseSession,
  onIncreaseBreak,
  onIncreaseSession,
}: Props) {
  const btnClassName = isStart ? "disable" : "";

  return (
    <div className="settings">
      <div className="settings-section">
        <label id="break-label">Break Length</label>
        <div>
          <button
            className={btnClassName}
            id="break-decrement"
            onClick={onDecreaseBreak}
          >
            -
          </button>
          <span id="break-length">{breakLength}</span>
          <button
            className={btnClassName}
            id="break-increment"
            onClick={onIncreaseBreak}
          >
            +
          </button>
        </div>
      </div>
      <div className="settings-section">
        <label id="session-label">Session Length</label>
        <div>
          <button
            className={btnClassName}
            id="session-decrement"
            onClick={onDecreaseSession}
          >
            -
          </button>
          <span id="session-length">{sessionLength}</span>
          <button
            className={btnClassName}
            id="session-increment"
            onClick={onIncreaseSession}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
