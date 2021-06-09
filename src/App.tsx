import React, { useState } from "react";
import "./App.css";
import Settings from "./src/components/Settings";
import Times from "./src/components/Times";
import Controller from "./src/components/Controller";

function App() {
  const DEFAULT_BREAK_LENGTH: string = "10";
  const DEFAULT_SESSION_LENGTH: string = "50";

  const [breakLength, setBreakLength] = useState<number>(
    parseTime(DEFAULT_BREAK_LENGTH)
  );
  const [sessionLength, setSessionLength] = useState<number>(
    parseTime(DEFAULT_SESSION_LENGTH)
  );
  const [timeLabel, setTimeLabel] = useState<"Session" | "Break">("Session");
  const [timeLeftInSecond, setTimeLeftInSecond] = useState<number>(
    parseTime(DEFAULT_SESSION_LENGTH) * 60
  );
  const [isStart, setIsStart] = useState<boolean>(false);
  const [timerInterval, setTimerInterval] =
    useState<NodeJS.Timeout | null>(null);

  const audioBeep: React.RefObject<HTMLMediaElement> | null =
    React?.createRef();

  function parseTime(time: string) {
    return Number.parseInt(time, 10);
  }

  function onIncreaseBreak() {
    if (breakLength < 60 && !isStart) {
      setBreakLength(breakLength + 1);
    }
  }

  function onDecreaseBreak() {
    if (breakLength > 1 && !isStart) {
      setBreakLength(breakLength - 1);
    }
  }

  function onIncreaseSession() {
    if (sessionLength < 60 && !isStart) {
      setSessionLength(sessionLength + 1);
      setTimeLeftInSecond((sessionLength + 1) * 60);
    }
  }

  function onDecreaseSession() {
    if (sessionLength > 1 && !isStart) {
      setSessionLength(sessionLength - 1);
      setTimeLeftInSecond((sessionLength - 1) * 60);
    }
  }

  function onReset() {
    setBreakLength(parseTime(DEFAULT_BREAK_LENGTH));
    setSessionLength(parseTime(DEFAULT_SESSION_LENGTH));
    setTimeLabel("Session");
    setTimeLeftInSecond(parseTime(DEFAULT_SESSION_LENGTH) * 60);
    setIsStart(false);
    setTimerInterval(null);

    audioBeep?.current?.pause();
    audioBeep!.current!.currentTime = 0;
    timerInterval && clearInterval(timerInterval);
  }

  function onStartStop() {
    if (!isStart) {
      setIsStart(!isStart);
      if (timeLeftInSecond > 0) {
        setTimerInterval(
          setInterval(() => {
            decreaseTimer();
            phaseControl();
          }, 1000)
        );
      }
    } else {
      audioBeep?.current?.pause();
      audioBeep!.current!.currentTime = 0;
      timerInterval && clearInterval(timerInterval);

      setIsStart(!isStart);
      setTimerInterval(null);
    }
  }

  function decreaseTimer() {
    setTimeLeftInSecond(timeLeftInSecond - 1);
  }

  function phaseControl() {
    if (timeLeftInSecond === 0) {
      audioBeep?.current?.play();
    } else if (timeLeftInSecond === -1) {
      if (timeLabel === "Session") {
        setTimeLabel("Break");
        setTimeLeftInSecond(breakLength * 60);
      } else {
        setTimeLabel("Session");
        setTimeLeftInSecond(sessionLength * 60);
      }
    }
  }

  return (
    <div className="pomodoro-clock">
      <div className="pomodoro-clock-header">
        <h1 className="pomodoro-clock-header-name">Pomodoro Ribon</h1>
      </div>

      <Settings
        breakLength={breakLength}
        sessionLength={sessionLength}
        isStart={isStart}
        onDecreaseBreak={onDecreaseBreak}
        onDecreaseSession={onDecreaseSession}
        onIncreaseBreak={onIncreaseBreak}
        onIncreaseSession={onIncreaseSession}
      />

      <Times timeLabel={timeLabel} timeLeftInSecond={timeLeftInSecond} />

      <Controller
        onReset={onReset}
        onStartStop={onStartStop}
        isStart={isStart}
      />

      <audio
        id="beep"
        preload="auto"
        src="https://goo.gl/65cBl1"
        ref={audioBeep}
      ></audio>
    </div>
  );
}

export default App;
