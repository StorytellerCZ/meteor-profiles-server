import SimpleSchema from 'simpl-schema';
import { Profile } from 'meteor/socialize:user-profile';
import { PostableModel } from 'meteor/socialize:postable';
import { LinkableModel } from 'meteor/socialize:linkable-model';

export class PostableProfile extends PostableModel(Profile){
  getFullName() {
    return `${this.givenName} ${this.familyName}`;
  }

  getCountryCode() {
    return this.country.code;
  }
}

PostableProfile.updateTransformFunction();

LinkableModel.registerParentModel(PostableProfile);

/**
 * DB Schema for Profile
 */

const userCountry = new SimpleSchema({
  name: {
    type: String
  },
  code: {
    type: String,
    regEx: /^[A-Z]{2}$/
  }
});

Profile.appendSchema({
  biography: {
    type: SimpleSchema.oneOf(String, Object),
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
  birthday: {
    type: Date,
    optional: true
  },
  gender: {
    type: String,
    allowedValues: ['male', 'female'],
    optional: true
  },
  organization: {
    type: String,
    optional: true
  },
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  country: {
    type: userCountry,
    optional: true
  }
});

export default Profile;
