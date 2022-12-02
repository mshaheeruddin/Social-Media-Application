import "./closeFriend.css";
const PF = process.env.REACT_APP_PUBLIC_FOLDER

export default function CloseFriend({user}) {
  const udp =user.profilePicture 
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={`${PF}${udp}`} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}