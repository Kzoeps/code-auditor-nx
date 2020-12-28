# User Library

Contains all the components and services for user related functions and views.

The different components are :
1. `add-user` : component to add user by admin. This route is protected using `adminGuard` so only the admin can access it.
1. `admin-approval` : component to show all users that have registered but havent been approved by admin yet. This route is also protected by `adminGuard`
1. `edit-user`: view to edit user details. Although most fields are editable I left out the team a user is part of since that is edited from the `edit-team` component. Also protected by `roleGuard` so only resource owner or admin can access this.
1. `user-detail`:displays all of the user details. can be accessed by anyone authenticated.
1. `users`: component to display all approved users.

