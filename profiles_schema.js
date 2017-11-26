import SimpleSchema from 'simpl-schema';
import { Profile } from 'meteor/socialize:user-profile';

/**
 * DB Schema for Profile
 */
Profile.appendSchema({
  userId: {
    type: String,
    index: true,
  },
  biography: {
    type: String,
    optional: true,
  },
  avatar: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
  },
  givenName: {
    type: String,
    optional: true,
  },
  familyName: {
    type: String,
    optional: true,
  },
  namePrivate: {
    type: Boolean,
    defaultValue: true,
    // privacy by default on
  },
});

export default Profile;
