import React, { useState, useEffect } from "react";
import ItemService from "../Services/ItemService";
import Item from "./item";
import { Link } from "react-router-dom";
import Money from "./money";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Logo from "../images/logo1.png";
import Avatar from "@material-ui/core/Avatar";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

//to style the page
//=============================================
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#FFFFFF",
    width: "70px",
    height: " 70px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
    table: {
      minWidth: 650,
      alignContent: "center",
    },
  },
}));
//================================================

//List Functionalities
//==================================================
var List = () => {
  const [items, setItems] = useState([]);

  //equilivant to componentDidMount
  useEffect(() => {
    ItemService.getItems().then((data) => {
      setItems(data.items);
    });
  }, []);

  const updateItems = () => {
    ItemService.getItems().then((data) => {
      setItems(data.items);
    });
  };
  const clearListHandler = () => {
    items.map((item) => {
      return ItemService.deleteItem(item._id);
    });
    updateItems();
  };

  //declairing the styling class
  const classes = useStyles();
  return (
    <>
      <Container>
        <CssBaseline />
        <div className={classes.paper}>
          <Money />
          <div className={classes.paper}>
            <TableContainer component={Paper}>
              {items.map((item) => {
                return (
                  <Item key={item._id} item={item} updateItems={updateItems} />
                );
              })}
            </TableContainer>
          </div>

          <Button
            fullWidth
            variant="contained"
            style={{
              backgroundColor: "#ff8b3d",
              color: "#FFFFFF",
            }}
            onClick={() => clearListHandler()}
            className={classes.submit}
          >
            <b>Clear List</b>
          </Button>
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="text primary button group"
          >
            <Link to="/addItem" style={{ textDecoration: "none" }}>
              <Button>
                <b> Add Items</b>
              </Button>
            </Link>

            <Link to="/" style={{ textDecoration: "none" }}>
              <Button>
                <b> Home</b>
              </Button>
            </Link>
          </ButtonGroup>
        </div>
      </Container>
    </>
  );
};

export default List;
