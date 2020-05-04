/* eslint-disable */
// // import external modules
import React, { Component, Fragment } from 'react';
// import TimeLine from 'react-horizontal-timeline';
import { Card, CardBody } from 'reactstrap';

import moment from 'moment';
// import SwipeableViews from "react-swipeable-views";

class HorizontalTimeline extends Component {
  state = {
    value: 0,
    previous: 0,
    showConfigurator: false,
    dates: [
      moment(new Date(2014, 1, 16), 'YYYY-MM-DD'),
      moment(new Date(2014, 2, 28), 'YYYY-MM-DD'),
      moment(new Date(2014, 3, 20), 'YYYY-MM-DD'),
      moment(new Date(2014, 5, 20), 'YYYY-MM-DD'),
      moment(new Date(2014, 7, 9), 'YYYY-MM-DD'),
      moment(new Date(2014, 8, 30), 'YYYY-MM-DD'),
      moment(new Date(2014, 9, 15), 'YYYY-MM-DD'),
      moment(new Date(2014, 11, 1), 'YYYY-MM-DD'),
    ],
    title: [
      'Horizontal Timeline title ',
      'Event Title 1 Here',
      'Event Title 2 Here',
      'Event Title 3 Here',
      'Event Title 4 Here',
      'Event Title 5 Here',
      'Event Title 6 Here',
      'Event Title 7 Here',
      'Event Title 8 Here',
    ],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae, ut harum ipsam molestias maxime non nisi reiciendis eligendi! Doloremque quia pariatur harum ea amet quibusdam quisquam, quae, temporibus dolores porro doloribus.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae, ut harum ipsam molestias maxime non nisi reiciendis eligendi! Doloremque quia pariatur harum ea amet quibusdam quisquam, quae, temporibus dolores porro doloribus.',
    // timelineConfig
    minEventPadding: 20,
    maxEventPadding: 120,
    linePadding: 100,
    labelWidth: 100,
    fillingMotionStiffness: 150,
    fillingMotionDamping: 25,
    slidingMotionStiffness: 150,
    slidingMotionDamping: 25,
    stylesBackground: '#f8f8f8',
    stylesForeground: '#009da0',
    stylesOutline: '#dfdfdf',
    isTouchEnabled: true,
    isKeyboardEnabled: true,
    isOpenEnding: true,
    isOpenBeginning: true,
  };

  render() {
    return (
      <>
        <Card>
          <CardBody className="p-5">
            {/* Bounding box for the Timeline */}
            <div
              className="horizontal-timeline-wrapper"
              style={{ height: '100px', margin: '0 0 2rem 0' }}
            >
              {/* <TimeLine
                fillingMotion={{
                  stiffness: this.state.fillingMotionStiffness,
                  damping: this.state.fillingMotionDamping,
                }}
                index={this.state.value}
                indexClick={index => {
                  this.setState({
                    value: index,
                    previous: this.state.value,
                  });
                }}
                isKeyboardEnabled={this.state.isKeyboardEnabled}
                isTouchEnabled={this.state.isTouchEnabled}
                labelWidth={this.state.labelWidth}
                linePadding={this.state.linePadding}
                maxEventPadding={this.state.maxEventPadding}
                minEventPadding={this.state.minEventPadding}
                slidingMotion={{
                  stiffness: this.state.slidingMotionStiffness,
                  damping: this.state.slidingMotionDamping,
                }}
                styles={{
                  background: this.state.stylesBackground,
                  foreground: this.state.stylesForeground,
                  outline: this.state.stylesOutline,
                }}
                values={this.state.dates}
                isOpenEnding={this.state.isOpenEnding}
                isOpenBeginning={this.state.isOpenBeginning}
              /> */}
            </div>
            <div>
              <SwipeableViews
                index={this.state.value}
                onChangeIndex={(value, previous) => {
                  this.setState({ value, previous });
                }}
                resistance
              >
                {this.state.title.map((title, i) => {
                  return (
                    <div key={i}>
                      <h2 className="text-bold-600">{title}</h2>
                      <em>- 16.11.2018</em>
                      <p className="mb-0 mt-3">{this.state.content}</p>
                    </div>
                  );
                })}
              </SwipeableViews>
            </div>
          </CardBody>
        </Card>
      </>
    );
  }
}
export default HorizontalTimeline;
