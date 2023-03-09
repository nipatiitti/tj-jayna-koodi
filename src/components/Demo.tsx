import * as cocoSsd from "@tensorflow-models/coco-ssd"
import "@tensorflow/tfjs-backend-cpu"
import "@tensorflow/tfjs-backend-webgl"
import { useEffect, useRef, useState } from "react"
import { Loading } from "./Loading"

const isUserMediaSupported = () =>
  !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) && document.documentElement.clientWidth > 640

export const Demo = () => {
  const videoTag = useRef<HTMLVideoElement>(null)
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null)
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const [predictions, setPredictions] = useState<cocoSsd.DetectedObject[]>([])

  const startVideo = async () => {
    if (videoTag.current) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      setCameraEnabled(true)
      videoTag.current.srcObject = stream
      videoTag.current.addEventListener("loadeddata", predictWebcam)
    }
  }

  const stopVideo = () => {
    if (videoTag.current) {
      videoTag.current.srcObject = null
      videoTag.current.removeEventListener("loadeddata", predictWebcam)
      setCameraEnabled(false)
    }

    setPredictions([])
  }

  const predictWebcam = async () => {
    if (!model || !videoTag.current?.srcObject) return

    const newPredictions = await model.detect(videoTag.current)
    setPredictions(newPredictions.filter((prediction) => prediction.score > 0.66 && prediction.class === "person"))
    window.requestAnimationFrame(predictWebcam)
  }

  useEffect(() => {
    const loadModel = async () => {
      const model = await cocoSsd.load()
      setModel(model)
    }

    // Don't load on mobile
    if (isUserMediaSupported()) loadModel()
  }, [])

  return isUserMediaSupported() ? (
    <div className="flex items-center flex-col">
      <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight lg:text-4xl my-4">
        Tamperelaisen tunnistin demo
      </h2>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6 relative overflow-x-auto">
          <video autoPlay ref={videoTag} className="w-full h-auto min-w-min">
            <source src="/video-placeholder.mp4" type="video/mp4" />
          </video>
          {predictions.map((prediction, index) => (
            <div
              key={index}
              className="mx-4 my-5 sm:m-6"
              style={{
                position: "absolute",
                top: prediction.bbox[1],
                left: prediction.bbox[0],
                width: prediction.bbox[2],
                height: prediction.bbox[3],
                background: "rgba(0, 255, 0, 0.048)",
                border: "2px dashed #6bcffd",
                borderRadius: "4px",
                zIndex: 1,
              }}
            >
              <span className="absolute top-2 left-2 transform bg-white px-2 py-1 text-xs font-semibold rounded-full text-gray-900">
                {`Selkee Tamperelainen ${Math.round(prediction.score * 100)}% tarkkuudella!`}
              </span>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-center items-center">
          {!model ? (
            <>
              <Loading />
              <div className="ml-4 text-sm text-gray-500">
                <p>Odota, lataamme AI mallia... Tässä saattaa mennä hetki</p>
              </div>
            </>
          ) : cameraEnabled ? (
            <button
              type="button"
              className="rounded-md bg-white py-2.5 px-3.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={stopVideo}
            >
              Pysäytä kamera
            </button>
          ) : (
            <button
              type="button"
              className="rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={startVideo}
            >
              Käynnistä kamera
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Demo ei ole tuettu tässä selaimessa</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Valitettavasti tällä hetkellä demo ei tue mobiililaitteita.</p>
        </div>
      </div>
    </div>
  )
}
