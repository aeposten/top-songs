import React from "react";
function RankedItem({ frequency, day, song }) {
  return (
    <>
      {song && (
        <div>
          Song Name{song} Times Watched{frequency}
        </div>
      )}
      {day && (
        <div>
          Day of the Week{day} Songs Listened to{frequency}
        </div>
      )}
    </>
  );
}
export default RankedItem;
