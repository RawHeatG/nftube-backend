function catchHandler
({
    status = 500,
    error = "Error Occured",
    err
}){
    console.log(status, error, err);
}

module.exports = { catchHandler }