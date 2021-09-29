import React from "react";
import { Motion, spring } from "react-motion";

export type EventLineProps = {
  left: number;
  width: number;
  fillingMotion: {
    stiffness: number;
    damping: number;
  };
  backgroundColor: string;
};

/**
 * The markup Information for an event Line. You can stack multiple lines on top of eachother
 *
 * @param  {object} props The props from parent, styling and positioning
 * @return {StatelessFunctionalReactComponent} Markup Information for the event line.
 */
const EventLine: React.FC<EventLineProps> = ({
  left,
  width,
  fillingMotion,
  backgroundColor,
}) => (
  <Motion
    style={{
      tWidth: spring(width, fillingMotion),
      tLeft: spring(left, fillingMotion),
    }}
  >
    {({ tWidth, tLeft }) => (
      <span
        aria-hidden="true"
        className="timeline-eventline"
        style={{
          position: "absolute",
          left: `${tLeft}px`,
          top: 0,
          height: "100%",
          width: `${tWidth}px`,
          transformOrigin: "left center",
          backgroundColor,
        }}
      />
    )}
  </Motion>
);

export default EventLine;
