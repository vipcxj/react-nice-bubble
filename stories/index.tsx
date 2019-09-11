import { number, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Bubble, { BoxSizing, Position } from '../src/index';
// import './index.css';
//
export const stories = storiesOf('bubble', module);

stories.add(
     'base',
     () => {
         const width = number('width', 300, {
             range: true,
             min: 0,
             max: 500,
             step: 20,
         });
         const height = number('height', 300, {
             range: true,
             min: 0,
             max: 500,
             step: 20,
         });
         const arrowSize = number('arrow size', 16, {
             range: true,
             min: 0,
             max: 30,
             step: 1,
         });
         const arrowDegree0 = number('arrow angle 0', 45, {
             range: true,
             min: 10,
             max: 170,
             step: 5,
         });
         const arrowDegree1 = number('arrow angle 1', 45, {
             range: true,
             min: 10,
             max: 170,
             step: 5,
         });
         const arrowOffset = number('arrow offset', 16,  {
             range: true,
             min: 0,
             max: 30,
             step: 1,
         });
         const borderWidth = number('border width', 1, {
             range: true,
             min: 0,
             max: 20,
             step: 1,
         });
         const borderRadius = number('border radius', 0, {
             range: true,
             min: 0,
             max: 20,
             step: 1,
         });
         const borderColor = select('border color', {
             white: 'white',
             black: 'black',
             red: 'red',
             green: 'green',
             blue: 'blue',
             yellow: 'yellow',
             blackWithAlpha0: 'rgba(0,0,0,0.2)',
             blackWithAlpha1: 'rgba(0,0,0,0.4)',
             blackWithAlpha2: 'rgba(0,0,0,0.6)',
             blackWithAlpha3: 'rgba(0,0,0,0.8)',
             redWithAlpha0: 'rgba(255,0,0,0.3)',
             redWithAlpha1: 'rgba(255,0,0,0.5)',
             redWithAlpha2: 'rgba(255,0,0,0.7)',
             greenWithAlpha0: 'rgba(0,255,0,0.3)',
             greenWithAlpha1: 'rgba(0,255,0,0.5)',
             greenWithAlpha2: 'rgba(0,255,0,0.7)',
             blueWithAlpha0: 'rgba(0,0,255,0.3)',
             blueWithAlpha1: 'rgba(0,0,255,0.5)',
             blueWithAlpha2: 'rgba(0,0,255,0.7)',
         }, 'black');
         const position = select('position', {
             TOP_LEFT: Position.TOP_LEFT,
             TOP_CENTER: Position.TOP_CENTER,
             TOP_RIGHT: Position.TOP_RIGHT,
             LEFT_TOP: Position.LEFT_TOP,
             LEFT_CENTER: Position.LEFT_CENTER,
             LEFT_BOTTOM: Position.LEFT_BOTTOM,
             BOTTOM_LEFT: Position.BOTTOM_LEFT,
             BOTTOM_CENTER: Position.BOTTOM_CENTER,
             BOTTOM_RIGHT: Position.BOTTOM_RIGHT,
             RIGHT_TOP: Position.RIGHT_TOP,
             RIGHT_CENTER: Position.RIGHT_CENTER,
             RIGHT_BOTTOM: Position.RIGHT_BOTTOM,
         }, Position.TOP_LEFT);
         const boxSizing = select('box sizing', {
             CONTENT_BOX: BoxSizing.CONTENT_BOX,
             BORDER_BOX: BoxSizing.BORDER_BOX,
         }, BoxSizing.CONTENT_BOX);
         const backGroundColor = select('background color', {
             none: 'transparent',
             white: 'white',
             black: 'black',
             red: 'red',
             green: 'green',
             blue: 'blue',
             yellow: 'yellow',
             blackWithAlpha0: 'rgba(0,0,0,0.2)',
             blackWithAlpha1: 'rgba(0,0,0,0.4)',
             blackWithAlpha2: 'rgba(0,0,0,0.6)',
             blackWithAlpha3: 'rgba(0,0,0,0.8)',
             redWithAlpha0: 'rgba(255,0,0,0.3)',
             redWithAlpha1: 'rgba(255,0,0,0.5)',
             redWithAlpha2: 'rgba(255,0,0,0.7)',
             greenWithAlpha0: 'rgba(0,255,0,0.3)',
             greenWithAlpha1: 'rgba(0,255,0,0.5)',
             greenWithAlpha2: 'rgba(0,255,0,0.7)',
             blueWithAlpha0: 'rgba(0,0,255,0.3)',
             blueWithAlpha1: 'rgba(0,0,255,0.5)',
             blueWithAlpha2: 'rgba(0,0,255,0.7)',
         }, 'none');
         return (
             <Bubble
                 width={width}
                 height={height}
                 arrowSize={arrowSize}
                 arrowDegree0={arrowDegree0}
                 arrowDegree1={arrowDegree1}
                 arrowOffset={arrowOffset}
                 position={position}
                 borderWidth={borderWidth}
                 borderColor={borderColor}
                 borderRadius={borderRadius}
                 boxSizing={boxSizing}
                 backgroundColor={backGroundColor}
             >
                 Hello world!
             </Bubble>
         );
     },
     { info: { inline: true }},
);
export default stories;
