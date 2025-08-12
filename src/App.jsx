import React, { useEffect, useState } from "react"
import MoodyDetector from "./Mood.jsx"
import SongList from "./SongList.jsx"
import axios from "axios"

const App = () => {
	const [song, setSong] = useState({})
	const [expression, setExpression] = useState(null)

	useEffect(() => {
		if (!expression) return

		axios
			.get(`${import.meta.env.VITE_API_BASE_URL}/songs/${expression}`)

			.then((res) => {
				setSong(res.data.song)
			})
			.catch((err) => {
				console.log("error fetching song", err)
				setSong({})
			})
	}, [expression])

	return (
		<div className="min-h-screen w-full overflow-x-hidden flex flex-col items-center bg-zinc-200 pt-10 ">
			<h1 className="text-3xl  md:text-4xl font-bold mb-4 text-violet-700  ">
				moody player
			</h1>
			<MoodyDetector
				expression={expression}
				setExpression={setExpression}
			/>

			<SongList song={song} />
		</div>
	)
}

export default App
