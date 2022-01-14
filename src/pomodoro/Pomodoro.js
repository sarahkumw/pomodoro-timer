import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import SetTime from "../pomodoro/SetTime";
import ActiveSession from "../pomodoro/ActiveSession"



function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

function nextSession(focusDuration, breakDuration) {
  return (currentSession) => {
    //added duration key to each session object for session total time
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        duration: breakDuration,
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      duration: focusDuration,
      timeRemaining: focusDuration * 60,
    };
  };
}



function Pomodoro() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [session, setSession] = useState(null);
  //change the state of valueBar percent
  const [valueBar, setValueBar] = useState(0)
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  //stop button disabler
  const [buttonDisabled, setButtonDisabled] = useState(true);
  //+ and - button disabler
  const [buttonEnabled, setButtonEnabled] = useState(false);
  
  
  //stop button clears the session and sets buttons back to initial state
  function stopSession() {
    if (session != null) {
      setSession(null);
      setIsTimerRunning(false);
      setButtonDisabled(true);
      setButtonEnabled(false);
    }
    return session
  }
  

  useInterval(() => {
      //update valueBar value each time timeRemaining updates
      let progress = (((session.duration*60)-session.timeRemaining)/(session.duration*60)) * 100;
      setValueBar(progress);
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    //enable stop and disable + -
    setButtonDisabled(false);
    setButtonEnabled(true);
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              duration: focusDuration,
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

//created SetTime component which creates break/focus increase/decrease buttons
//stop button has disabledButton prop and stopsession function
//created ActiveSession component which displays the time and value bar when there is an active session or else returns null

  return (
    <div className="pomodoro">
      <SetTime focusDuration={focusDuration} 
      breakDuration={breakDuration} 
      setBreakDuration={setBreakDuration} 
      setFocusDuration={setFocusDuration} 
      buttonEnabled={buttonEnabled}/>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            
            <button
              type="button"
              className="btn btn-secondary"
              id="stop-button"
              data-testid="stop"
              title="Stop the session"
              disabled={buttonDisabled}
              onClick={stopSession}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <ActiveSession buttonDisabled={buttonDisabled} valueBar={valueBar} session={session}/>
    </div>
  );
}

export default Pomodoro;
