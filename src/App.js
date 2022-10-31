import listen_history from "./data/listen_history.json";
function App() {
  const DATA = listen_history;

  function mostFrequent(arr, k) {
    const frequency = new Map();
    const bucket = [];
    const result = [];

    for (let ele of arr) {
      frequency.set(ele.title, (frequency.get(ele.title) || 0) + 1);
    }

    for (let [ele, freq] of frequency) {
      bucket[freq] = new Set().add({ title: ele, frequency: freq });
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

  console.log(mostFrequent(DATA, 10));

  return <div className="App">It's an app!.</div>;
}

export default App;
