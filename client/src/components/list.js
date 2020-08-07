import React, { useState, useEffect } from "react";
import ItemService from "../Services/ItemService";
import Item from "./item";
import { Link } from "react-router-dom";
import Money from "./money";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

//to style the page
//=============================================
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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

  // to get the data for items from database
  const updateItems = () => {
    ItemService.getItems().then((data) => {
      setItems(data.items);
    });
  };

  //to delete list items
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
