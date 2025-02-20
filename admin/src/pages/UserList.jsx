import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';

const UserList = () => {
  const { userList } = useContext(ShopContext);

  useEffect(() => {
    console.log(userList);
  }, [userList]);

  return (
    <div>
      <h2 className='font-semibold mt-3 text-2xl mb-4'>User List</h2>
      {Array.isArray(userList) && userList.length > 0 ? (
        <table>
          <thead>
            <tr className='w-[1100px] grid grid-cols-[2fr_3fr_2fr_2fr_2fr_2fr] gap-4 text-left py-1 px-2 border bg-gray-100 text-sm'>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Credit Points</th>
              <th>Return Orders</th>
              <th>Cancel Orders</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={index} className='grid grid-cols-[2fr_3fr_2fr_2fr_2fr_2fr] gap-4 text-left py-1 px-2 my-2 border text-sm'>
                {console.log(user)}
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.creditPoints}</td>
                <td>{user.returnOrderCount}</td>
                <td>{user.cancelOrderCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
};

export default UserList;