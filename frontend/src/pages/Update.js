import React, { useEffect, useState } from 'react';
import "./AddEdit.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate, useLocation } from 'react-router-dom';


const initalState = {
    name: "",
    price: "",
    short_description: "",
    categories: "",
    description: "",
};




const Update = () => {
    const props = useLocation();
    console.log(props)

    const token = window.localStorage.getItem('token')
    const [state, setState] = useState(initalState);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, price, short_description, categories, description } = state;

        const dataForm = new FormData();
        dataForm.append('name', name);
        dataForm.append('price', price);
        dataForm.append('short_description', short_description);
        dataForm.append('description', description);
        dataForm.append('categories[0][id]', categories);
        console.log(categories)
        const products = await axios.post(`https://nv.teknix.vn/wp-json/dokan/v1/products/${id}`, dataForm,
            {
                headers: { "Authorization": `Bearer ${token}` }
            }
        );

        console.log(products)

        if (products.status === 200) {
            toast.success(products.data)
            window.confirm("Update product successfull")
        }

    };


    const { id } = useParams();


    const handleInputChange = (e) => {
        const id = e.target.id
        switch (id) {
            case 'name':
                setState({ ...state, name: e.target.value })
                break;
            case 'price':
                setState({ ...state, price: e.target.value })
                break;
            case 'categories':
                setState({ ...state, categories: e.target.value })
                break;
            case 'description':
                setState({ ...state, description: e.target.value })
                break;
            case 'short_description':
                setState({ ...state, short_description: e.target.value })
                break;
            default:
                console.log('not thing')
        }
    }

    console.log(state)

    return (
        <div style={{ marginTop: "100px" }} >
            <form
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxWith: "400px",
                    alignContent: "center",
                }

                } onSubmit={handleSubmit}>
                <label htmlFor="name" >Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) => handleInputChange(e)}
                    value={state.name === '' ? props.state.name : state.name}
                />

                <label htmlFor="price" >Price</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    onChange={(e) => handleInputChange(e)}
                    value={state.price === '' ? props.state.price : state.price}
                />
                <label htmlFor="Description" >Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    onChange={(e) => handleInputChange(e)}
                    value={state.description === '' ? props.state.description : state.description}
                />
                <label htmlFor="Description" >Description</label>
                <input
                    type="text"
                    id="short_description"
                    name="short_description"
                    onChange={(e) => handleInputChange(e)}
                    value={state.short_description === '' ? props.state.short_description : state.short_description}
                />
                <label htmlFor="Categories" >Categories</label>
                <input
                    type="number"
                    id="categories"
                    name="categories"
                    onChange={(e) => handleInputChange(e)}
                    value={state.categories === '' ? props.state.categories : state.categories}
                />
                <input type="submit" value="Update" />
            </form>

        </div>
    )
}

export default Update