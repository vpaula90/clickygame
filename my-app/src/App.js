import React from 'react';
import logo from './logo.svg';
import './App.css';
import PictureCard from "./components/pictures";
import Wrapper from "./components/wrappers";
import cards from "./cards.json";

class App extends Component {
  state = {
    cards,
    clickedArray: [],
    topScore: 0,
    score: 0,
    message: "",
    changeIt: "false"
  };

  clickPicture = id => {
    // Randomize the pictures
    const shuffleArray = this.shuffleArray(cards);
    this.setState({cards: shuffleArray});
    // if image has been clicked the set this.state.score = 0; \
    if (this.state.clickedArray.includes(id)) {
      this.setState({ score: 0, clickedArray: [], message: "Sorry! Game Over! Click an image and start again!", changeIt: "true"});
    }
    else {
      this.setState({
        clickedArray: this.state.clickedArray.concat([id]),
        score: this.state.score + 1,
        message: "Correct!!",
        changeIt: "false"
      });
    }
    // set topscore = score if score>topscore.
    if (this.state.score > this.state.topScore) {
      this.setState({ topScore: this.state.score });
    }
    // shake the wrapper if shakeit is set to true
  }
  shuffleArray = (picturesArray) => {
      for (let i = picturesArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [picturesArray[i], picturesArray[j]] = [picturesArray[j], picturesArray[i]];
      }
      return picturesArray;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Clicky Game!!</h1>
        </header>
        <h3 className="App-intro">
          <strong>Click on an image and earn points! Don't click on any image more than once!</strong> 
          <p className = "score"><strong>Score: {this.state.score} | TopScore: {this.state.topScore}</strong></p>
          <p className="message"><strong>{this.state.message}</strong></p>
        </h3>
        <Wrapper
        shakeWrapper = {this.state.shakeit}
        pictures=
          {this.state.cards.map(picture => (
            <PictureCard
              clickPicture={this.clickPicture}
              id={picture.id}
              key={picture.id} // to get rid of unique key prop warning
              name={picture.name}
              image={picture.image}
            />
          ))}
        />
        <footer className="footer">
      <div className="container">
        <span className="text-muted">&copy;Clicky Game </span>
      </div>
    </footer> 
      </div>
    );
  }
}
export default App;