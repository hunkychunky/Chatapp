import{ FaHorseHead, FaSmile } from 'react-icons/fa'
const UserList = ({users}) =>{
    // console.log(users);
    return (
        <div className="userlist-container">
            {users?.map(user => (
                <li key={user.id}>
                  {user.role == 'user' ? <FaHorseHead/> : <FaSmile/>}
                <p></p>
            </li>))}
        </div>
    )
}

export default UserList