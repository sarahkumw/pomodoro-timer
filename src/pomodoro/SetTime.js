
import React from "react";
import { minutesToDuration } from "../utils/duration";

function SetTime({ breakDuration, focusDuration, setBreakDuration, setFocusDuration, buttonEnabled }) {
    //specialized functions to increase/decrease break/focus duration within min/max times
    function handleFocusDecrease() {
        if (focusDuration > 9) {
          setFocusDuration((previousDuration) => previousDuration - 5)
        }
        return focusDuration
    }
    
    function handleFocusIncrease() {
        if (focusDuration < 56) {
          setFocusDuration((previousDuration) => previousDuration  + 5)
        }
        return focusDuration
    }
    
    function handleBreakDecrease() {
        if (breakDuration > 1) {
          setBreakDuration ((previousDuration) => previousDuration  - 1)
        }
        return breakDuration
    }
    
    function handleBreakIncrease() {
        if (breakDuration < 15) {
          setBreakDuration((previousDuration) => previousDuration  + 1)
        }
        return breakDuration
    }
    //used props and minutesToDuration/secondsToDuration to display correct labels and times
    return (
        <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              Focus Duration: {minutesToDuration(focusDuration)}
            </span>
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={handleFocusDecrease}
                disabled={buttonEnabled}
              >
                <span className="oi oi-minus" />
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={handleFocusIncrease}
                disabled={buttonEnabled}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                Break Duration: {minutesToDuration(breakDuration)}
              </span>
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={handleBreakDecrease}
                  disabled={buttonEnabled}
                >
                  <span className="oi oi-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={handleBreakIncrease}
                  disabled={buttonEnabled}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
} 

export default SetTime;