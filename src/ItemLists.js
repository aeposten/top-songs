import RankedItem from "./RankedItem";

function ItemLists({ DATA, dateArr, mostFrequent }) {
  return (
    <>
      <div id="lists">
        <section className="list">
          <h2>Top 10 Songs</h2>
          <ol id="song-list">
            {mostFrequent(DATA, "title", 10).map((element, index) => (
              <li key={index}>
                <RankedItem
                  song={element.title.slice(8)}
                  frequency={element.frequency}
                />
              </li>
            ))}
          </ol>
        </section>
        <section className="list">
          <h2>
            Listening Frequency <p>By Day</p>
          </h2>
          <ol id="date-list">
            {mostFrequent(dateArr, null, 7).map((element, index) => (
              <li key={index}>
                <RankedItem day={element.title} frequency={element.frequency} />
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
export default ItemLists;
