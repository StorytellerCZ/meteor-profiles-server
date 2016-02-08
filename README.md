Server package build on socialize:user-profile to add the following to the user profile:
* Real name
* Biography
* WIP: Avatar

This is server code only so that you can apply any client side package that you like. Check out storytellercz:profiles-react-materialize

UNDER DEVELOPMENT

Available methods:
=====
**checkForProfile(username)**
Makes sure that the given user has a profile document created. If not it will create it. If username is null, it will look into the currently logged in user.

**updateAvatar(location)**
Will update the avatar location in the document.

**updateBiography(text)**
Updates the biography in the document.

**updateName(namesObject)**
Pass in the following object
```
{
  given: "given name",
  family: "family name"
}
```
It will then update the names in the document.
