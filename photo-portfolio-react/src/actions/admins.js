import types from "./actionTypes";
import api from "../api";

const listOfAdmins = admins => ({
    type: types.LIST_OF_ADMINS,
    admins
});

const getListOfAdmins = () => dispatch =>
    api.admins.getListOfAdmins().then(admins => {
        dispatch(listOfAdmins(admins));
    });

export default getListOfAdmins;