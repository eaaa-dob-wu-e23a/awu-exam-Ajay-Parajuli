export default function UserAvatar({ user }) {
    // Check if user exists and if user.image is not null
 
    return (
      <div className="avatar">
        <img src={user.image} alt={user.firstname} />
        <span>
          <h3>{user.firstname} {user.lastname}</h3>
          <p>{user.title}</p>
        </span>
      </div>
    );
  }
  