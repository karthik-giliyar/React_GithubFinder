import React from 'react';
import UserItem from './UserItem';

const Users = (props) => {
    console.log(props.users);
    return(
      <div style={userStyles}>
          {props.users.map((user, index) => (
              <UserItem user={user}/>
          ))}
      </div>
    )
}


const userStyles = {
    display: 'grid',
    gridTemplateColumn:'repeat(3,1fr)',
    gridGap:'1rem'
}
export default Users;