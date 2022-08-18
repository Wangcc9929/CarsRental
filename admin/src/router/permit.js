import Router from './index'
import {getToken} from '../utils/cookies'

Router.beforeEach((to,from,next=>{
    console.log(getToken())
    if(getToken()){
        next();
    }else{
        if(to.name==="Login")
            next();
        else
            next({name:"Login"})
    }
}))