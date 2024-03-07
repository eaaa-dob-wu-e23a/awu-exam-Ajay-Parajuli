import UserAvatar from "./UserAvatar";

export default function EventCard({ post }) {
  // Check if post exists and if post.image is not null
  return (
    <article className="relative shadow-inner mb-8 p-2 border rounded lg:w-[400px] xl:w-[500px]">
  <UserAvatar user={post.created_by} />
  <div className="relative">
    <img className="rounded-md" src={post.image} alt={post.description} />
    <div className="bottom-0 left-0 absolute bg-white bg-opacity-75 p-2 w-[80%] rounded">
      <h3 className="font-medium">{post.description}</h3>
      <p>Available slots: {post.maxParticipants}</p>
      <p>Event at: {post.address.city}, {post.address.street} {post.address.houseNumber} </p>

    </div>
  </div>
</article>

  );
}
