import React, { useRef, useEffect } from "react"
import * as faceapi from "face-api.js"

export default function MoodyDetector({ expression, setExpression }) {
	const videoRef = useRef()

	useEffect(() => {
		const MODEL_URL = "/models"

		const loadModelsAndStart = async () => {
			await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
			await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
			startVideo()
		}

		const startVideo = () => {
			navigator.mediaDevices
				.getUserMedia({ video: {} })
				.then((stream) => {
					videoRef.current.srcObject = stream
				})
				.catch((err) => console.error("Error accessing webcam:", err))
		}

		loadModelsAndStart()
	}, [])

	// New function to detect mood on demand
	const detectMood = async () => {
		if (!videoRef.current || videoRef.current.readyState !== 4) {
			console.log("Video not ready")
			return
		}

		const detections = await faceapi
			.detectSingleFace(
				videoRef.current,
				new faceapi.TinyFaceDetectorOptions()
			)
			.withFaceExpressions()

		if (!detections) {
			console.log("No mood detected")
			setExpression(null)
			return
		}

		const expressions = detections.expressions
		let maxExpression = "neutral"
		let maxValue = 0

		for (const [expr, value] of Object.entries(expressions)) {
			if (value > maxValue) {
				maxValue = value
				maxExpression = expr
			}
		}

		setExpression(maxExpression)
	}

	const handleMoodSubmit = () => {
		detectMood()
		console.log("clicked")
	}

	return (
		<div className="container mx-auto flex flex-col items-center py-4">
			<div>
				<video
					ref={videoRef}
					autoPlay
					muted
					width="400"
					height="300"
					style={{ borderRadius: 8 }}
				/>
			</div>
			<div className="flex items-center flex-col">
				<button
					onClick={handleMoodSubmit}
					className="bg-blue-700 py-2 px-6 font-semibold text-white rounded-full mt-4">
					Detect Mood
				</button>
				<div>
					{expression ? (
						<p className="mt-4 text-lg font-semibold">
							Detected Mood: {expression}
						</p>
					) : (
						<p className="mt-4 text-lg font-semibold">
							No mood detected
						</p>
					)}
				</div>
			</div>
		</div>
	)
}
