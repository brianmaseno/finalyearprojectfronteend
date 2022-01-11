/* eslint-disable */
import {useState, useEffect} from 'react';

export const useLoggedInUser = () => {
    var username = sessionStorage.getItem("username")
    var national_id = sessionStorage.getItem("national_id")
    var status = sessionStorage.getItem("status")
    var password = sessionStorage.getItem("password")
    var department_id = sessionStorage.getItem("department_id")
    var firstname = sessionStorage.getItem("firstname")
    var lastname = sessionStorage.getItem("lastname")
    var country = sessionStorage.getItem("country")
    var county = sessionStorage.getItem("county")
    var email = sessionStorage.getItem("email")
    var residence = sessionStorage.getItem("residence")
    var qualification = sessionStorage.getItem("qualification")

    var user = {
        username: username,
        national_id: national_id,
        status: status,
        password: password,
        firstname: firstname,
        lastname: lastname,
        country: country,
        county: county,
        email: email,
        residence: residence,
        qualification: qualification,
        department_id: department_id
    }

    return { user };
}
