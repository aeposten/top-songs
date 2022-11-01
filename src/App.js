import { useState } from "react";
import listen_history from "./data/listen_history.json";
import RankedItem from "./RankedItem";

function App() {
  const DATA = listen_history;
  const dateArr = [];

  //Sets initial state for button or data visibility on the page
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  function mostFrequent(arr, category, k) {
    const frequency = new Map();
    const itemsByFrequency = [];
    const result = [];

    //for every element of the array store the frequency of each element in the array in the frequency hash table (Map), does this based on if "category" was passed in to mostFrequent()
    for (let ele of arr) {
      if (category) {
        frequency.set(ele[category], (frequency.get(ele[category]) || 0) + 1);
      } else {
        frequency.set(ele, (frequency.get(ele) || 0) + 1);
      }
    }

    //Can use code bellow if you want songs with repeated frequencies as opposed to just returning one song (the first) with a specified frequency, just be sure to comment out lines 33-37 when using this instead
    // for (let [ele, freq] of frequency) {
    //   itemsByFrequency[freq] =
    //    [ ...itemsByFrequency[freq] || [], ({ title: ele, frequency: freq })]
    // }

    //Iterate over "frequency" array and store the frequency of the element in the corresponding index as a set
    for (let [ele, freq] of frequency) {
      itemsByFrequency[freq] =
        itemsByFrequency[freq] ||
        new Set().add({ title: ele, frequency: freq });
    }

    
    //Iterates backward over itemsByFrequency pushing elements to results array until desired number of elements (k) is reached
    for (let i = itemsByFrequency.length; i >= 0; i--) {
      if (itemsByFrequency[i]) {
        result.push(...itemsByFrequency[i]);
      }
      if (result.length >= k) {
        break;
      }
    }
    return result;
  }


  //Creates an array containing the days of the week on which each song was listened
  function getDaysOfWeek(arr) {

    //.getDay returns a number between 0 and 6 corresponding to the day of the week
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    //Iterates over array creating a new array containing day of the week
    for (let ele of arr) {
      //Grabs the year-month-day string from the "time" in the listening data
      let yearMonthDay = ele.time.slice(0, 10);
      //parses day of the week from the yearMonthDay string
      dateArr.push(days[new Date(yearMonthDay).getDay()]);
    }
    //Returns dateArr that can be passed into the mostFrequent function 
    return dateArr;
  }

  getDaysOfWeek(DATA);

  //Used to render data on page on click
  function handleClick() {
    setIsButtonVisible(!isButtonVisible);
  }



  return (
    <div className="App">
      {/* Conditionally renders button and data visibility */}
      {isButtonVisible ? (
        <>
          <button onClick={handleClick}>Click to Render Data</button>
        </>
      ) : (
        <div id="lists">
          <section className="list">
            <h2>Top 10 Songs</h2>
            <ol id="song-list">
              {mostFrequent(DATA, "title", 10).map((element, index) => (
                <li>
                  <RankedItem
                    key={index}
                    song={element.title.slice(8)}
                    frequency={element.frequency}
                  />
                </li>
              ))}
            </ol>
          </section>
          <section className="list">
            <h2>Day Most Listened On</h2>
            <ol id="date-list">
              {mostFrequent(dateArr, null, 7).map((element, index) => (
                <li>
                  <RankedItem
                    key={index}
                    day={element.title}
                    frequency={element.frequency}
                  />
                </li>
              ))}
            </ol>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
