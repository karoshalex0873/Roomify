import { CheckCircle2, ImageIcon, UploadIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router";

import {
  PROGRESS_INTERVAL_MS,
  PROGRESS_STEP,
  REDIRECT_DELAY_MS,
} from "lib/constants";

type UploadProps = {
  onComplete: (base64Data: string) => void;
};

const Upload = ({ onComplete }: UploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const { isSignedIn } = useOutletContext<AuthContext>()

  const intervalIdRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalIdRef.current !== null) {
        window.clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  const processFile = (nextFile: File) => {
    if (!isSignedIn) return;

    if (intervalIdRef.current !== null) {
      window.clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }

    setFile(nextFile);
    setProgress(0);

    const reader = new FileReader();

    reader.onload = () => {
      const base64Data = typeof reader.result === "string" ? reader.result : "";
      if (!base64Data) return;

      intervalIdRef.current = window.setInterval(() => {
        setProgress((prev) => {
          const next = Math.min(100, prev + PROGRESS_STEP);

          if (next >= 100) {
            if (intervalIdRef.current !== null) {
              window.clearInterval(intervalIdRef.current);
              intervalIdRef.current = null;
            }

            window.setTimeout(() => {
              onComplete(base64Data);
            }, REDIRECT_DELAY_MS);
          }

          return next;
        });
      }, PROGRESS_INTERVAL_MS);
    };

    reader.readAsDataURL(nextFile);
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSignedIn) return;
    setIsDragging(true);
  };

  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSignedIn) return;
    setIsDragging(true);
  };

  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (!isSignedIn) return;

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;
    processFile(droppedFile);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isSignedIn) return;
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    processFile(selectedFile);
  };

  return (
    <div className="upload">
      {!file ? (
        <div
          className={`dropzone ${isDragging ? "is-dragging" : ""}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="drop-input"
            accept=".jpg,.jpeg,.png"
            disabled={!isSignedIn}
            onChange={handleChange}
          />

          <div className="drop-content">
            <div className="drop-icon">
              <UploadIcon size={20} />
            </div>
            <p>
              {isSignedIn ? (
                "Click or upload or just drag and drop your floor plan here"
              ) : (
                "Sign in or sign up with puter to upload"
              )}
            </p>
            <p className="help">Maximum  file size is 50MB</p>
          </div>

        </div>
      ) : (
        <div className="upload-status">
          <div className="status-content">
            <div className="status-icon">
              {progress === 100 ? (
                <CheckCircle2 className="check" />
              ) : (
                <ImageIcon className="image" />
              )}
            </div>
            <h3>{file.name}</h3>
            <div className="progress">
              <div className="bar" style={{ width: `${progress}%` }}
              />
              <p className="status-text">
                {progress < 100 ? `Analyzing floor plan ...` : `Redirecting ...`}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Upload
