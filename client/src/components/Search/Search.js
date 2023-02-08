import React, { useState } from "react";
import * as SearchAPI from '../../api/search';
import User from '../../components/User/User';
import "bootstrap/dist/css/bootstrap.min.css";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [page, setPage] = useState(1);
    const [resultsPerPage] = useState(10);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const users = await SearchAPI.searchGithubUsers(searchTerm, page, resultsPerPage);
            setSearchResults(users);
            setErrorMessage("");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <form onSubmit={handleSubmit} className="form-inline">
                    <input
                        type="text"
                        placeholder="Search Github Users"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btn btn-outline-success my-2 my-sm-0">Search</button>
                </form>
                <div className="profile-icon">
                    <i className="fa fa-user" aria-hidden="true"></i>
                </div>
            </nav>

            {errorMessage && (
            <div className="error-message">{errorMessage}</div>
            )}

            <table className="table table-bordered table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Login</th>
                        <th>Avatar URL</th>
                        <th>HTML URL</th>
                        <th>Public Repos</th>
                        <th>Followers</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.map((user) => (
                        <User
                            key={user.id}
                            id={user.id}
                            login={user.login}
                            avatar_url={user.avatar_url}
                            html_url={user.html_url}
                            repos_url={user.repos_url}
                            followers_url={user.followers_url}
                        />
                    ))}
                </tbody>
            </table>
            {searchResults.length > 0 && (
                <div>
                    <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                        Prev
                    </button>
                    <button onClick={() => setPage(page + 1)} disabled={searchResults.length < resultsPerPage}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Search;