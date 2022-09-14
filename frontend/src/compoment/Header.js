import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
const Header = () => {
    const [activeTab, SetActiveTab] = useState('Home');

    const localtion = useLocation();
    useEffect(() => {
        if (localtion.pathname === "/") {
            SetActiveTab("Home")

        }
    }, [localtion])
    return (
        <div className="header">
            <p className="logo"> Product </p>
            <div className="header-right">
                <Link to="/">
                    <p className={`${activeTab === "Home" ? "active" : ""}`} onClick={() => SetActiveTab("Home")}>Home </p>
                </Link>

            </div>

        </div>
    )
}

export default Header