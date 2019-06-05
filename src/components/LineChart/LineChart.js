import React, { Component } from 'react';
import './LineChart.css';

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverLoc: null,
            activePoint: null
        }
    }
    // GET X & Y || MAX & MIN
    getX() {
        const { data } = this.props;
        return {
            min: data[0].x,
            max: data[data.length - 1].x
        }
    }
    getY() {
        const { data } = this.props;
        return {
            min: data.reduce((min, p) => p.y < min ? p.y : min, data[0].y),
            max: data.reduce((max, p) => p.y > max ? p.y : max, data[0].y)
        }
    }
    // GET SVG COORDINATES
    getSvgX(x) {
        const { svgWidth, yLabelSize } = this.props;
        return yLabelSize + (x / this.getX().max * (svgWidth - yLabelSize));
    }
    getSvgY(y) {
        const { svgHeight, xLabelSize } = this.props;
        const gY = this.getY();
        return ((svgHeight - xLabelSize - 2) * gY.max - (svgHeight - xLabelSize - 2) * y) / (gY.max - gY.min);
    }
    // BUILD SVG PATH
    makePath() {
        const { data, color, strokeWidth } = this.props;
        let pathD = "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";

        pathD += data.map((point, i) => {
            return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
        }).join("");

        return (
            <path className="linechart_path" d={pathD} style={{ stroke: color, strokeWidth: strokeWidth }} />
        );
    }
    // BUILD SHADED AREA
    makeArea() {
        const { data, color } = this.props;
        let pathD = "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";

        pathD += data.map((point, i) => {
            return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
        }).join("");

        const x = this.getX();
        const y = this.getY();
        pathD += "L " + this.getSvgX(x.max) + " " + this.getSvgY(y.min) + " "
            + "L " + this.getSvgX(x.min) + " " + this.getSvgY(y.min) + " ";

        return <path className="linechart_area" d={pathD} style={{ fill: color, opacity: .3 }} />
    }
    //BUILD GRID AXIS.
    makeAxis() {
        const { yLabelSize } = this.props;
        const x = this.getX();
        const y = this.getY();

        return (
            <g className="linechart_axis">
                <line
                    x1={this.getSvgX(x.min) - (yLabelSize)} y1={this.getSvgY(y.min)}
                    x2={this.getSvgX(x.max)} y2={this.getSvgY(y.min)}
                    strokeDasharray="5" />
                <line
                    x1={this.getSvgX(x.min) - yLabelSize} y1={this.getSvgY(y.max)}
                    x2={this.getSvgX(x.max)} y2={this.getSvgY(y.max)}
                    strokeDasharray="5" />
            </g>
        );
    }
    //MAKE LABELS FOR SVG
    makeLabels() {
        const { svgHeight, svgWidth, xLabelSize, yLabelSize, currency, windowWidth } = this.props;
        const padding = -5;
        return (
            <g className="linechart_label" >
                {/* Y AXIS LABELS */}
                <text transform={`translate(${yLabelSize + padding}, ${xLabelSize / 2})`} textAnchor="end"
                    font-size={windowWidth < 577 ? 10 : 16}
                >
                    {parseFloat(this.getY().max).toLocaleString('us-EN', { style: 'currency', currency: currency })}
                </text>
                <text transform={`translate(${yLabelSize + padding}, ${svgHeight - (xLabelSize + 5)})`} textAnchor="end"
                    font-size={windowWidth < 577 ? 10 : 16}
                >
                    {parseFloat(this.getY().min).toLocaleString('us-EN', { style: 'currency', currency: currency })}
                </text>
                {/* X AXIS LABELS */}
                <text transform={`translate(${yLabelSize}, ${svgHeight + padding})`} textAnchor="start">
                    {this.props.data[0].d}
                </text>
                <text transform={`translate(${svgWidth}, ${svgHeight + padding})`} textAnchor="end">
                    {this.props.data[this.props.data.length - 1].d}
                </text>
            </g>
        )
    }
    // FIND CLOSEST POINT TO MOUSE
    getCoords(e) {
        const { svgWidth, data, yLabelSize, lineClass } = this.props;
        const svgLocation = document.getElementsByClassName(lineClass)[0].getBoundingClientRect();
        const adjustment = (svgLocation.width - svgWidth) / 2; //takes padding into consideration
        const relativeLoc = e.clientX - svgLocation.left - adjustment;

        let svgData = [];
        data.map((point, i) => {
            svgData.push({
                svgX: this.getSvgX(point.x),
                svgY: this.getSvgY(point.y),
                d: point.d,
                p: point.p
            });
        });

        let closestPoint = {};
        for (let i = 0, c = 500; i < svgData.length; i++) {
            if (Math.abs(svgData[i].svgX - this.state.hoverLoc) <= c) {
                c = Math.abs(svgData[i].svgX - this.state.hoverLoc);
                closestPoint = svgData[i];
            }
        }

        if (relativeLoc - yLabelSize < 0) {
            this.stopHover();
        } else {
            this.setState({
                hoverLoc: relativeLoc,
                activePoint: closestPoint
            })
            this.props.onChartHover(relativeLoc, closestPoint);
        }
    }
    // STOP HOVER
    stopHover() {
        this.setState({ hoverLoc: null, activePoint: null });
        this.props.onChartHover(null, null);
    }
    // MAKE ACTIVE POINT
    makeActivePoint() {
        const { color, pointRadius } = this.props;
        return (
            <circle
                className='linechart_point'
                style={{ stroke: color }}
                r={pointRadius}
                cx={this.state.activePoint.svgX}
                cy={this.state.activePoint.svgY}
            />
        );
    }
    // MAKE HOVER LINE
    createLine() {
        const { svgHeight, xLabelSize } = this.props;
        return (
            <line className='hoverLine'
                x1={this.state.hoverLoc} y1={0}
                x2={this.state.hoverLoc} y2={svgHeight - xLabelSize} />
        )
    }

    render() {
        const { svgHeight, svgWidth, makeArea, makeAxis, makeLabels, createLine, makeActivePoint, onChartHover, lineClass } = this.props;
        return (
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className={lineClass}
                onMouseLeave={() => onChartHover && this.stopHover()}
                onMouseMove={(e) => onChartHover && this.getCoords(e)} >

                <g>
                    {makeAxis && this.makeAxis()}
                    {this.makePath()}
                    {makeArea && this.makeArea()}
                    {makeLabels && this.makeLabels()}
                    {this.state.hoverLoc && createLine ? this.createLine() : null}
                    {this.state.hoverLoc && makeActivePoint ? this.makeActivePoint() : null}
                </g>
            </svg>
        )
    }
}

LineChart.defaultProps = {
    data: [],
    pointRadius: 5,
}

export default LineChart;
