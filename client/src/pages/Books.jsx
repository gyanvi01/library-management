import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, Link } from "react-router-dom";

const Books = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        const fecthAllBooks = async () => {
            try{
                const res = await axios.get("http://localhost:8800/books")
                // console.log(res)
                setBooks(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fecthAllBooks()
    }, [])

    const handleDelete = async (id) => {
        try{
            await axios.delete("http://localhost:8800/books/"+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
             <div className="nav">
                    <button className="logoutButton"><Link to = "/">Log Out</Link></button>
                    <button className="logoutButton"><Link to = "/register">Register</Link></button>
                </div>
            <div>
                <h1>Library Management System</h1>
                <div className="books">
                    {books.map(book => (
                        <div className="book" key={book.id}>
                            {book.cover && <img src={book.cover} alt=""/>}
                            <h2>{book.title}</h2>
                            <p>{book.desc}</p>
                            <span>{book.price}</span>
                            <div className="addup">
                            <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
                            <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button></div>
                        </div>
                    ))}
                </div>
                <button className="add">
                    <Link to="/add">Add new book</Link>
                </button>

            </div>
        </div>
    );
};

export default Books;