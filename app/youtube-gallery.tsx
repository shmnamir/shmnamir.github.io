"use client";

import { useEffect, useRef, useState } from "react";
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
  const [expanded, setExpanded] = useState(false);
  const [titles, setTitles] = useState<Record<string, string>>({});
  const fifthCard = useRef<HTMLElement>(null);
  const visibleVideos = expanded ? videos : videos.slice(0, 4);

  useEffect(() => {
    const controller = new AbortController();

    async function getOfficialTitle(id: string) {
      const videoUrl = `https://www.youtube.com/watch?v=${id}`;
      const endpoints = [
        `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`,
        `https://noembed.com/embed?url=${encodeURIComponent(videoUrl)}`,
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, { signal: controller.signal });
          if (!response.ok) continue;
          const metadata = await response.json() as { title?: unknown };
          if (typeof metadata.title === "string" && metadata.title.trim()) return metadata.title.trim();
        } catch {
          if (controller.signal.aborted) return null;
        }
      }
      return null;
    }

    Promise.all(videos.map(async (id) => [id, await getOfficialTitle(id)] as const)).then((results) => {
      if (controller.signal.aborted) return;
      const nextTitles: Record<string, string> = {};
      results.forEach(([id, title]) => {
        if (title) nextTitles[id] = title;
      });
      setTitles(nextTitles);
    });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const frame = window.requestAnimationFrame(() => fifthCard.current?.focus({ preventScroll: true }));
    return () => window.cancelAnimationFrame(frame);
  }, [expanded]);

  const showRemainingVideos = () => setExpanded(true);

  return (
    <>
    <div className="video-grid" aria-label="Selected YouTube videos" aria-live="polite">
      {visibleVideos.map((id, index) => {
        const number = String(index + 1).padStart(2, "0");
        const title = titles[id] ?? `Video ${number}`;
        const youtubeUrl = `https://youtu.be/${id}`;

        return (
          <article className={`video-card ${index >= 4 ? "video-card-new" : ""}`} key={id} ref={index === 4 ? fifthCard : undefined} tabIndex={index === 4 ? -1 : undefined}>
            <div className="video-frame">
              <a
                className="video-preview"
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${title} on YouTube in a new tab`}
              >
                <img
                  src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  width="480"
                  height="360"
                />
                <span className="video-play" aria-hidden="true"><i /></span>
              </a>
            </div>
            <h3><a className="video-title-link" href={youtubeUrl} target="_blank" rel="noreferrer">{title}</a></h3>
            <div className="video-caption">
              <span>FILM / {number}</span>
              <a href={youtubeUrl} target="_blank" rel="noreferrer">
                View on YouTube <LineArrow />
              </a>
            </div>
          </article>
        );
      })}
    </div>
    {!expanded && (
      <button className="show-more video-show-more" type="button" onClick={showRemainingVideos}>
        Show More <span aria-hidden="true">+06</span>
      </button>
    )}
    </>
  );
}
