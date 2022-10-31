import { useState } from "react";
import listen_history from "./data/listen_history.json";
import RankedItem from "./RankedItem";

function App() {
  const DATA = listen_history;
  const dateArr = [];
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  
  function mostFrequent(arr, category, k) {
    const frequency = new Map();
    const bucket = [];
    const result = [];
    if (category) {
      category = category;
    } else {
      category = null;
    }

    for (let ele of arr) {
      if (category) {
        frequency.set(ele[category], (frequency.get(ele[category]) || 0) + 1);
      } else {
        frequency.set(ele, (frequency.get(ele) || 0) + 1);
      }
    }

    for (let [ele, freq] of frequency) {
      bucket[freq] =
        bucket[freq] || new Set().add({ title: ele, frequency: freq });
    }

    for (let i = bucket.length; i >= 0; i--) {
      if (bucket[i]) {
        result.push(...bucket[i]);
      }
      if (result.length >= k) {
        break;
      }
    }
    return result;
  }

  function getDaysOfWeek(arr) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    for (let ele of arr) {
      let yearMonthDay = ele.time.slice(0, 10);
      dateArr.push(days[new Date(yearMonthDay).getDay()]);
    }
    return dateArr;
  }

  function handleClick() {
    setIsButtonVisible(!isButtonVisible);
  }

  getDaysOfWeek(DATA);
  return (
    <div className="App">
      {isButtonVisible ? (
        <>
          <button onClick={handleClick}>Click to Render Data</button>
        </>
      ) : (
        <div id="lists">
          <h2>Top 10 Most Listened Songs</h2>
          <ol id="song-list">
            {mostFrequent(DATA, "title", 10).map((element, index) => (
              <li>
                <RankedItem
                  key={index}
                  title={element.title.slice(8)}
                  frequency={element.frequency}
                />
              </li>
            ))}
          </ol>
          <h2>Day Most Listened On</h2>
          <ol id="date-list">
            {mostFrequent(dateArr, null, 7).map((element, index) => (
              <li>
                <RankedItem
                  key={index}
                  title={element.title}
                  frequency={element.frequency}
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
