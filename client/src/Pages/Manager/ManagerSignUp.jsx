import { useState } from "react";
import '../css/AdminRegister.css'


function ManagerSignUp() {
    const [order, setOrder] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setOrder((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/manager_signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order),
            });

            const data = await res.json(); // Parse JSON response

            if (res.ok && data.success) {
                alert("Account created successfully! Please check your email.");

                const emailResponse = await fetch('/api/auth/manager_send_email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: order.email }), // Send only the email
                });

                const emailData = await emailResponse.json(); // Parse JSON response

                if (emailResponse.ok && emailData.success) {
                    console.log("Thank you email sent to:", order.email);
                }
            } else {
                throw new Error(data.message || 'Failed to create account');
            }
        } catch (error) {
            console.log('Something went wrong!', error.message);
        }
    };

    return (
        <div id="package-body">
        
            <div className="add-order">
                <div id="package-form">
                    <h2><b>Admin</b></h2>
                    <form onSubmit={handleSubmit}>
                        <label>Username:</label>
                        <input type="text" id="username" name="username" onChange={handleOnChange} />

                        <label>Email:</label>
                        <input type="text" id="email" name="email" onChange={handleOnChange} />

                        <label>Password:</label>
                        <input type="text" id="password" name="password" onChange={handleOnChange} />

                        <button type="submit">Register</button>
                    </form>
                    <br />
                </div>
            </div>
        </div>
    );
}

export default ManagerSignUp;
