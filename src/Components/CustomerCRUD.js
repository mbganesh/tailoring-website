import {
  AppBar,
  Button,
  InputAdornment,
  makeStyles,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";

const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: "red",
  },
  toolBar: {
    backgroundColor: "#00adb5",
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontSize: "21px",
    fontWeight: "bold",
    "&:hover": {
      cursor: "pointer",
    },
  },
  logBtn: {
    fontSize: "21px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  heading: {
    textAlign: "center",
    fontSize: "21px",
    padding: theme.spacing(2),
    fontWeight: "bold",
    color: "#00adb5",
  },
  form: {
    alignItems: "center",
    padding: "2%",
    display: "flex",
    flexDirection: "column",
  },
  formGrp: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
    padding: theme.spacing(2),
  },
  saveBtn: {
    textTransform: "none",
    width: "40%",
    backgroundColor: "#00adb5",
    "&:hover": {
      backgroundColor: "#00adb5",
    },
  },
  textField: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#00adb5",
    },

    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
      {
        display: "none",
      },
  },
}));

export default function CustomerCRUD() {
  const location = useLocation();
  const classes = styles();
  const [btnName, setBtnName] = useState("Save");
  const [btnVisibility, setBtnVisibility] = useState("visible");
  const [page, setPage] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
    date: "",
    name: "",
    email: "",
    mobNo: "",
    address: "",
  });

  const addCustomerDate = (e) => {
    setCustomerDetails({ ...customerDetails, date: e.target.value });
  };
  const addCustomerName = (e) => {
    setCustomerDetails({ ...customerDetails, name: e.target.value });
  };
  const addCustomerEmail = (e) => {
    setCustomerDetails({ ...customerDetails, email: e.target.value });
  };
  const addCustomerMobNo = (e) => {
    setCustomerDetails({ ...customerDetails, mobNo: e.target.value });
  };
  const addCustomerAddress = (e) => {
    setCustomerDetails({ ...customerDetails, address: e.target.value });
  };

  const saveBtn = () => {
    console.log(customerDetails);

    axios
      .post("http://192.168.1.37:5000/addData", customerDetails)
      .then((response) => console.log(response.data));

    // <div>
    //       <Snackbar open={this.state.alert1} autoHideDuration={2000} onClose={this.handleClose.bind(this)}>
    //         <Alert onClose={this.handleClose.bind(this)} severity="error">
    //           {this.state.alertMessage}
    //         </Alert>
    //       </Snackbar>
    //     </div>
  };

  const history = useHistory();
  const gotoMain = () => {
    history.push("/admin-panel");
  };

  useEffect(() => {
    console.log(location.state.detail); // result: 'some_value'
    setCustomerDetails(location.state.detail.api);
    setPage(location.state.page);

    console.log("8888888888888" + location.state.page + "9999999999999999");
    if (location.state.page === "Add") {
      setBtnName("Save");
    } else if (location.state.page === "Edit") {
      setBtnName("Update");
    } else {
      setBtnVisibility("none");
    }
  }, [location]);
  return (
    <div className="root">
      <AppBar position="sticky">
        <Toolbar className={classes.toolBar}>
          <Typography className={classes.title} onClick={gotoMain}>
            Komala Creation
          </Typography>
          <Button className={classes.logBtn} color="inherit">
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
      <Typography className={classes.heading}>{page} Customer </Typography>
      <div className={classes.form}>
        <div className={classes.formGrp}>
          <Typography>Date</Typography>
          <TextField
            variant="outlined"
            type="date"
            value={customerDetails.date}
            className={classes.textField}
            onChange={addCustomerDate}
          ></TextField>
        </div>
        <div className={classes.formGrp}>
          <Typography>Name</Typography>
          <TextField
            variant="outlined"
            type="text"
            className={classes.textField}
            placeholder="Enter Name"
            value={customerDetails.name}
            onChange={addCustomerName}
          ></TextField>
        </div>
        <div className={classes.formGrp}>
          <Typography>Email</Typography>
          <TextField
            variant="outlined"
            type="email"
            placeholder="Enter Email ID"
            className={classes.textField}
            value={customerDetails.email}
            onChange={addCustomerEmail}
          ></TextField>
        </div>
        <div className={classes.formGrp}>
          <Typography>Mobile No</Typography>
          <TextField
            className={classes.textField}
            variant="outlined"
            type="number"
            placeholder="Enter Mobile No"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 10);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91</InputAdornment>
              ),
            }}
            value={customerDetails.mobNo}
            onChange={addCustomerMobNo}
          ></TextField>
        </div>
        <div className={classes.formGrp}>
          <Typography>Address</Typography>

          <TextField
            multiline
            rows={4}
            variant="outlined"
            type="text"
            placeholder="Enter Address"
            className={classes.textField}
            value={customerDetails.address}
            onChange={addCustomerAddress}
          ></TextField>
        </div>
        <Button
          className={classes.saveBtn}
          variant="contained"
          color="primary"
          onClick={saveBtn}
          style={{ display: btnVisibility }}
        >
          {btnName}
        </Button>
      </div>
    </div>
  );
}
