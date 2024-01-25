let ENDPOINT;
const environment = process.env.NODE_ENV;
if(environment==="development"){
    ENDPOINT = "http://localhost:3001";
}
if(environment==="production"){
    ENDPOINT = "";
}

export default ENDPOINT;