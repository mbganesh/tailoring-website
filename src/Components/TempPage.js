import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useState } from "react";

function TempPage() {
  const history = useHistory();
  const [api, setapi] = useState("")

 

  const handleAdd = () => {
    history.push({
      pathname: "/customer",
      state: {
        detail: {
         api:{
          date: "",
          name: "",
          email: "",
          mobNo: "",
          address: "",
         }
        },
        page:"Add"
      },
    });
  };

  const handleEdit = () => {
    history.push({
      pathname: "/customer",
      state: {
        detail: {
         api
        },
        page:"Edit"
      },
    });
  };
  
  useEffect(() => {
    axios.get("http://192.168.1.37:5000/allCustomerDetails") .then(response =>
    setapi(response.data))
   
  }, [])

  
  console.log(api)

  const handleView = () => {
    history.push({
      pathname: "/customer",
      state: {
        detail: {
         api
        },
        page:"View"
      },
    });
  };

  const handleShow = () => {
    history.push("/customer-details");
  };
  console.log(window.innerWidth + " : " + window.innerHeight)
  return (
    <div
      style={{ display: "flex", justifyContent: "space-around", padding: "5%" }}
    >
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Add Customer
      </Button>
      <Button variant="contained" color="primary" onClick={handleView}>
        View Customer
      </Button>
      <Button variant="contained" color="primary" onClick={handleEdit}>
        Edit Customer
      </Button>

      <Button variant="contained" color="primary" onClick={handleShow} >
        Customer Details
      </Button>

    </div>
  );
}

export default TempPage;
