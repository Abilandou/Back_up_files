import React, { Component } from 'react'


//get data from api
const apiGetUsers = "http://localhost:5000/api/users";

async function getUserFromServer(){
    try{
        let response = await fetch(apiGetUsers);
        let responseJson = await response.json();
        return responseJson.data;//list all users
    }catch(error){
        console.error(`Error is ${error}`);
    }
}

export { getUserFromServer };

