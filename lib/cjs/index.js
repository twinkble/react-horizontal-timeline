"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
// Decorators
var radium_1 = __importDefault(require("radium"));
// Components
var EventsBar_1 = __importDefault(require("./Components/EventsBar"));
// Helpers and constansts
var helpers_1 = require("./helpers");
var Constants_1 = __importDefault(require("./Constants"));
var react_sizeme_1 = require("react-sizeme");
/**
 * Default method to convert a date to a string label
 * @param {string} date The string representation of a date
 * @return {string} The formatted date string
 */
var defaultGetLabel = function (date) { return date; };
/**
 * Default render of title.
 * @since 1.0.1
 *
 * @param title
 */
var defaultRenderTitles = function (title) { return title; };
/**
 * @typedef HorizontalTimelineProps
 * @prop {UiStore} uiStore
 */
/**
 * @extends {Component<HorizontalTimelineProps, {}>}}
 */
var Index = /** @class */ (function (_super) {
    __extends(Index, _super);
    function Index(props) {
        return _super.call(this, props) || this;
    }
    // static getDerivedStateFromProps(props: HorizontalTimelineProps) {
    //     return null
    // }
    Index.prototype.render = function () {
        var _this = this;
        var _a = this.props, titles = _a.titles, titleWidth = _a.titleWidth, minEventPadding = _a.minEventPadding, maxEventPadding = _a.maxEventPadding, linePadding = _a.linePadding, renderTitles = _a.renderTitles, isTouchEnabled = _a.isTouchEnabled, styles = _a.styles, fillingMotion = _a.fillingMotion, onTitleClick = _a.onTitleClick, index = _a.index, isRtl = _a.isRtl;
        return (react_1.default.createElement(react_sizeme_1.SizeMe, { monitorHeight: true }, function (_a) {
            var size = _a.size;
            var _b = size, width = _b.width, height = _b.height;
            if (!width) {
                //As long as we do not know the width of our , do not render anything!
                return react_1.default.createElement(react_1.default.Fragment, null);
            }
            // Convert the title strings to actual title objects
            var titlesList = titles.map(function (title) { return title; });
            // Calculate the distances for all events
            var distances = helpers_1.cummulativeSeperation(titlesList, titleWidth, minEventPadding, maxEventPadding, linePadding);
            // Convert the distances and dates to events
            var events = distances.map(function (distance, index) { return ({
                distance: distance,
                label: renderTitles(titlesList[index], index),
                date: titles[index],
            }); });
            var visibleWidth = width - 80;
            var totalWidth = Math.max(events[events.length - 1].distance + _this.props.linePadding, visibleWidth);
            var barPaddingRight = 0;
            var barPaddingLeft = 0;
            if (!_this.props.isOpenEnding) {
                barPaddingRight = totalWidth - events[events.length - 1].distance;
            }
            if (!_this.props.isOpenBeginning) {
                barPaddingLeft = events[0].distance;
            }
            return (react_1.default.createElement("div", null,
                react_1.default.createElement(EventsBar_1.default, { width: width, height: height, events: events, isTouchEnabled: isTouchEnabled, totalWidth: totalWidth, visibleWidth: visibleWidth, index: _this.props.index, styles: styles, indexClick: onTitleClick, labelWidth: titleWidth, fillingMotion: fillingMotion, barPaddingRight: barPaddingRight, barPaddingLeft: barPaddingLeft, selectedIndex: index, isKeyboardEnabled: isTouchEnabled, isRtl: isRtl })));
        }));
    };
    Index.defaultProps = {
        // --- EVENTS ---
        getLabel: defaultGetLabel,
        renderTitles: defaultRenderTitles,
        // --- POSITIONING ---
        minEventPadding: Constants_1.default.MIN_EVENT_PADDING,
        maxEventPadding: Constants_1.default.MAX_EVENT_PADDING,
        linePadding: Constants_1.default.TIMELINE_PADDING,
        titleWidth: Constants_1.default.DATE_WIDTH,
        // --- STYLING ---
        styles: {
            outline: "#dfdfdf",
            background: "#f8f8f8",
            foreground: "#61dafb",
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
        isRtl: false,
    };
    return Index;
}(react_1.default.Component));
exports.default = radium_1.default(react_sizeme_1.withSize({ monitorHeight: true, refreshRate: 25 })(Index));
//# sourceMappingURL=index.js.map