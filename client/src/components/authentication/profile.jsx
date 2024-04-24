import React, { useState, useEffect } from 'react';

function Profile() {
    const [userData, setUserData] = useState({
        email: '',
        phone: '',
        fullName: '',
        intro: '',
        password: '',
        // Add more fields as needed
    });

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetchUserData(userId);
        }
    }, []);

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Fetch error:', error);
            // Handle fetch error
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Failed to update user data');
            }
            alert('Cập nhật thông tin thành công');
        } catch (error) {
            console.error('Update error:', error);
            alert('Cập nhật thông tin không thành công. Vui lòng thử lại sau.');
        }
    };

    return (
        <div>
            <h2>Thông tin cá nhân</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Số điện thoại:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="fullName">Họ và tên:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={userData.fullName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="intro">Giới thiệu:</label>
                    <textarea
                        id="intro"
                        name="intro"
                        value={userData.intro}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Add more input fields for other user data */}
                <button type="submit">Lưu thay đổi</button>
            </form>
        </div>
    );
}

export default Profile;
