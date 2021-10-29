

import React,{useState,useEffect} from 'react';
import { imageUpload, isAuthenticated } from '../helper';

import {printRes} from "../helper2/index.js";



function TestComp() {
  

  

  const [values,setValues] = useState({
    name:"",
   
    // photo:"",
    // loading:false,
    // error:"",
    // createdImage:"",
    // getARedirect:false,
    formData:new FormData()
  });
  
  const {name,formData} = values;


 

 

 


  const onSubmit = (event) => {
    
    event.preventDefault();
    imageUpload(isAuthenticated().company_id,isAuthenticated().access_token,formData)
        .then(res=>{
            printRes(res);
        })
    // setValues({...values,error:"",loading: true});
    // let obj = {
    //     name: name,
    //     image: values.photo
    // }
    // createImage(user._id,token,formData)
    //    .then(data => {
    //      setValues({...values,name:"",photo:"",loading:false,createdImage:name});
    //      printRes(data)
         
         
    //    })

  }
  const handleChange = (name) =>(event) => {
    const value = name ==="file" ? event.target.files[0] : event.target.value;
    formData.set(name,value);
    setValues({...values,[name]:value})
  }

  
  
  

  
  
 

  

  const createImageForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("file")}
            type="file"
            name="file"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
    
      
  
      <button
        
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Add Image
      </button>
    </form>
  );
  
  return (
    <div>

      <div className="row bg-dark text-white rounded m-4">
        <div className="col-md-8 offset-md-2 ">
          
       {createImageForm}
          
          
        </div>
      </div>
      
    </div>
  )
}

export default TestComp