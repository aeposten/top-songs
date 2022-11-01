import React from "react";
function RankedItem({ frequency, day, song }) {
  return (
    <>
      {song && (
        <div>
          Song Name - <span>{song}</span><p>Times Listened To - {frequency}</p>
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
