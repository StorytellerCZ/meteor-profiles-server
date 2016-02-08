Profile.appendSchema({
  "biography": {
    type: String,
    optional: true
  },
  "avatar": {
    type: String,
    optional: true
  },
  "givenName": {
    type: String,
    optional: true
  },
  "familyName": {
    type: String,
    optional: true
  }
})

Meteor.users.after.insert(function(userId, document) {
    let profile = {
        userId:document._id
    };

    if(document.username){
        profile.username = document.username;
    }

    Meteor.profiles.insert(profile);
});

Meteor.methods({
  /**
   * If user doesn't have profile collection, then make them one
   * TODO: test
   */
  checkForProfile:function(username){
    if(username === null){
      userId = Meteor.userId()
    }
    if(username){
      let obj = Meteor.profiles.find({username: username}).fetch()
      if(obj.length === 0){
        let document = Meteor.users({_id: userId})
        if(document){
          //create a new profile for the given user
          let profile = {
              userId:document._id
          }

          if(document.username){
              profile.username = document.username;
          }

          Meteor.profile.insert(profile)
        }

      }
      if(obj.length > 1){
        console.log(Meteor.userId() + " has more then one profile documents!");
      }
    }
  },
  updateAvatar:function(avatar){
    check(avatar, String)
    let profile = Meteor.profiles.findOne({userId: Meteor.userId()}).update({$set: {avatar: avatar}})
    if(profile === undefined){
      return true
    } else {
      return false
    }
  },
  updateBiography:function(bio){
    check(bio, String)
    let profile = Meteor.profiles.findOne({userId: Meteor.userId()}).update({$set: {biography: bio}})
    //console.log(profile);
    if(profile === undefined){
      return true
    } else {
      return false
    }

    //profile.set('biography', bio)
    //let save = profile.save()
    //console.log(save);
  },
  updateName:function(names){
    //TODO: .save() returns an error and object, even though it saves
    let profile = Meteor.profiles.findOne({userId: Meteor.userId()})
    if(names.given){
      check(names.given, String)
      profile.set("givenName", names.given)
    }
    if(names.family){
      check(names.family, String)
      profile.set("familyName", names.family)
    }
    let result = profile.save()
    console.log(result);
    if(result === undefined){
      return true
    } else {
      return false
    }
  }
});
