import React, { Component } from 'react';
import FeedbackOptions from './components/FeedbackOptions';
import Statistics from './components/Statistics';
import Section from './components/Section';
import Notification from './components/Notification';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  calcTotalFeedback = () =>
    Object.values(this.state).reduce((total, value) => total + value, 0);

  positivePercentage = () => {
    const total = this.calcTotalFeedback();

    return Math.round((this.state.good * 100) / total);
  };

  addFeedback = key => {
    this.setState(prevState => ({ [key]: prevState[key] + 1 }));
  };

  render() {
    const total = this.calcTotalFeedback();

    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={this.state}
            onLeaveFeedback={this.addFeedback}
          ></FeedbackOptions>
        </Section>
        <Section title="Statistics">
          {total > 0 ? (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={total}
              positivePercentage={this.positivePercentage()}
            ></Statistics>
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
      </div>
    );
  }
}

export default App;
