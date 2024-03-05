import UserAvatar from "./UserAvatar";

export default function EventCard({ post }) {
  // Check if post exists and if post.image is not null
  return (
    <article className="post-card">
      <UserAvatar user={post.user} />
      <img src={post.image} alt={post.description} />
      <h3>{post.description}</h3>
      <p>Max: {post.maxPaticipants}</p>
      <p>Address: {post.address}</p>
    </article>
  );
}
