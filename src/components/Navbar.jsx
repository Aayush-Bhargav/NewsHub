import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
//navbar component to help in navigation
export default function Navbar(props) {
    const[text,setText]=useState(''); //initialize text to empty string
    const handleChange=(event)=>{ //whenever any change happens in the search bar, update the text
        const{value}=event.target;
        setText(value);
        console.log(value);
    }
    //bootstraps navbar
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{position:"sticky",zIndex:"1",top:"0px"}}>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">{props.title}</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/" onClick={()=>{
                                props.changeCategory("");
                                props.handleSubmit('');
                            }}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/sports" onClick={()=>{
                                props.changeCategory("sports");
                                props.handleSubmit('');
                                console.log('hi');
                            }}>Sports</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/entertainment" onClick={()=>{
                                props.changeCategory("entertainment");
                                props.handleSubmit('');
                            }}>Entertainment</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/business" onClick={()=>{
                                props.changeCategory("business");
                                props.handleSubmit('');
                            }}>Business</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/health" onClick={()=>{
                                props.changeCategory("health");
                                props.handleSubmit('');
                            }}>Health</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/science" onClick={()=>{
                                props.changeCategory("science");
                                props.handleSubmit('');
                            }}>Science</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/technology" onClick={()=>{
                                props.changeCategory("technology");
                                props.handleSubmit('');
                            }}>Technology</NavLink>
                        </li>

                    </ul>
                    <form className="d-flex" role="search" onSubmit={(event)=>{
                            event.preventDefault();
                            props.handleSubmit(text);
                            setText('');
                        }}>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={text} onChange={handleChange}/>
                        <button className="btn btn-outline-success" type="submit" >Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};
