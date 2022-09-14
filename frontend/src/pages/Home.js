import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';


function Home() {
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [token, setToken] = useState(null);
    const [cate, setCate] = useState([])

    // Products
    useEffect(() => {
        getToken();
    }, [])
    useEffect(() => {
        if (token) {

            axios.get("https://nv.teknix.vn/wp-json/dokan/v1/products?per_page=90",
                {
                    headers: { "Authorization": `Bearer ${token}` }
                }
            ).then(data => setData(data.data))
        }
    }, [token])
    // categories
    useEffect(() => {
        axios.get("https://nv.teknix.vn/wp-json/wc/v3/products/categories?consumer_key=ck_13bbb0868c12ba80e45d8e0649023952ee41fbf5&consumer_secret=cs_8c31c9069be46b2551b64d8c6bc11dd73239141a")
            .then(cate => setCate(cate.data));

    }, [])

    console.log("categories ===> :", cate)

    //  Auth Token
    const getToken = () => {
        axios.post("https://nv.teknix.vn/wp-json/jwt-auth/v1/token",
            {
                username: "Nin",
                password: 'Nghiep0907859820 ',
            }
        )
            .then(data => {
                window.localStorage.setItem('token', data.data.token)
                setToken(data.data.token)
            });



    }
    console.log("data=>>>", data)


    const onDeleteUser = async (id) => {
        if (window.confirm("are you sure delete")) {

            const products = await axios.delete(`https://nv.teknix.vn/wp-json/dokan/v1/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },

            });
            if (products.status === 200) {
                toast.success(products.data);
                return navigate(`/`)

            }
        }


    }
    return (

        <div style={{ marinTop: " 150px" }}>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}> ID</th>
                        <th style={{ textAlign: "center" }}> Product Name</th>
                        <th style={{ textAlign: "center" }}> Price</th>
                        <th style={{ textAlign: "center" }}> categories</th>
                        {/* <th style={{ textAlign: "center" }}> Description</th> */}
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.categories[0]['name']}</td>
                                {/* <td>{item.description}</td> */}
                                <td>
                                    <img src={item.images[0]['name'].url} alt={item.id} />
                                </td>
                                <td>
                                    <button style={{ color: "Blue", marginLeft: "20px" }} onClick={() => navigate(`/update/${item.id}`, {
                                        state: {
                                            name: `${item.name}`,
                                            price: `${item.price}`,
                                            categories: `${item.categories[0['name']]}`,
                                            description: `${item.description}`,
                                            short_description: `${item.short_description}`
                                        }
                                    })}> Edit </button>

                                    <button style={{ color: "Green" }} onClick={() => navigate(`/add`)}> Add </button>

                                    <button style={{ color: "Red" }} onClick={() => onDeleteUser(item.id)}> Delete </button>


                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >

    )
}

export default Home