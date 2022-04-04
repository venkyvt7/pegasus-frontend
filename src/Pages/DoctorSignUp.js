import React from 'react';
import Footer from '../Basic/Footer';
import Navbar from '../Basic/Navbar';
import LoginForm from '../DoctorSignUp/SignUpForm';

const DoctorSignUp = () => {
    return (
        <div >
            <div style={{ height: "70vh" }}>
                <Navbar />
                <LoginForm />
            </div>

            <div className="fixed-bottom" style={{ width: "100%" }}>
                <Footer />
            </div>
        </div>
    )
}

export default DoctorSignUp;