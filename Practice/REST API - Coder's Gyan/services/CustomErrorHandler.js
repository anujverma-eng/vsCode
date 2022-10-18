class CustomErrorHandler extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.msg = msg;
    }

    static alreadyExist(msg="Email is already in use.") {
        return new CustomErrorHandler(409, msg);
    }
    static wrongCredentials(msg="Username or Password is incorrect") {
        return new CustomErrorHandler(401, msg);
    }

    static unAuthorize(msg="unAuthorize") {
        return new CustomErrorHandler(401, msg);
    }

    static notFound(msg="404 Not Found") {
        return new CustomErrorHandler(404, msg);
    }

    static serverError(msg="Internal Server Error, IMG") {
        return new CustomErrorHandler(500, msg);
    }

}

export default CustomErrorHandler;