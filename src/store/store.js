import {configureStore} from '@reduxjs/toolkit';
import authreducer from "./authslice";
import postmanager from './postmanager';
const store=configureStore({
    reducer:{
        auth:authreducer,
        postmanager:postmanager
    }
})
export default store;
