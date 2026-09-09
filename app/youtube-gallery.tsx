"use client";

import { useState } from "react";
import { LineArrow } from "./line-arrow";

const videos = [
  "UcIaaAsZbNQ",
  "kBtZKAc581c",
  "PYp8ftdC-Lw",
  "Hq1kjCIE1tE",
  "cnT-m4wspdY",
  "62fUfbJKM_A",
  "3052bnP1KhQ",
  "TYdYxblhzgE",
  "NsTqQDEzM1c",
  "Up19Bxxa5_8",
] as const;

export function YouTubeGallery() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="video-grid" aria-label="Selected YouTube videos">
      {videos.map((id, index) => {
        const number = String(index + 1).padStart(2, "0");
        const isActive = activeVideo === id;

        return (
          <article className="video-card" key={id} data-reveal>
            <div className="video-frame">
              {isActive ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                  title={`Amir Shamani — YouTube video ${number}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <button
                  className="video-preview"
                  type="button"
                  onClick={() => setActiveVideo(id)}
                  aria-label={`Play YouTube video ${number}`}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    width="480"
                    height="360"
                  />
                  <span className="video-play" aria-hidden="true"><i /></span>
                </button>
              )}
            </div>
            <div className="video-caption">
              <span>FILM / {number}</span>
              <a href={`https://youtu.be/${id}`} target="_blank" rel="noreferrer">
                View on YouTube <LineArrow />
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
