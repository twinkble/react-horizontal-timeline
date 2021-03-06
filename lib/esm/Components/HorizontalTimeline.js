var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from "react";
// Decorators
import Radium from "radium";
/** @ts-ignore */
import dimensions from "react-dimensions";
// Components
import EventsBar from "./EventsBar";
// Helpers and constansts
import { cummulativeSeperation } from "../helpers";
import Constants from "../Constants";
/**
 * Default method to convert a date to a string label
 * @param {string} date The string representation of a date
 * @return {string} The formatted date string
 */
var defaultGetLabel = function (date) { return date; };
/*
 * is the Horizontal Timeline. component expects an array of dates
 * just as strings (e.g. 1993-01-01) and layes them horizontaly on the the screen
 * also expects a callback which is activated when that particular index is
 * clicked passing that index along
 */
var HorizontalTimeline = /** @class */ (function (_super) {
    __extends(HorizontalTimeline, _super);
    function HorizontalTimeline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HorizontalTimeline.prototype.render = function () {
        var _a = this.props, containerWidth = _a.containerWidth, containerHeight = _a.containerHeight, values = _a.values, labelWidth = _a.labelWidth, minEventPadding = _a.minEventPadding, maxEventPadding = _a.maxEventPadding, linePadding = _a.linePadding, getLabel = _a.getLabel, isTouchEnabled = _a.isTouchEnabled, styles = _a.styles, fillingMotion = _a.fillingMotion, indexClick = _a.indexClick, index = _a.index;
        if (!containerWidth) {
            //As long as we do not know the width of our container, do not render anything!
            return false;
        }
        // Convert the date strings to actual date objects
        var dates = values.map(function (value) { return value; });
        // Calculate the distances for all events
        var distances = cummulativeSeperation(dates, labelWidth, minEventPadding, maxEventPadding, linePadding);
        // Convert the distances and dates to events
        var events = distances.map(function (distance, index) { return ({
            distance: distance,
            label: getLabel(values[index], index),
            date: values[index],
        }); });
        var visibleWidth = containerWidth - 80;
        var totalWidth = Math.max(events[events.length - 1].distance + this.props.linePadding, visibleWidth);
        var barPaddingRight = 0;
        var barPaddingLeft = 0;
        if (!this.props.isOpenEnding) {
            barPaddingRight = totalWidth - events[events.length - 1].distance;
        }
        if (!this.props.isOpenBeginning) {
            barPaddingLeft = events[0].distance;
        }
        return (React.createElement(EventsBar, { width: containerWidth, height: containerHeight, events: events, isTouchEnabled: isTouchEnabled, totalWidth: totalWidth, visibleWidth: visibleWidth, index: this.props.index, styles: styles, indexClick: indexClick, labelWidth: labelWidth, fillingMotion: fillingMotion, barPaddingRight: barPaddingRight, barPaddingLeft: barPaddingLeft, selectedIndex: index, isKeyboardEnabled: isTouchEnabled }));
    };
    HorizontalTimeline.defaultProps = {
        // --- EVENTS ---
        getLabel: defaultGetLabel,
        // --- POSITIONING ---
        minEventPadding: Constants.MIN_EVENT_PADDING,
        maxEventPadding: Constants.MAX_EVENT_PADDING,
        linePadding: Constants.TIMELINE_PADDING,
        labelWidth: Constants.DATE_WIDTH,
        // --- STYLING ---
        styles: {
            outline: "#dfdfdf",
            background: "#f8f8f8",
            foreground: "#7b9d6f",
        },
        fillingMotion: {
            stiffness: 150,
            damping: 25,
        },
        slidingMotion: {
            stiffness: 150,
            damping: 25,
        },
        isOpenEnding: true,
        isOpenBeginning: true,
        // --- INTERACTION ---
        isTouchEnabled: true,
        isKeyboardEnabled: true,
    };
    return HorizontalTimeline;
}(React.Component));
export default Radium(dimensions({ elementResize: true })(HorizontalTimeline));
//# sourceMappingURL=HorizontalTimeline.js.map