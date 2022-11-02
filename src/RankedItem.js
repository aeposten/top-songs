import React from "react";
function RankedItem({ frequency, day, song }) {
  return (
    <>
      {/* conditionally renders song or day data based on prop passed in to RankedItem component in App.js */}
      {song && (
        <div>
          Song Name - <span>{song}</span>
          <p>Times Listened To - {frequency}</p>
        </div>
      )}
      {day && (
        <div>
          Day - {day} <p>Songs Listened To - {frequency}</p>
        </div>
      )}
    </>
  );
}
export default RankedItem;
