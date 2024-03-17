import React from 'react'

function Skeleton() {
  return (
    <>
    <div className="flex-shrink-0 m-6 relative overflow-hidden bg-gray-200 rounded-lg max-w-xs shadow-lg cursor-pointer animate-pulse">
    <span className="bg-gray-300 rounded-full ml-6 h-8 w-24 justify-between px-3 mt-3 py-2 leading-none flex items-center animate-pulse"></span>
    <svg
        className="absolute bottom-0 left-0 mb-8"
        viewBox="0 0 375 283"
        fill="none"
        style={{ transform: "scale(1.5)", opacity: "0.1" }}
    >
        <rect
            x="159.52"
            y={175}
            width={152}
            height={152}
            rx={8}
            transform="rotate(-45 159.52 175)"
            fill="white"
        />
        <rect
            y="107.48"
            width={152}
            height={152}
            rx={8}
            transform="rotate(-45 0 107.48)"
            fill="white"
        />
    </svg>
    <div className="relative pt-10 px-10 flex items-center justify-center">
        <div
            className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
            style={{
                background: "radial-gradient(black, transparent 60%)",
                transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                opacity: "0.2"
            }}
        ></div>
        <div className="w-40 h-40 bg-gray-300 rounded-full animate-pulse"></div>
    </div>
    <div className="relative text-gray-400 px-6 pb-6 mt-6">
        <span className="block opacity-75 -mb-1 animate-pulse">Syllabus</span>
        <div className="flex justify-between">
            <span className="block font-semibold text-xl animate-pulse">CLASS</span>
            <span className="bg-gray-300 rounded-full text-gray-400 text-xs font-bold px-3 py-2 leading-none flex items-center animate-pulse">Time</span>
        </div>
        <div className="flex flex-col">
            <span className="block font-semibold opacity-80 text-l animate-pulse">Tutor: Name</span>
        </div>
    </div>
</div>

    </>
  )
}

export default Skeleton