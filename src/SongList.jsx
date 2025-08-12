import React from "react"

const SongList = ({ songs }) => {
	if (!Array.isArray(songs) || songs.length === 0) {
		return <p>No songs found</p>
	}

	return (
		<div className="space-y-4">
			{songs.map((s, index) => (
				<div
					key={index}
					className="bg-zinc-100 shadow-md px-4 py-2 md:py-1 rounded-lg md:w-full md:rounded-full md:flex md:flex-row md:justify-between md:px-10">
					<div className="flex items-center gap-4">
						<h1>title - {s.title}</h1>
						<p>artist - {s.artist}</p>
					</div>
					<div>
						<audio controls src={s.songUrl}></audio>
					</div>
				</div>
			))}
		</div>
	)
}

export default SongList
