import React from "react"

const SongList = ({ song }) => {
	const { title, artist, songUrl } = song
	return (
		<div>
			{songUrl && (
				<div className="bg-zinc-100 shadow-md px-4 py-2 md:py-1 rounded-lg md:w-full md:rounded-full md:flex md:flex-row md:justify-center md:px-10">
					<div className="md:full  flex items-center gap-4">
						<h1>title-{title}</h1>
						<p>artist-{artist}</p>
					</div>
					<div className="bg-zinc-100">
						<audio controls src={songUrl}></audio>
					</div>
				</div>
			)}
		</div>
	)
}

export default SongList
