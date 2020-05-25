import { SET_TABLE } from './actionTypes';

export function setTable(table) {
    return {
        type: SET_TABLE,
        payload: {
            table
        }
    }
}