// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {

    const token = user.getJWTToken();

    // Options for cookie
    const options = {
        // convert days into ms
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token,
        options
    })
}

export default sendToken;