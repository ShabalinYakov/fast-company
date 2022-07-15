import React, { useState } from 'react';
import Users from './components/users';
import SearchStatus from './components/searchStatus';
import api from './api';

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  const handleToggleBookMark = (id) => {
    const newUsers = users.map((user) => {
      if (user._id === id && !user.bookmark) {
        return {
          ...user,
          bookmark: true,
        };
      } else if (user._id === id && user.bookmark) {
        return {
          ...user,
          bookmark: false,
        };
      } else {
        return user;
      }
    });
    setUsers(newUsers);
  };

  return (
    <div>
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
      />
    </div>
  );
};

export default App;
