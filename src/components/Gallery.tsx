import { fetchInstagramPosts } from "@/lib/instagram";
import GalleryGrid from "./GalleryGrid";

export default async function Gallery() {
  const posts = await fetchInstagramPosts();
  console.log(78954,`Fetched ${posts.length} Instagram posts`, posts); // Debug log to verify fetched posts

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
          <GalleryGrid posts={posts} />
        ) : (
          <p className="text-center" style={{ opacity: 0.5 }}>
            Gallery coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
