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

Meteor.methods({
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
    let profile = Meteor.profiles.findOne({userId: Meteor.userId()})/*
    if(names.given){
      check(names.given, String)
      profile.set("givenName", names.given)
    }
    if(names.family){
      check(names.family, String)
      profile.set("familyName", names.family)
    }
    let result = profile.save()
    */

    let result = profile.update({$set: {givenName: names.given, familyName: names.family}})

    console.log(result);
    if(result){
      return true
    } else {
      return false
    }
  }
});
