import React, { useState, useEffect } from 'react';

export function Product() {
    const [content, setContent] = useState(<ProductList showForm={showForm} />);

    function showList() {
        setContent(<ProductList showForm={showForm} />);
    }

    function showForm(product) {
        setContent(<ProductForm showList={showList}  product={product} />);
    }

    return (
        <div>
            <div className="container my-5">
                {content}
            </div>
        </div>
    );
}

export function ProductList(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    function fetchProducts() {
        fetch("http://localhost:3001/product")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unexpected Server Response");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setProducts(data);
            })
            .catch((error) => console.log("Error:", error));
    }
    
    useEffect(() => fetchProducts(),[])

    function  deleteProduct(id){
        fetch("http://localhost:3001/product/" + id,{
            method: "DELETE"
        })
        .then((response) => response.json())
        .then((data) => fetchProducts())

    }

    return (
        <div>
            <h2 className='text-center mb-3'>List of Products</h2>
            <button onClick={() => props.showForm({})} type='button' className='btn btn-primary me-2'>Create</button>
            <button onClick={() => fetchProducts()} type='button' className='btn btn-outline-primary me-2'>Refresh</button>
            <table className='table'>
                
                    <thead>

                       <tr>
                       <th>ID</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Created At</th>
                        <th>Action</th>
                       </tr>

                    </thead>
                    <tbody>
                        {products.map((product,index) =>{
                            return(
                              <tr key={index}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.brand}</td>
                                <td>{product.category}</td>
                                <td>{product.Price}</td>
                                <td>{product.createdAt}</td>
                                <td style={{width:"10px", whiteSpace:"nowrap"}}>
                                    <button onClick={() => props.showForm(product)} type='button' className='btn btn-primary btn-sm me-2'>Edit</button>
                                    <button onClick={()=> deleteProduct(product.id)} type='button' className='btn btn-danger btn-sm me-2'>Delect</button>

                                </td>
                              </tr>  
                            )
                        })
                        }
                    </tbody>
                

            </table>
        </div>
    );
}

export function ProductForm(props) {
    const [errorMessage, setErrorMessage] = useState("")
    function handleSubmit(event) {
        event.preventDefault();

        // Read form data 
        const formData = new FormData(event.target);

        // Convert form data into object
        const product = Object.fromEntries(formData.entries());

        // Check if all required fields are provided
        if (!product.name || !product.brand || !product.category || !product.Price) {
            console.log("Please provide all the required fields!");
            setErrorMessage(<div className="alert alert-warning" role="alert">
            Please provide all the required fields!
          </div>)
            return; // Return early if fields are missing
        }
       
        if (props.product.id) {
             // create a new product
        product.createdAt = new Date().toISOString().slice(0, 10);

        fetch("http://localhost:3001/product/" + props.product.id,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",     
              },
              body: JSON.stringify(product),
        })
        .then((response) => {
            if(!response.ok){
                throw new Error("Network response was not ok")
            }
         return response.json()
        })
        .then((data) => props.showList())
        .catch((error) => {
            console.error("Error", error)
        })
            
        }
        else{
             // create a new product
        product.createdAt = new Date().toISOString().slice(0, 10);

        fetch("http://localhost:3001/product",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",     
              },
              body: JSON.stringify(product),
        })
        .then((response) => {
            if(!response.ok){
                throw new Error("Network response was not ok")
            }
         return response.json()
        })
        .then((data) => props.showList())
        .catch((error) => {
            console.error("Error", error)
        })

        }
        
        // create a new product
        product.createdAt = new Date().toISOString().slice(0, 10);

        fetch("http://localhost:3001/product",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",     
              },
              body: JSON.stringify(product),
        })
        .then((response) => {
            if(!response.ok){
                throw new Error("Network response was not ok")
            }
         return response.json()
        })
        .then((data) => props.showList())
        .catch((error) => {
            console.error("Error", error)
        })

    }

    return (
        <div>
            <h2 className='text-center mb-3'>{props.product.id ? "Edit Product" : "Create new product"}</h2>
            <div className='row'>
                <div className='col-lg-6 mx-auto'>
                    {errorMessage}
                    <form action="" onSubmit={handleSubmit}>

                   {props.product.id &&
                     <div className='row mb-3'>
                     <label className='col-sm-4 col-form-label'>ID</label>
                     <div className='col-sm-8'>
                         <input readOnly className='form-control-plaintext' name='id' defaultValue={props.product.id} />
                     </div>
                 </div>
                   }
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Name</label>
                            <div className='col-sm-8'>
                                <input className='form-control' name='name' defaultValue={props.product.name} />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Brand</label>
                            <div className='col-sm-8'>
                                <input className='form-control' name='brand' defaultValue={props.product.brand} />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Category</label>
                            <div className='col-sm-8'>
                                <select className='form-select' name='category' defaultValue={props.product.category}>
                                    <option value="Other">Other</option>
                                    <option value="Phones">Phones</option>
                                    <option value="Computers">Computers</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="GPS">GPS</option>
                                    <option value="Cameras">Cameras</option>
                                </select>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Price</label>
                            <div className='col-sm-8'>
                                <input className='form-control' name='Price' defaultValue={props.product.Price} />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-sm-4 col-form-label'>Description</label>
                            <div className='col-sm-8'>
                                <textarea className='form-control' name='description' defaultValue={props.product.description} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='offset-sm-4 col-sm-4 d-grid'>
                                <button type='submit' className='btn btn-primary btn-sm me-3'>Save</button>
                            </div>
                            <div className='col-sm-4 d-grid'>
                                <button onClick={props.showList} type='button' className='btn btn-secondary mr-2'>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

