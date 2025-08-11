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
			.get(`http://localhost:3000/songs/${expression}`)
			.then((res) => {
				setSong(res.data.song)
			})
			.catch((err) => {
				console.log("error fetching song", err)
				setSong({})
			})
	}, [expression])

	return (
		<div className="h-full flex flex-col items-center justify-center bg-zinc-200 pt-10 ">
			<h1 className="text-4xl font-bold mb-4  ">moody player</h1>
			<MoodyDetector
				expression={expression}
				setExpression={setExpression}
			/>

			<SongList song={song} />
		</div>
	)
}

export default App
