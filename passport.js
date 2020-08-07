const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/User");

//to extract jwt token
const cookieExtractor = (req) => {
  var token = null;
  //if the request is there and cookie is not empty
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

//this will be used for authorization
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: "Rand13", //to verify that the token is legitimate
    },
    (payload, done) => {
      //payload is the data we set within the jwt token
      //check if the user exist
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

//username and password >> from the client
//done >> functon that will be invoked when we are done
passport.use(
  new LocalStrategy((username, password, done) => {
    // to check if the user exist
    User.findOne({ username }, (err, user) => {
      //if something went wrong with database
      if (err) return done(err);
      //if user doesn't exist
      if (!user) return done(null, false);
      //check if password is correct
      user.comparePassword(password, done);
    });
  })
);
