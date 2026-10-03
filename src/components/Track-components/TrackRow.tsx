import React from "react";

const TrackRow = () => {
  return (
    <div className="flex items-center gap-4 px-6 py-4 bg-black hover:bg-gray-900 transition rounded-lg">
      {/* Track Number */}
      <div className="w-8 text-gray-500 text-lg font-semibold">01</div>

      {/* Album Art */}
      {/* <img
        src="https://via.placeholder.com/48"
        alt="As It Was"
        className="w-12 h-12 rounded object-cover"
      /> */}
      <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-400">
        IMG
      </div>

      {/* Track Info */}
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">As It Was</p>
        <p className="text-xs text-gray-400">Harry Styles • Harry's House</p>
      </div>

      {/* Duration */}
      <div className="text-xs text-gray-500 w-8 text-right">2:47</div>
    </div>
  );
};

export default TrackRow;
