import { fetchInstagramPosts } from "@/lib/instagram";

export default async function Gallery() {
  const posts = await fetchInstagramPosts(16);
  console.log(posts, "fetched Instagram posts"); // Debug log to verify posts are fetched correctly

  return (
    <section className="section section--cream" id="gallery">
      <div className="container">
        <p className="section__label text-center">Gallery</p>
        <h2 className="section__title text-center">Keep every frame</h2>
        <p
          className="section__lead text-center"
          style={{ marginInline: "auto", marginBottom: "2rem" }}
        >
          A living gallery — always showing the latest work from Instagram.
        </p>
        {posts.length > 0 ? (
          <div className="gallery-grid">
            {posts.map((post) => {
              const imgSrc =
                post.media_type === "VIDEO"
                  ? (post.thumbnail_url ?? post.media_url)
                  : post.media_url;
              const firstLine =
                post.caption?.split("\n")[0]?.slice(0, 80) ?? "";
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
                      src={imgSrc}
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
        ) : (
          <p className="text-center" style={{ opacity: 0.5 }}>
            Gallery coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
