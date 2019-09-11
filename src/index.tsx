import { ColorProperty } from 'csstype';
import * as React from 'react';

export const enum Position {
    TOP_LEFT = 'top-left',
    TOP_CENTER = 'top-center',
    TOP_RIGHT = 'top-right',
    LEFT_TOP = 'left-top',
    LEFT_CENTER = 'left-center',
    LEFT_BOTTOM = 'left-bottom',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM_CENTER = 'bottom-center',
    BOTTOM_RIGHT = 'bottom-right',
    RIGHT_TOP = 'right_top',
    RIGHT_CENTER = 'right_center',
    RIGHT_BOTTOM = 'right_bottom',
}

export const enum BoxSizing {
    CONTENT_BOX = 'content-box',
    BORDER_BOX = 'border-box',
}

interface IBubbleProps {
    width: number;
    height: number;
    arrowSize?: number;
    arrowDegree0?: number;
    arrowDegree1?: number;
    arrowOffset?: number;
    position?: Position;
    borderWidth?: number;
    borderColor?: ColorProperty;
    borderRadius?: number;
    backgroundColor?: ColorProperty;
    boxSizing?: BoxSizing;
    children: React.ReactNode;
}

export const defaultProps: Partial<IBubbleProps> = {
    arrowSize: 16,
    arrowDegree0: 45,
    arrowDegree1: 45,
    arrowOffset: 16,
    position: Position.LEFT_TOP,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 0,
    boxSizing: BoxSizing.CONTENT_BOX,
};

/**
 * |-2-2 | T L | T C | T R | 2-2
 * |-----|-----|-----|-----|-----
 * | L T |-1-1 | 0-1 | 1-1 | R T
 * |-----|-----|-----|-----|-----
 * | L C |-1 0 | 0 0 | 1 0 | R C
 * |-----|-----|-----|-----|-----
 * | L B |-1 1 | 0 1 | 1 1 | R B
 * |-----|-----|-----|-----|-----
 * |-2 2 | B L | B C | B R | 2 2
 */
const POSITION_HINT = {
    [Position.TOP_LEFT]: [-1, -2],
    [Position.TOP_CENTER]: [0, -2],
    [Position.TOP_RIGHT]: [1, -2],
    [Position.LEFT_TOP]: [-2, -1],
    [Position.LEFT_CENTER]: [-2, 0],
    [Position.LEFT_BOTTOM]: [-2, 1],
    [Position.BOTTOM_LEFT]: [-1, 2],
    [Position.BOTTOM_CENTER]: [0, 2],
    [Position.BOTTOM_RIGHT]: [1, 2],
    [Position.RIGHT_TOP]: [2, -1],
    [Position.RIGHT_CENTER]: [2, 0],
    [Position.RIGHT_BOTTOM]: [2, 1],
};

// const ANGLE_A = Math.PI / 2;
// const ANGLE_B = (Math.PI - ANGLE_A) / 2;
// const HEIGHT_DELTA = 1 / Math.cos(Math.PI / 2 - ANGLE_A / 2);
// const OFFSET_DELTA = Math.cos((Math.PI - ANGLE_B) / 2);

const degreeToAngle = (degree: number) => degree * Math.PI / 180;
const TAN_45 = Math.tan(Math.PI / 4);

const createArrow = (props: IBubbleProps, id: number, style?: React.CSSProperties) => {
    const {
        width,
        height,
        arrowSize = defaultProps.arrowSize,
        arrowDegree0 = defaultProps.arrowDegree0,
        arrowDegree1 = defaultProps.arrowDegree1,
        arrowOffset = defaultProps.arrowOffset,
        borderColor = defaultProps.borderColor,
        borderWidth = defaultProps.borderWidth,
        borderRadius = defaultProps.borderRadius,
        backgroundColor = defaultProps.backgroundColor,
        boxSizing = defaultProps.boxSizing,
        position = defaultProps.position,
    } = props;
    const hint = POSITION_HINT[position];
    // let path0: string;
    // let path1: string;
    // const halfBorder = borderWidth / 2;
    // const borderOffset = -halfBorder;
    // const emp = '';
    const contentBox = boxSizing === BoxSizing.CONTENT_BOX;
    // const computedBorderWidth = contentBox ? borderWidth : 0;
    const angle0 = degreeToAngle(arrowDegree0);
    const angle1 = degreeToAngle(arrowDegree1);
    const arrowWidth0 = arrowSize > 0 ? arrowSize / Math.tan(angle0) : 0;
    const arrowWidth1 = arrowSize > 0 ? arrowSize / Math.tan(angle1) : 0;
    const arrowWidth = arrowWidth0 + arrowWidth1;
    const arrowRadio = (contentBox && borderWidth > 0) ? (borderWidth * (Math.tan(angle0 / 2) + Math.tan(angle1 / 2)) / arrowWidth + 1) : 1;
    const realArrowSize = arrowSize * arrowRadio;
    const realArrowWidth0 = arrowWidth0 * arrowRadio;
    const realArrowWidth1 = arrowWidth1 * arrowRadio;
    const realArrowWidth = arrowWidth * arrowRadio;
    const realArrowOffset0 = contentBox
        ? Math.max(Math.max(arrowOffset + borderWidth * (TAN_45 - Math.tan(angle0 / 2)), borderRadius), 0)
        : arrowOffset;
    const realArrowOffset1 = contentBox
        ? Math.max(Math.max(arrowOffset + borderWidth * (TAN_45 - Math.tan(angle1 / 2)), borderRadius), 0)
        : arrowOffset;
    const minWH = realArrowOffset0 + realArrowWidth + realArrowOffset1;
    const svgWidth = Math.max(width + (contentBox ? 2 * borderWidth : 0), minWH);
    const svgHeight = Math.max(height + (contentBox ? 2 * borderWidth : 0), minWH);
    const cWidth = svgWidth + (Math.abs(hint[0]) === 2 ? realArrowSize : 0);
    const cHeight = svgHeight + (Math.abs(hint[1]) === 2 ? realArrowSize : 0);
    const boxPosX = (hint[0] === -2 ? realArrowSize : 0) + (contentBox ? borderWidth : 0);
    const boxPosY = (hint[1] === -2 ? realArrowSize : 0) + (contentBox ? borderWidth : 0);
    const boxWidth = Math.max(svgWidth - (contentBox ? 2 * borderWidth : 0), 0);
    const boxHeight = Math.max(svgHeight - (contentBox ? 2 * borderWidth : 0), 0);
    // const boxWidth = contentBox ? (width + borderWidth) : (width - borderWidth);
    // const boxHeight = contentBox ? (height + borderWidth) : ( height - borderWidth);
    const arDirX = [1, 0, -1, 0];
    const arDirY = [0, 1, 0, -1];
    const arHintCheck = [[1, -2], [0, 2], [1, 2], [0, -2]];
    let path = `M${hint[0] === -2 ? realArrowSize : 0} ${
        (hint[1] === -2 ? realArrowSize : 0) + borderRadius
    }`;
    for (let i = 0; i < 4; ++i) {
        const dirX = arDirX[i];
        const dirY = arDirY[i];
        const dirNX = arDirX[i === 0 ? 3 : (i - 1)];
        const dirNY = arDirY[i === 0 ? 3 : (i - 1)];
        const hintCheck = arHintCheck[i];
        if (borderRadius > 0) {
            path += `a${borderRadius},${borderRadius} 0 0,1 ${
                (dirNX + dirX) * borderRadius
            },${
                (dirNY + dirY) * borderRadius
            }`;
        }
        let offset;
        const svgSize = hintCheck[0] ? svgWidth : svgHeight;
        if (hint[hintCheck[0]] === hintCheck[1]) {
            const idxDir = 1 - hintCheck[0];
            const pos = hint[idxDir] * (idxDir ? dirY : dirX);
            const realArrowWidthPartA = (pos < 0 ? realArrowWidth0 : pos > 0 ? realArrowWidth1 : realArrowWidth / 2);
            const realArrowWidthPartB = (pos > 0 ? realArrowWidth0 : pos < 0 ? realArrowWidth1 : realArrowWidth / 2);
            const pathArrow = `l${
                dirX * realArrowWidthPartA + dirNX * realArrowSize
            } ${
                dirY * realArrowWidthPartA + dirNY * realArrowSize
            }l${
                dirX * realArrowWidthPartB - dirNX * realArrowSize
            } ${
                dirY * realArrowWidthPartB - dirNY * realArrowSize
            }`;
            if (pos < 0) {
                offset = (hint[idxDir] < 0 ? realArrowOffset0 : realArrowOffset1) - borderRadius;
                if (offset > 0) {
                    path += `l${dirX * offset},${dirY * offset}`;
                }
                path += `${pathArrow}l${
                    dirX * (svgSize - offset - realArrowWidth - 2 * borderRadius)
                } ${
                    dirY * (svgSize - offset - realArrowWidth - 2 * borderRadius)
                }`
            } else if (pos > 0) {
                offset = (hint[idxDir] < 0 ? realArrowOffset0 : realArrowOffset1) - borderRadius;
                path += `l${
                    dirX * (svgSize - offset - realArrowWidth - 2 * borderRadius)
                } ${
                    dirY * (svgSize - offset - realArrowWidth - 2 * borderRadius)
                }${pathArrow}`;
                if (offset > 0) {
                    path += `l${dirX * offset},${dirY * offset}`;
                }
            } else {
                offset = (svgSize - realArrowWidth - 2 * borderRadius) / 2;
                path += `l${dirX * offset} ${dirY * offset}${pathArrow}l${dirX * offset} ${dirY * offset}`;
            }
        } else {
            path += `l${dirX * (svgSize - 2 * borderRadius)},${dirY * (svgSize - 2 * borderRadius)}`;
        }
    }
    const tpId = `bubble-tp-${id}`;
    const clipId = `bubble-clip-${id}`;
    return {
        node: (
            <svg style={style} width={cWidth} height={cHeight} viewBox={`0 0 ${cWidth} ${cHeight}`} fill="none">
                <defs>
                    <path id={tpId} d={path} />
                    <clipPath id={clipId}>
                        <use xlinkHref={`#${tpId}`} />
                    </clipPath>
                </defs>
                <use xlinkHref={`#${tpId}`} stroke={borderColor} strokeWidth={borderWidth * 2} fill={backgroundColor} clipPath={`url(#${clipId})`} />
            </svg>
        ),
        cWidth,
        cHeight,
        boxPosX,
        boxPosY,
        boxWidth,
        boxHeight,
    };
};

let BUBBLE_ID = 0;

export default (props: IBubbleProps): React.ReactElement => {
    const { children } = props;
    const [id] = React.useState(BUBBLE_ID ++);
    const {node, cWidth, cHeight, boxPosX, boxPosY, boxWidth, boxHeight} = createArrow(props, id);
    const cStyle: React.CSSProperties = {
        position: "relative",
        width: cWidth,
        height: cHeight,
    };
    const bStyle: React.CSSProperties = {
        position: "absolute",
        left: boxPosX,
        top: boxPosY,
        width: boxWidth,
        height: boxHeight,
    };
    return (
        <div style={cStyle}>
            { node }
            <div style={bStyle}>
                { children || null }
            </div>
        </div>
    )
}
