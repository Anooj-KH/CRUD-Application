import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Userdata = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newUser, setNewUser] = useState({
        name: { firstname: '', lastname: '' },
        username: '',
        email: '',
        phone: '',
        address: { city: '', street: '' },
        password: ''
    });

    useEffect(() => {
        axios.get('https://fakestoreapi.com/users')
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleDelete = (id) => {
        const updatedData = data.filter((user) => user.id !== id);
        setData(updatedData);

        axios.delete(`https://fakestoreapi.com/users/${id}`)
            .then(() => {
                console.log(`User with ID ${id} deleted successfully.`);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleEditClick = (user) => {
        setCurrentUser(user);
        setShowModal(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        axios.put(`https://fakestoreapi.com/users/${currentUser.id}`, currentUser)
            .then((res) => {
                const updatedUsers = data.map((user) =>
                    user.id === currentUser.id ? res.data : user
                );
                setData(updatedUsers);
                setShowModal(false);
            })
            .catch((err) => console.error(err));
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;

        setNewUser((prev) => {
            const updatedUser = { ...prev };

            if (name === "firstname" || name === "lastname") {
                updatedUser.name = updatedUser.name || {};
                updatedUser.name[name] = value;
            }
            else if (name === "city" || name === "street") {
                updatedUser.address = updatedUser.address || {};
                updatedUser.address[name] = value;
            }
            else {
                updatedUser[name] = value;
            }
            return updatedUser;
        });
    };

    const handleAddUser = (e) => {
        e.preventDefault();


        const newUserWithId = {
            ...newUser,
            id: data.length ? data[data.length - 1].id + 1 : 1, // Generate unique ID
        };

        // Update the state with the new user
        setData((prevData) => [...prevData, newUserWithId]);

        // Reset the form and hide it
        setShowAddForm(false);
        setNewUser({
            name: { firstname: '', lastname: '' },
            username: '',
            email: '',
            phone: '',
            address: { city: '', street: '' },
            password: '',
        });
    };


    return (
        <div>
            <h1 className='text-center text-bold mt-5'>Employee Details</h1>
            <div className='container'>
                <button
                    className='btn btn-outline-primary mt-5 fs-5 text-bold'
                    style={{ width: "100%" }}
                    onClick={() => setShowAddForm(true)}
                >
                    ➕ Add New Employee Details
                </button>
                <div className='row'>
                    {data.map((user) => (
                        <div key={user.id} className='col-md-4 col-sm-6 mt-5'>
                            <div className='card' style={{
                                background: 'rgba(255, 255, 255, 0.3)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '20px',
                                boxShadow: 'rgba(35, 46, 58, 0.5) 0px 8px 24px'
                            }}>
                                <div className='card-body text-start mt-2'>
                                    <h3 className='text-center '>Employee id : {user.id}</h3>
                                    <h4 className="card-title mt-3"><span className='fw-bold'>Full Name : </span>
                                        {user.name.firstname} {user.name.lastname}
                                    </h4>
                                    <h5 className='card-text mt-3'><span className='fw-bold'>Username : </span> {user.username}</h5>
                                    <h5 className='card-text mt-3'><span className='fw-bold'>Email : </span>  {user.email}</h5>
                                    <h5 className='card-text mt-3'><span className='fw-bold'>Password : </span> {user.password}</h5>
                                    <h5 className='card-text mt-3'><span className='fw-bold'>Phone : </span>  {user.phone}</h5>
                                    <h5 className="card-text mt-3 mb-2"><span className='fw-bold'>Address : </span>
                                        {user.address.city || 'No City'} {user.address.street || 'No Street'}
                                    </h5>
                                    <div className='mt-4 text-end'>
                                        <button className='btn btn-danger' onClick={() => handleDelete(user.id)}>Delete</button>
                                        <button className='btn btn-warning ms-3' onClick={() => handleEditClick(user)}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}

                </div>
            </div>
            {showAddForm && (
                <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New User</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAddForm(false)}></button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleAddUser}>
                                    <div className="mb-3">
                                        <label className="form-label">First Name :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="firstname"
                                            value={newUser.name.firstname}
                                            onChange={handleAddChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Last Name :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lastname"
                                            value={newUser.name.lastname}
                                            onChange={handleAddChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Username :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={newUser.username}
                                            onChange={handleAddChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email :</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={newUser.email}
                                            onChange={handleAddChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Phone :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            value={newUser.phone}
                                            onChange={handleAddChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">City :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="city"
                                            value={newUser.address.city}
                                            onChange={handleAddChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Street :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="street"
                                            value={newUser.address.street}
                                            onChange={handleAddChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password :</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={newUser.password}
                                            onChange={handleAddChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">
                                        Add User
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {showModal && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit User</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body text-start">
                                <form onSubmit={handleUpdate}>
                                    <div className="mb-3">
                                        <label className="form-label">First Name :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={currentUser.name.firstname}
                                            onChange={(e) =>
                                                setCurrentUser({
                                                    ...currentUser,
                                                    name: { ...currentUser.name, firstname: e.target.value },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Last Name :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={currentUser.name.lastname}
                                            onChange={(e) =>
                                                setCurrentUser({
                                                    ...currentUser,
                                                    name: { ...currentUser.name, lastname: e.target.value },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email :</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={currentUser.email}
                                            onChange={(e) =>
                                                setCurrentUser({ ...currentUser, email: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Phone :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={currentUser.phone}
                                            onChange={(e) =>
                                                setCurrentUser({ ...currentUser, phone: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">City :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={currentUser.address.city}
                                            onChange={(e) =>
                                                setCurrentUser({
                                                    ...currentUser,
                                                    address: { ...currentUser.address, city: e.target.value },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Street :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={currentUser.address.street}
                                            onChange={(e) =>
                                                setCurrentUser({
                                                    ...currentUser,
                                                    address: { ...currentUser.address, street: e.target.value },
                                                })
                                            }
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100">Save Changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
