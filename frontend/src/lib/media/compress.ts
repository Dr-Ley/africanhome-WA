const maxVideoWidth = 1280;
const videoBitsPerSecond = 1_000_000;

function renamed(file: File, extension: string, type: string) {
  const stem = file.name.replace(/\.[^.]+$/, "") || "safari-media";
  return new File([file], `${stem}.${extension}`, { type });
}

async function canvasBlob(canvas: HTMLCanvasElement, type: string) {
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type));
}

async function compressImage(file: File) {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("This browser could not compress the image.");
  context.drawImage(bitmap, 0, 0);
  bitmap.close();
  const png = await canvasBlob(canvas, "image/png");
  if (!png) throw new Error("This image could not be compressed.");
  const stem = file.name.replace(/\.[^.]+$/, "") || "safari-photo";
  const compressed = new File([png], `${stem}.png`, { type: "image/png" });
  return compressed.size < file.size ? compressed : file;
}

async function compressVideo(file: File, onProgress?: (label: string) => void) {
  const video = document.createElement("video");
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  video.src = URL.createObjectURL(file);
  video.className = "pointer-events-none fixed top-0 left-0 h-px w-px opacity-0";
  document.body.append(video);
  try {
    await new Promise<void>((resolve, reject) => {
      video.onloadedmetadata = () => resolve();
      video.onerror = () => reject(new Error("This video could not be read."));
    });
    if (!Number.isFinite(video.duration) || video.duration <= 0) {
      throw new Error("This video has no duration to compress.");
    }
    const scale = Math.min(1, maxVideoWidth / Math.max(video.videoWidth, 1));
    const width = Math.max(2, Math.round(video.videoWidth * scale));
    const height = Math.max(2, Math.round(video.videoHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("This browser could not compress the video.");
    const stream = canvas.captureStream(24);
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp8")
      ? "video/webm;codecs=vp8"
      : "video/webm";
    const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond });
    const chunks: Blob[] = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };
    const stopped = new Promise<Blob>((resolve) => {
      recorder.onstop = () => resolve(new Blob(chunks, { type: "video/webm" }));
    });
    recorder.start(250);
    await video.play();
    await new Promise<void>((resolve, reject) => {
      const timeout = window.setTimeout(() => reject(new Error("Video compression took too long.")), (video.duration + 8) * 1000);
      const draw = () => {
        if (video.ended || video.paused) return;
        context.drawImage(video, 0, 0, width, height);
        onProgress?.(`Compressing video… ${Math.min(99, Math.round((video.currentTime / video.duration) * 100))}%`);
        requestAnimationFrame(draw);
      };
      video.onended = () => {
        window.clearTimeout(timeout);
        resolve();
      };
      draw();
    });
    recorder.stop();
    stream.getTracks().forEach((track) => track.stop());
    const blob = await stopped;
    if (!blob.size) throw new Error("The compressed video was empty.");
    const compressed = new File([blob], `${file.name.replace(/\.[^.]+$/, "") || "safari-video"}.webm`, {
      type: "video/webm",
    });
    return compressed.size < file.size ? compressed : renamed(file, file.name.split(".").pop() || "mp4", file.type);
  } finally {
    URL.revokeObjectURL(video.src);
    video.remove();
  }
}

export async function compressForUpload(file: File, onProgress?: (label: string) => void) {
  if (file.type.startsWith("image/")) {
    onProgress?.("Compressing image…");
    return compressImage(file);
  }
  if (file.type.startsWith("video/")) {
    onProgress?.("Compressing video…");
    return compressVideo(file, onProgress);
  }
  throw new Error("Choose an image or a video file.");
}
