import {
  AppBar,
  Button,
  CssBaseline,
  InputAdornment,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState, useEffect } from "react";
import SearchBar from "material-ui-search-bar";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  appBarStyle: {
    boxShadow: "none",
    display: "flex",
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "#00ADB5",
  },
  notchedOutline: {
    borderWidth: "2px",
    borderColor: "#00adb5 !important",
  },
}));

export default function CustomerDetails() {
  const classes = useStyles();
  var allCustomerDatasGot = [] ;
  const [allCustomerDatas, setAllCustomerDatas] = useState(allCustomerDatasGot);

  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = allCustomerDatasGot.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setAllCustomerDatas(filteredRows);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  useEffect(() => {
    axios
      .get("http://192.168.1.37:5000/allCustomerDetails")
      .then((response) => {
        console.log(response.data);
        allCustomerDatasGot = response.data;
      });
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: "#E5E5E5",
          overflow: "hidden",
          minHeight: "100vh",
          maxWidth: "100vw",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <CssBaseline />
          <AppBar position="static" className={classes.appBarStyle}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Designing Unit
              </Typography>
              <Button color="inherit">Log out</Button>
            </Toolbar>
          </AppBar>
        </div>

        <Typography
          variant="h4"
          color="primary"
          style={{
            color: "#00adb5",
            marginTop: "1%",
            marginBottom: "1%",
            textAlign: "center",
          }}
        >
          Customer Details
        </Typography>

        <SearchBar
          inputProps={{ maxLength: 20 }}
          color="#00abb5"
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{
            backgroundColor: "#fff",
            marginTop: "1%",
            marginBottom: "1%",
            width: "70%",
            marginLeft: "15%",
          }}
          placeholder="Search"
          variant="outlined"
        />

        <div style={{ width: "70%", marginLeft: "15%", marginBottom: "20px" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow
                  style={{
                    backgroundColor: "#00adb5",
                  }}
                >
                  <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                    Customer ID
                  </TableCell>
                  <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                    Registered Date
                  </TableCell>
                  <TableCell
                    style={{ color: "#fff", fontWeight: "bold" }}
                    align="right"
                  >
                    Customer Name
                  </TableCell>
                  <TableCell
                    style={{ color: "#fff", fontWeight: "bold" }}
                    align="right"
                  >
                    Customer Mob.No
                  </TableCell>
                  <TableCell
                    style={{ color: "#fff", fontWeight: "bold" }}
                    align="right"
                  >
                    Customer Email ID
                  </TableCell>

                  <TableCell
                    style={{ color: "#fff", fontWeight: "bold" }}
                    align="right"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {allCustomerDatas.map((row) => (
                  <TableRow>
                    <TableCell>{row.mobNo}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.mobNo}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#00ADB5", color: "#fff" }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
