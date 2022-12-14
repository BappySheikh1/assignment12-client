import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import AllSellerDeleteModal from '../DeleteModal/AllSellerDeleteModal';
 
const AllUsers = () => {
  const [deleteSeller,setDeleteSeller]=useState(null)
    const {data: Users = [],isLoading,refetch}=useQuery({
        queryKey:['userRole/seller'],
        queryFn:async ()=>{
        const res = await fetch(`https://assignment12-server-er299s0ta-bappysheikh1.vercel.app/userRole/seller`)
        const data = await res.json()
        return data
        }
    })
    if(isLoading){
        return <div className='text-center'>
           <button className="btn btn-square loading"></button>
        </div>  
    }
    const closeModal =()=>{
      setDeleteSeller(null)
  }
   const handleMakeAdmin=(_id)=>{
     fetch(`https://assignment12-server-er299s0ta-bappysheikh1.vercel.app/users/admin/${_id}`,{
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

   const handleDelete=(seller)=>{
    console.log('delete option',seller._id);
    fetch(`https://assignment12-server-er299s0ta-bappysheikh1.vercel.app/userRole/seller/${seller._id}`,{
  method:"DELETE"
})
.then(res => res.json())
.then(data => {
  console.log(data);
  if(data.deletedCount > 0){
    toast.success("Deleted Successfully")
    refetch()
    setDeleteSeller(null)
  }
})
  }
    
  const handleMakeVerify=(user)=>{
    // console.log(user?.email);
    fetch(`https://assignment12-server-er299s0ta-bappysheikh1.vercel.app/users/seller/${user?.name}`,{
      method:"PUT",
      headers:{
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
     }).then(res => res.json()).then(data =>{
      console.log(data);
      if(data.modifiedCount > 0){
        toast.success("Make Verify Successful")
        refetch()
      }
     })
  }

    return (
        <div>
            <h1 className="text-4xl mb-4">This is All Seller page {Users.length}</h1>
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
                <button onClick={()=>handleMakeVerify(user)}  className='btn btn-xs rounded-lg'>verify now</button>
                
            </td>
            <td>
            <a href="#my-modal-2" onClick={()=> setDeleteSeller(user)} className="btn btn-xs rounded-lg bg-red-700 border-none">delete</a>
              </td>
          </tr>)
    }
      
    </tbody>
  </table>
</div>
<div>
{
    deleteSeller && <AllSellerDeleteModal
    title={`Are you sure you want to delete?`}
    message={`If you delete ${deleteSeller.name}. It cannot be undone.`}
    successAction={handleDelete}
    data={deleteSeller}
    successButtonName='Delete'
    closeModal={closeModal}
    />
}
</div>
        </div>
    );
};

export default AllUsers;