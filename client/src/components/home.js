import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Authservice from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import "../style.css";

//to style the page
//=============================================
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

//================================================

//Home Functionalities
//==================================================
var Home = () => {
  let history = useHistory();
  const classes = useStyles();

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickSignOutHandler = () => {
    Authservice.signout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
        history.push("/signin");
      }
    });
  };

  const unauthenticatedHomePage = () => {
    return (
      <>
        <div
          style={{
            height: "100%",
            width: "50%",
            position: "fixed",
            top: "0",
            paddingTop: "200px",
            left: "0",
            backgroundColor: "#77C3EC",
          }}
        >
          <ButtonBase
            focusRipple
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              top: "60px",
              width: "700px",
            }}
          >
            <span className={classes.imageButton}>
              <Link
                to="/signin"
                style={{ textDecoration: "none", color: "#FFFFFF" }}
              >
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  <b>SIGN IN</b>
                  <span className={classes.imageMarked} />
                </Typography>
              </Link>
            </span>
          </ButtonBase>
        </div>
        <div
          style={{
            height: "100%",
            width: "50%",
            position: "fixed",
            top: "0",
            paddingTop: "200px",
            right: "0",
            backgroundColor: "#ffaf7a",
          }}
        >
          <ButtonBase
            focusRipple
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              top: "60px",
              width: "700px",
            }}
          >
            <span className={classes.imageButton}>
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "#FFFFFF" }}
              >
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  <b>SIGN UP</b>
                  <span className={classes.imageMarked} />
                </Typography>
              </Link>
            </span>
          </ButtonBase>
        </div>
      </>
    );
  };

  const authenticatedHomePage = () => {
    return (
      <>
        <div className="homeDiv" id="div1">
          <ButtonBase
            focusRipple
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              top: "60px",
              width: "700px",
            }}
          >
            <span className={classes.imageButton}>
              <Link
                to="/wallet"
                style={{ textDecoration: "none", color: "#FFFFFF" }}
              >
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  <b>MY WALLET</b>
                  <span className={classes.imageMarked} />
                </Typography>
              </Link>
            </span>
          </ButtonBase>
        </div>

        <div className="homeDiv" id="div3">
          <ButtonBase
            focusRipple
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              top: "60px",
              width: "700px",
            }}
          >
            <span className={classes.imageButton}>
              <Link
                to="/addItem"
                style={{ textDecoration: "none", color: "#FFFFFF" }}
              >
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  <b>ADD ITEM</b>
                  <span className={classes.imageMarked} />
                </Typography>
              </Link>
            </span>
          </ButtonBase>
        </div>

        <div className="homeDiv" id="div2">
          <ButtonBase
            focusRipple
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              top: "60px",
              width: "700px",
            }}
          >
            <span className={classes.imageButton}>
              <Link
                to="/list"
                style={{ textDecoration: "none", color: "#FFFFFF" }}
              >
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  <b>MY LIST</b>
                  <span className={classes.imageMarked} />
                </Typography>
              </Link>
            </span>
          </ButtonBase>
        </div>

        <div className="homeDiv" id="div4">
          <ButtonBase
            onClick={onClickSignOutHandler}
            focusRipple
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              top: "60px",
              width: "700px",
            }}
          >
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                <b>SIGN OUT</b>
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        </div>
      </>
    );
  };

  return (
    <div>
      {!isAuthenticated ? unauthenticatedHomePage() : authenticatedHomePage()}
    </div>
  );
};

export default Home;
