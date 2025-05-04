import LogoutButton from './LogoutButton';

const Home = (props) => {
    const user = props.user
    const setUser = props.setUser;
    return ( 
        <div>
            User is: {user.username}
            <LogoutButton setUser={props.setUser}/>
        </div>
     );
}

export default Home ;