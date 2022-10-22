import React, { useState, useEffect } from "react";
import SearchStatus from "../components/searchStatus";
import Pagination from "../components/pagination";
import UserTable from "../components/usersTable";
import GroupList from "../components/groupList";
import { paginate } from "../utils/paginate";
import TextField from "./textField";
import api from "../api";
import _ from "lodash";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchData, setSearchData] = useState("");
    const pageSize = 8;

    const [users, setUsers] = useState();

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        setUsers(newArray);
    };

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchData]);

    const handleProfessionSelect = (item) => {
        setSearchData("");
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    const filter = (data) => {
        let filteredUsers;
        const search = new RegExp(searchData, "gi");

        if (searchData) {
            filteredUsers = users.filter((user) => search.test(user.name));
        } else {
            filteredUsers = selectedProf
                ? users.filter(
                      (user) => user.profession._id === selectedProf._id
                  )
                : users;
        }
        return filteredUsers;
    };

    if (users) {
        const filteredUsers = filter(users);

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        const handleSearch = ({ target }) => {
            clearFilter();
            setSearchData(target.value);
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            {" "}
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />

                    <TextField
                        name="search"
                        placeholder="Search..."
                        value={searchData}
                        onChange={handleSearch}
                    />

                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}

                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};

export default Users;
