import { useState } from "react";
import HandButton from "./HandButton";
import HandIcon from "./HandIcon";
import Score from "./Score";
import { compareHand, generateRandomHand } from "./utils";
import "./App.css";
import "./HandButton.css";
import reset from "./assets/ic-reset.svg";

const INITIAL_VALUE = "rock";

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return "승리";
  if (comparison < 0) return "패배";
  return "무승부";
}

function App() {
  const [hand, setHand] = useState(INITIAL_VALUE);
  const [otherHand, setOtherHand] = useState(INITIAL_VALUE);
  const [gameHistory, setGameHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);

  let myClassName = "Hand";
  let otherClassName = "Hand";

  const handleButtonClick = (nextHand) => {
    const nextOtherHand = generateRandomHand();
    const nextHistoryItem = getResult(nextHand, nextOtherHand);
    const comparison = compareHand(nextHand, nextOtherHand);
    setHand(nextHand);
    setOtherHand(nextOtherHand);
    setGameHistory([...gameHistory, nextHistoryItem]);
    if (comparison > 0) {
      setScore(score + bet);
      myClassName += "winner";
    } else if (comparison < 0) {
      setOtherScore(otherScore + bet);
      otherClassName += "winner";
    }
  };

  const handleClearClick = () => {
    setHand(INITIAL_VALUE);
    setOtherHand(INITIAL_VALUE);
    setGameHistory([]);
    setScore(0);
    setOtherScore(0);
    setBet(1);
  };

  const handleBetChange = (e) => {
    let num = Number(e.target.value);
    if (num > 9) num %= 10;
    if (num < 1) num = 1;
    num = Math.floor(num);
    setBet(num);
  };

  return (
    <div className="App">
      <h1 className="App-heading">가위바위보</h1>
      <img
        className="App-reset"
        src={reset}
        alt="초기화"
        onClick={handleClearClick}
      />
      <div className="App-scores">
        <Score value={"나"}>{score}</Score>
        <div className="App-versus">:</div>
        <Score value={"상대"}>{otherScore}</Score>
      </div>
      <div className="Box App-box">
        <div className="Box-inner">
          <div className="App-hands">
            <div className={myClassName}>
              <HandIcon className="Hand-icon" value={hand} />
            </div>
            <div className="App-versus">VS</div>
            <div className={otherClassName}>
              <HandIcon className="Hand-icon" value={otherHand} />
            </div>
          </div>
          <div className="App-bet">
            <span>배점</span>
            <input
              type="number"
              value={bet}
              min={1}
              max={9}
              onChange={handleBetChange}
            ></input>
            <span>배</span>
          </div>
          <div className="App-history">
            <h2>승부 기록: {gameHistory.join(", ")}</h2>
            <p></p>
          </div>
        </div>
      </div>

      <HandButton
        className={HandButton}
        value="rock"
        onClick={handleButtonClick}
      />
      <HandButton
        className={HandButton}
        value="scissor"
        onClick={handleButtonClick}
      />
      <HandButton
        className={HandButton}
        value="paper"
        onClick={handleButtonClick}
      />
    </div>
  );
}

export default App;
