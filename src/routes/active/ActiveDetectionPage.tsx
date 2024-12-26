import recognitionAPI from "@/api/recognitionAPI";
import { activeState } from "@/atoms/activeState";
import { statusState } from "@/atoms/statusState";
import FaceAlignmentPopup from "@/components/face/FaceAlignmentPopup";
import ReadWordPopup from "@/components/popup/readWord/ReadWordPopup";
import SuccessPopup from "@/components/popup/sucess/SuccessPopup";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useRecoilValue, useSetRecoilState } from "recoil";

const service = new recognitionAPI(import.meta.env.VITE_BASE_URI);

export default function ActiveDetectionPage() {
  const [success, setSuccess] = useState<boolean>(false);
  const [wordPopup, setWordPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태 추가\
  const webcamRef = useRef<Webcam>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);

  // const [active, setActive] = useRecoilState(activeState);
  const active = useRecoilValue(activeState);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [videoChunks, setVideoChunks] = useState<Blob[]>([]);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const setStatus = useSetRecoilState(statusState);

  const navigate = useNavigate();

  // active 상태에 따라 녹화 시작 및 종료
  useEffect(() => {
    if (active.status === true) {
      console.log("startRecording");
      startVideoRecording();
      startAudioRecording();
    } else {
      console.log("stopRecording");
      stopVideoRecording();
      stopAudioRecording();
      if (videoChunks.length !== 0 && audioChunks.length !== 0) {
        postFile();
      }
    }
  }, [active.status, videoChunks, audioChunks]);

  const startVideoRecording = () => {
    if (webcamRef.current && webcamRef.current.stream) {
      const options = { mimeType: "video/webm" };
      mediaRecorderRef.current = new MediaRecorder(
        webcamRef.current.stream,
        options
      );

      // 녹화된 데이터를 recordedChunks에 저장
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setVideoChunks((prev) => [...prev, event.data]);
        }
      };

      mediaRecorderRef.current.start();
      console.log("녹화 시작");
    }
  };

  const startAudioRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    if (stream) {
      const options = {
        mimeType: "audio/webm", // mp3 오디오
      };
      const recorder = new MediaRecorder(stream, options);

      recorderRef.current = recorder;
      recorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks((prev) => [...prev, event.data]);
        }
      };
      recorderRef.current.start();
      console.log("오디오 녹음 시작");
    }
  };

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      // saveRecording();
      console.log("녹화 종료");
    }
  };

  const stopAudioRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stop();
    }
  };

  // const saveRecording = () => {
  //   // 비디오 저장
  //   if (videoChunks.length) {
  //     const blob = new Blob(videoChunks, { type: "video/webm" });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "recorded-video.webm";
  //     a.click();
  //     URL.revokeObjectURL(url);
  //     setVideoChunks([]);
  //   }

  //   //오디오 저장
  //   if (audioChunks.length) {
  //     const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
  //     const audioUrl = URL.createObjectURL(audioBlob);

  //     const audioLink = document.createElement("a");
  //     audioLink.href = audioUrl;
  //     audioLink.download = "recorded-audio.webm";
  //     audioLink.click();
  //     URL.revokeObjectURL(audioUrl);
  //     setAudioChunks([]);
  //   }
  // };

  const generateFileName = useCallback((): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 2자리 월
    const day = String(now.getDate()).padStart(2, "0"); // 2자리 일
    const hours = String(now.getHours()).padStart(2, "0"); // 2자리 시간
    const minutes = String(now.getMinutes()).padStart(2, "0"); // 2자리 분
    const seconds = String(now.getSeconds()).padStart(2, "0"); // 2자리 초

    //형식 : name_YYYYMMDD_HHMMSS.jpeg
    return `_${year}${month}${day}_${hours}${minutes}${seconds}.webm`;
  }, []);

  const postFile = async () => {
    setLoading(true); // 로딩 시작
    const videoBlob = new Blob(videoChunks, { type: "video/webm" });
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });

    const formData = new FormData();
    const filename = generateFileName();
    formData.append("video", videoBlob, "video" + filename);
    formData.append("audio", audioBlob, "audio" + filename);

    try {
      const response = await service.active(formData);

      // console.log(response);

      if (response.status === 200) {
        //200이면
        console.log(response);

        const predictedSentence = response.data.predicted_sentence || "";
        console.log("Predicted Sentence:", predictedSentence);

        if (predictedSentence.includes("엄마")) {
          console.log("'엄마' 문자열이 포함되어 있습니다.");
          setWordPopup(false);
          setSuccess(true);

          // 2초 후 얼굴 인식 파트로
          setTimeout(() => {
            setStatus({ status: "active" });
            navigate("/recognition");
          }, 2000);
        } else {
          console.log("'엄마' 문자열이 포함되어 있지 않습니다.");
          alert(
            "추론 결과에 '엄마' 문자열이 포함되어 있지 않습니다.\npredictedSentence : " +
              predictedSentence
          );
          setSuccess(false);
        }

        setVideoChunks([]);
        setAudioChunks([]);
      }
    } catch (error) {
      console.log("active liveness detection 실패 : ", error);
      setSuccess(false);
      alert("active liveness detection에 실패했습니다.\n다시 한번 읽어주세요.");
    } finally {
      setLoading(false); //로딩 종료
    }
  };

  return (
    <div className="h-screen" onClick={() => setWordPopup(false)}>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[101]">
          <div className="text-white text-lg">로딩 중입니다...</div>
        </div>
      )}

      {success && (
        <span className="flex justify-center">
          <SuccessPopup content={`active liveness detection 완료!`} />
        </span>
      )}
      {wordPopup && (
        <span className="flex justify-center">
          <ReadWordPopup />
        </span>
      )}
      <span className="flex justify-center w-[100%]">
        <FaceAlignmentPopup />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWordPopup((prev) => !prev);
          }}
          className="bg-[#006FFD] fixed bottom-5 z-[49] py-2 px-5 text-white rounded-[12px] w-[21rem]"
        >
          active 검사하기
        </button>
      </span>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
