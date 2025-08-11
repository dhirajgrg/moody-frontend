import React from "react"

const SongList = ({ song }) => {
	const { title, artist, songUrl } = song
	return (
		<div>
			{songUrl && (
				<div className="flex items-center rounded-full bg-zinc-100 drop-shadow-md shadow-md px-6 gap-4">
					<h1>title-{title}</h1>
					<p>artist-{artist}</p>
					<audio autoPlay controls src={songUrl}></audio>
				</div>
			)}
		</div>
	)
}

export default SongList
