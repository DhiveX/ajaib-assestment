# Ajaib Assestment Test

- Creating filtered Datatable with pagination and Filtermenu

## Installation

for install the dependencies

```bash
npm install
```

## Usage

```
npm run dev
```

## Test Requirement

- Creating datatable component

using React-datatable-component '[React-DataTable-Component](https://react-data-table-component.netlify.app/)'

- API Reference 

using random user API '[Random User API](https://randomuser.me/)'

i using axios for fetching API, you need to install the **axios** first 
'[Axios](https://github.com/axios/axios)'

you can find it on the redux action file **userAction.jsx**

and you can see the redux files at **store** folder

the datatable is in **index.js** 

and the index.js has a wrapper component it calls **withUser.jsx**

the filter menu and pagination is always change API queryParams when the **applyFilter** button is clicked.

 
it makes the pagination need some params from the API 
