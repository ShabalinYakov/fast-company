import React, { useState } from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    if (number % 100 >= 12 && number % 100 <= 21) {
      return (
        <span className="badge bg-primary fs-5">{`${number} человек тусанет с тобой сегодня`}</span>
      );
    } else if (number % 10 >= 2 && number % 10 <= 4) {
      return (
        <span className="badge bg-primary fs-5">{`${number} человека тусанут с тобой сегодня`}</span>
      );
    } else {
      return (
        <span className="badge bg-primary fs-5">{`${number} человек тусанет с тобой сегодня`}</span>
      );
    }
  };

  return users.length !== 0 ? (
    <>
      {renderPhrase(users.length)}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((qualities) => (
                    <span
                      key={qualities._id}
                      className={`badge bg-${qualities.color} m-1`}
                    >
                      {qualities.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{`${user.rate} /5`}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  ) : (
    <span className="badge bg-danger fs-5">Ни кто с тобой не тусанет</span>
  );
};

export default Users;
