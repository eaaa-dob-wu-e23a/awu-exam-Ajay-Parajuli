import UserAvatar from "./UserAvatar";

export default function EventCard({ post }) {
  // Check if post exists and if post.image is not null
  if (!post || !post.image) {
    return null; // or return some fallback UI
  }

  return (
    <article className="relative shadow-inner mb-8 p-2 border rounded">
      <UserAvatar user={post.created_by} />
      <div className="">
        <div className="">
          <img className="rounded-md md:w-[800px] xl:w-[500px] object-cover" src={post.image} alt={post.description} />
        </div>
        <div className="bottom-0 left-0 absolute bg-white bg-opacity-75 pl-5 pt-2 pb-2 w-[80%] rounded">
          <h3 className="font-medium">{post.title}</h3>
          <p>Available slots: {post.maxParticipants}</p>
          <p>People Participating: {post.participants.length}</p> {/* Modified line */}
          {post.address && (
            <p>Event at: {post.address.city}, {post.address.street} {post.address.houseNumber}</p>
          )}
          <div className="ml-2 mt-2 mb-2">
            {post.tags && post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-white text-gray-800 text-[14px] px-2 py-1 rounded mr-1"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
