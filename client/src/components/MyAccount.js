import { useEffect, useState } from 'react'
import profilePictur from '../images/blank-profile-picture.png'
import './MyAccount.css';
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";


function MyAccount() {
    const [displayForm, setDisplayForm] = useState(false)
    const storedData = localStorage.getItem('userInfo');
    const userData = JSON.parse(storedData);
    const [user, setUser] = useState({
        name: "",
        lastName: '',
        email: '',
        phone: '',
        birthday: '',
        gener: [],
        favorites: []
    });
    const navigate = useNavigate()

    const getUser = (email) => {
        return fetch(`http://localhost:8000/api/users/${email}`).then(res => res.json())
    }

    useEffect(() => {
        getUser(userData.email).then(data => setUser(data.Data))
    }, [])

    function showForm() {
        setDisplayForm(prev => !prev)
    }


    function handelSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:8000/api/users/${user._id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
    }

    function deleteAccount() {
        fetch(`http://localhost:8000/api/users/${user._id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        localStorage.removeItem('userInfo')
        navigate('/')
    }


    return (
        <div className='my-account'>
            <div className="user-profile">
                <img src={profilePictur} alt="Profile" />
                <Button onClick={showForm} variant="primary" size="lg" active>Update Account</Button>
                <h2>{user.name}</h2>
                <div className='information'>
                    <p>Last name: {user.lastName ? user.lastName : "---"}</p>
                    <p>Email: {user.email ? user.email : "---"}</p>
                    <p>Phone: {user.phone ? user.phone : '---'}</p>
                    <p>Day of birth: {user.birthday ? user.birthday : "---"}</p>
                    <p>Favorite movies gener: {user.gener ? user.gener : "---"}</p>
                    <p>Favorites movies: {user.favorites.length ? user.favorites : "Add to Your Favorites"}</p>
                </div>
            </div>
            {displayForm &&
                <form onSubmit={handelSubmit}>
                    <hr style={{ width: "80%" }} />
                    <label htmlFor="name">Enter your First name:</label>
                    <input type="text" name="name" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})}/>
                    <label htmlFor="name">Enter your Last name</label>
                    <input type="text" name="surname" value={user.lastName} onChange={(e) => setUser({...user, lastName: e.target.value})}/>
                    <label htmlFor="name">Enter your e-mail</label>
                    <input type="text" name="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
                    <label htmlFor="name">Enter your phone number</label>
                    <input type="text" name="number" value={user.phone} onChange={(e) => setUser({...user, phone: e.target.value})}/>
                    <label htmlFor="name">Enter your day of birth</label>
                    <input type="date" name="date" onChange={(e) => setUser({...user, birthday: e.target.value})}/>
                    <label htmlFor="name">Choose your favorite kind of movies gener</label>
                    <select name="gener" onChange={(e) => {
                        const selectGener = e.target.value
                        setUser(prev => ({...prev, gener: [...prev.gener, selectGener]}))
                    }}>
                        <option value="First">---</option>
                        <option value="Action">Action</option>
                        <option value="Horror">Horror</option>
                        <option value="Drama">Drama</option>
                        <option value="Sci-fic">Sci-fic</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Romance">Romance</option>
                        <option value="Western">Western</option>
                        <option value="History">History</option>
                        <option value="Fantasy">Fantasy</option>
                    </select>
                    <Button type="submit" variant="primary" size="lg" active>Save</Button>
                </form>}
            <Button className="delete" variant="primary" size="lg" active onClick={deleteAccount}>Delete Account</Button>
        </div>
    )
}

export default MyAccount