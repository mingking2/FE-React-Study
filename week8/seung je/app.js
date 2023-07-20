import { Timer } from "./Timer";
import TimerUi from "./TimerUi";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <TimerUi name="김승제"></TimerUi>
      <Timer></Timer>
    </div>
  );
};

export default App;
