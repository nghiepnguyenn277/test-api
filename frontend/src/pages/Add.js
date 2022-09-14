import React, { useEffect, useState } from 'react';
import "./AddEdit.css"
import axios from 'axios';
import { toast } from 'react-toastify';



const initalState = {
    name: "",
    price: "",
    short_description: "",
    description: "",
    categories: "",
};
// const categories =
//     [


//     ]



const Add = () => {

    const token = window.localStorage.getItem('token')
    const [state, setState] = useState(initalState);
    const [cate, setCate] = useState([])
    useEffect(() => {
        axios.get("https://nv.teknix.vn/wp-json/wc/v3/products/categories?consumer_key=ck_13bbb0868c12ba80e45d8e0649023952ee41fbf5&consumer_secret=cs_8c31c9069be46b2551b64d8c6bc11dd73239141a")
            .then(cate => setCate(cate.data));

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, price, short_description, categories, description } = state;
        const dataForm = new FormData();
        dataForm.append('name', name);
        dataForm.append('price', price);
        dataForm.append('short_description', short_description);
        dataForm.append('description', description);
        dataForm.append('categories[0][name]', categories);

        const products = await axios.post("https://nv.teknix.vn/wp-json/dokan/v1/products", dataForm,
            {
                headers: { "Authorization": `Bearer ${token}` }
            }
        );
        console.log(dataForm)
        console.log(products)

        if (products.status === 200) {
            toast.success(products.data)
            window.confirm("Add product successfull")

        }

    };



    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

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
                    placeholder="Enter Name Product...."
                    onChange={handleInputChange}
                    value={state.name}
                />

                <label htmlFor="price" >Price</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Enter price Product...."
                    onChange={handleInputChange}
                    value={state.price}
                />
                <label htmlFor="Description" >Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Enter Description...."
                    onChange={handleInputChange}
                    value={state.description}
                />
                <label htmlFor="Short_Description" >Short_Description</label>
                <input
                    type="text"
                    id="short_description"
                    name="short_description"
                    placeholder="Enter Description...."
                    onChange={handleInputChange}
                    value={state.short_description}
                />
                <label htmlFor="Categories" >Categories  </label>
                <input
                    type="text"
                    id="categories"
                    name="categories"
                    placeholder="Enter categories...."
                    onChange={handleInputChange}
                    value={state.categories}
                />
                {/* <select onChange={(e) => setCate(e.target.value)}>
                    <option value="">Choose Category</option>
                    {categories.map((cate) => (
                        <option key={cate} value={cate}>
                            {cate}
                        </option>
                    ))}


                </select> */}
                <input type="submit" value="Add" />
            </form>

        </div>
    )
}

export default Add