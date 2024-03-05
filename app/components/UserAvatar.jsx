export default function UserAvatar({ user }) {
    // Check if user exists and if user.image is not null

    if (!user || !user.image) {
        return null; // or return a placeholder or loading state
      }
 
    return (
      <div className="flex border-gray-200 mb-2 pb-1 border-b-2">
        <img className="rounded-full w-[50px] h-[50px] object-cover" src={user.image} alt={user.firstname} />
        <span className="ml-2">
          <h3 className="font-medium">{user.firstname} {user.lastname}</h3>
          <p>{user.mail}</p>
        </span>
      </div>
    );
  }
  