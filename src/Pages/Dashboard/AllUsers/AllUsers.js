import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllUsers = () => {
    const {data: Users = [],isLoading,refetch}=useQuery({
        queryKey:['userRole/seller'],
        queryFn:async ()=>{
        const res = await fetch(`http://localhost:4000/userRole/seller`)
        const data = await res.json()
        return data
        }
    })
    if(isLoading){
        return <div className='text-center'>
           <button className="btn btn-square loading"></button>
        </div> 
    }

   const handleMakeAdmin=(_id)=>{
     fetch(`http://localhost:4000/users/admin/${_id}`,{
      method:"PUT",
      headers:{
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
     }).then(res => res.json()).then(data =>{
      console.log(data);
      if(data.modifiedCount > 0){
        toast.success("Make Admin Successful")
        refetch()
      }
     })
   }

   const handleDelete=(_id)=>{
    console.log('delete option',_id);
    }
    
    return (
        <div>
            <h1 className="text-4xl">This is All Users page {Users.length}</h1>
            <div className="overflow-x-auto">
  <table className="table w-full">
    
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>email</th>
        <th>Status</th>
        <th>Admin</th>
        <th>Verify</th>
        <th>Admin Action</th>
      </tr>
    </thead>
    <tbody>
    {
        Users.map((user,i) => 
          <tr key={user._id}>
            <th>{i+1}</th>
            <td>{user.name} </td>
            <td>{user.email}</td>
            <td>{user.select}</td>
            <td>
            {
              user?.role !== "Admin" ?  
              <button onClick={()=>handleMakeAdmin(user._id)} className='btn btn-xs bg-blue-700 hover:bg-blue-800 border-none rounded-lg'>Make Admin</button>
              :
              <button className='btn btn-xs bg-cyan-200 hover:bg-cyan-200 border-none rounded-lg'>Admin</button>
            }
           </td>
            <td>
              <button className='btn btn-xs rounded-lg'>verify now</button>
            </td>
            <td><button onClick={()=> handleDelete(user._id)} className='btn btn-xs rounded-lg bg-red-700 border-none'>delete</button></td>
          </tr>)
    }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllUsers;