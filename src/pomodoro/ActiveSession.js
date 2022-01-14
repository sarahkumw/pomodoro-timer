import React from "react";
import { secondsToDuration, minutesToDuration } from "../utils/duration";


function ActiveSession({ buttonDisabled, valueBar, session }) {

    if (buttonDisabled === false) {
        return (
            <div>
              <div className="row mb-2">
                <div className="col">
                  <h2 data-testid="session-title">
                    {session?.label} for {minutesToDuration(session?.duration)} minutes
                  </h2>
                  <p className="lead" data-testid="session-sub-title">
                    {secondsToDuration(session?.timeRemaining)} remaining
                  </p>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col">
                  <div className="progress" style={{ height: "20px" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow={valueBar} 
                      style={{ width: valueBar + "%" }} 
                    />
                  </div>
                </div>
              </div>
            </div>
            )
    }
    return null;
}

export default ActiveSession;