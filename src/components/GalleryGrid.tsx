"use client";

import { useState } from "react";
import type { InstagramPost } from "@/lib/instagram";

const INITIAL = 16;
const INCREMENT = 8;

export default function GalleryGrid({ posts }: { posts: InstagramPost[] }) {
  const [visible, setVisible] = useState(INITIAL);
  const shown = posts.slice(0, visible);
  const hasMore = visible < posts.length;

  return (
    <>
      <div className="gallery-grid">
        {shown.map((post) => {
          const firstLine = post.caption?.split("\n")[0]?.slice(0, 80) ?? "";
          const altText = firstLine || "Instagram post by eben";

          return (
            <figure key={post.id}>
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.media_url}
                  alt={altText}
                  width={900}
                  height={900}
                  loading="lazy"
                />
              </a>
              {firstLine && <figcaption>{firstLine}</figcaption>}
            </figure>
          );
        })}
      </div>

      {hasMore && (
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <button
            className="btn btn--primary"
            onClick={() => setVisible((v) => v + INCREMENT)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}
