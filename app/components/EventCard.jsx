import UserAvatar from "./UserAvatar";

export default function EventCard({ post }) {
  // Check if post exists and if post.image is not null
  return (
    <article className="shadow-inner mb-8 p-2 border rounded">
      <UserAvatar user={post.created_by} />
      <img className="rounded-md" src={post.image} alt={post.description} />
      <h3 className="mt-2 font-medium">{post.description}</h3>
      <p>Max: {post.maxParticipants}</p>
      <p>Event at: {post.address}</p>
    </article>
  );
}
