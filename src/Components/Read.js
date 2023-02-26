import axios from 'axios';
import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const Read = () => {

    const [data,setData] = useState([]);
    const [tabledark,setTableDark] = useState('');

    function getData(){
        axios.get("https://63f9ef47beec322c57ea208a.mockapi.io/Curdoperation")
        .then((res)=>{
            setData(res.data);
        });
    }

    function handleDelete(id){
        axios.delete(`https://63f9ef47beec322c57ea208a.mockapi.io/Curdoperation/${id}`
        ).then(()=>{
            getData()
        })
    }

    const setToLocalStorage = (id,name,email) => {
localStorage.setItem("id",id);
localStorage.setItem("name",name);
localStorage.setItem("email",email);
    }
    useEffect(()=>{
        getData();
    },[]);
    
  return (
    <>
    <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox"
   onClick={()=>{
    if(tabledark === "table-dark") setTableDark("")
    else setTableDark("table-dark");
   }
   }/>
</div>
    <div className="d-flex justify-content-between m-2">
  <h2>Read Operation</h2>
  <Link to="/">
  <button className="btn btn-secondary">Create</button>
  </Link>
  
  </div>
        <table className={`table ${tabledark}`}>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Update</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
 { 
data.map((eachdata)=>{
return(
    <>
<tbody>
    <tr>
      <th scope="row">{eachdata.id}</th>
      <td>{eachdata.name}</td>
      <td>{eachdata.email}</td>
      <td>
        <Link to="/update">
        <button className="btn-success" onClick={()=> setToLocalStorage(eachdata.id,eachdata.name,eachdata.email)}>Edit</button>
        </Link>
        
      </td>
      <td>
        <button className="btn-danger" onClick={()=> handleDelete(eachdata.id)}>Delete</button>
      </td>
    </tr>
  </tbody>
    </>
)
}) 
 
}
</table>
 
    </>
  );
};

export default Read;