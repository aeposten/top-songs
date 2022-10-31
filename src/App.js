import listen_history from "./data/listen_history.json";
function App() {
  const DATA = listen_history;
  let dateArr = [];


  function mostFrequent(arr, category, k) {
    const frequency = new Map();
    const bucket = [];
    const result = [];


    for (let ele of arr) {
      frequency.set(ele[category], (frequency.get(ele[category]) || 0) + 1);
    }

    for (let [ele, freq] of frequency) {
      bucket[freq] = (bucket[freq] || new Set().add({ title: ele, frequency: freq }))
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
      dateArr.push(ele.time.slice(0,10))
    }
    return dateArr
  }

  console.log(getDate(DATA))
  console.log(mostFrequent(DATA, "title", 10));

  return <div className="App">It's an app!.</div>;
}

export default App;
