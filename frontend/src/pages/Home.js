
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom"

function Home() {

    const [data, setData] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    useEffect(() => {
        getToken();
    }, [])


    let token;
    const getToken = async () => {
        const response = await axios.post("https://nv.teknix.vn/wp-json/jwt-auth/v1/token",
            {
                username: "Nin",
                password: 'Nghiep0907859820 ',

            }
        )
            .then(data => {
                console.log(data.data.token);
                token = data.data.token;
            })
        return token;


    }
    const getProducts = async () => {
        console.log(token);
        const response = await axios.get("https://nv.teknix.vn/wp-json/dokan/v1/products",
            {
                headers: { "Authorization": `Bearer ${token}` }
            }

        );
        if (response.status === 200) {
            setData(response.data);
        }
        console.log(response)
    }



    console.log("data =>>>", data)
    return (
        <h1 >home pages

            <div>

            </div>
        </h1>

    )
}

export default Home

