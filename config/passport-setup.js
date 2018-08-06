var passport=require('passport');
var GoogleStrategy=require('passport-google-oauth20');
var keys=require('./keys');
var User=require('../models/user-model');

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
      done(null,user);
  });

});

passport.use(
  new GoogleStrategy({
//options for the google strat
callbackURL:'/auth/google/redirect',
clientID: keys.google.clientID,
clientSecret: keys.google.clientSecret
},(accessToken,refreshToken,profile,done)=>{
//check if user already exists in our database
User.findOne({googleId:profile.id}).then((currentUser)=>{
  if(currentUser){
    //already have the user
    console.log('user is:',currentUser);
    done(null,currentUser);
  }else{
    //if not,create user in our database
    new User({
      username:profile.displayName,
      googleId:profile.id
    }).save().then((newUser)=>{
    console.log('new user created:'+newUser);
    done(null,newUser);
  });
  }
});
})
)
