# Selise Code Auditor Project

This project was generated using [Nx](https://nx.dev).

## Running Dev Server

First install all packages with: `npm install`

Start `json-server-auth` in another terminal tab with the following command: 

`json-server-auth db.json -r routes.json
`

Run `ng serve code-auditor`for a dev server. Navigate to http://localhost:4200/.

http://localhost:4200 should navigate you to the login page, if there are any problems try clearing out `localStorage` . 

**The credentials for the admin account is**: 
`
email: admin@admin.com; password: admin123`. You can view all the users and their details in the `db.json` file.

## Services 

All the services in this code base are divided into mainly 4 types:
1. `form-service` : used for form creation, setting forms, custom validations.
1. `api-service`: used for handling api.
1. `facade-service`: the component mostly talks through this but in some code it might be talking with other facades. *Mistake on my part*
1. `state-service` : service to talk with the observable store.


