import React from "react";
import "./styles.css";

type Props = {
  timeLabel: string;
  timeLeftInSecond: number;
};

const formatTime = (timeLeftInSecond: number) => {
  let minute: number = Math.floor(timeLeftInSecond / 60);
  let stringMinute: string = minute.toString();
  if (minute < 10) stringMinute = "0" + minute;

  let second: number = timeLeftInSecond - 60 * minute;
  let stringSecond: string = second.toString();
  if (second < 10) stringSecond = "0" + second;

  return `${stringMinute}:${stringSecond}`;
};

export default function Times({ timeLabel, timeLeftInSecond }: Props) {
  return (
    <div className="times">
      <div className="times-content">
        <label id="timer-label">{timeLabel}</label>
        <span id="time-left">{formatTime(timeLeftInSecond)}</span>
      </div>
    </div>
  );
}
