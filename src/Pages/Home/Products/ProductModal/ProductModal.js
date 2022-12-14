import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import {AuthContext} from "../../../../contexts/AuthProvider"

const ProductModal = ({product,setProductModal}) => {
    const {name,resell_price}=product
    // console.log(product);
    
    const {user}=useContext(AuthContext)
    const handleSubmit=(event)=>{
     event.preventDefault();
     const form=event.target
     const name=form.name.value
     const email=form.email.value
     const productName=form.productName.value
     const price=form.price.value
     const phone=form.phone.value
     const location=form.location.value
     const bookedItem={
        name: name,
        email:email,
        productName: productName,
        price: price,
        phone: phone,
        location:location,
     }
    //  console.log(bookedItem);
    fetch('https://assignment12-server-er299s0ta-bappysheikh1.vercel.app/bookedItem',{
        method:"POST",
        headers:{
          "Content-type": "application/json"
        },
        body:JSON.stringify(bookedItem)
    })
     .then(res => res.json())
     .then(data => {
        // console.log(data);
        if(data.acknowledged){
          toast.success('That the item is booked')
          form.reset();
          setProductModal(null)
        }
     })

    }
    return (
        <div>
 <input type="checkbox" id="my-modal-3" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <form onSubmit={handleSubmit}>
    <input type="text" placeholder="User Name" name='name' disabled defaultValue={user?.displayName} className="input input-bordered w-full my-2 rounded text-center" />

    <input type="text" placeholder="User Email" name='email' defaultValue={user?.email} disabled className="input input-bordered w-full mb-2 rounded text-center" />

    <input type="text" placeholder="Items name" name='productName' defaultValue={name} disabled className="input input-bordered w-full mb-2 rounded text-center" />

    <input type="text" placeholder="price" name='price' disabled defaultValue={resell_price} className="input input-bordered w-full mb-2 rounded text-center" />

    <input type="text" placeholder="Phone Number" name='phone' className="input input-bordered text-center w-full mb-2 rounded" />

    <input type="text" placeholder="Meet Location" name='location' className="input text-center input-bordered w-full mb-2 rounded" />

    <input type="submit" className='btn border-none bg-blue-700 rounded-lg w-full' value='Submit' />
    </form>

  </div>
</div>         
 

{/* <div className="modal" id="my-modal-2">
  <div className="modal-box">
    
    <div className="modal-action">
     <a href="#" className="btn">Yay!</a>
    </div>
  </div>
</div> */}
        </div>
    );
};

export default ProductModal;