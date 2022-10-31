import listen_history from "./data/listen_history.json";
function App() {
  const DATA = listen_history;
  let dateArr = [];

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

  function getDate(arr) {
    for (let ele of arr) {
      dateArr.push(ele.time.slice(0, 10));
    }
    return dateArr;
  }

  getDate(DATA);
  console.log(mostFrequent(DATA, "title", 10));
  console.log(mostFrequent(dateArr, null, 7));

  return <div className="App">It's an app!.</div>;
}

export default App;
