const users = require('../MOCK_DATA.json')

const poolPromise = require('../config/poolPromise')

// retrieve all users from the database table
const allUsers = async (req, res) => {
    let pool = await poolPromise();
    pool.query(`SELECT * FROM ment.Users`).then(results => {
        let found = results.recordset
        // Row(s) returned
        if (found) {
            return res.status(200).json({
                status: 200,
                success: true,
                message: "success",
                results: found
            })
        }
        // there are no rows in the table
        else {
            console.log("no users found")
            res.status(404).json({
                status: 404,
                success: false,
                message: "users not found",
                results: {}
            });
        }
    });
}

// retrieve one user based on the email passed
const singleUser = async (req, res) => {
    const { email } = req.params
    let pool = await poolPromise();

    // check if the email is in the database table
    pool.query(`SELECT * FROM ment.Users WHERE [email]='${email}'`)
        .then(results => {
            let user_email = results.recordset[0];
            // user email in the database table
            if (user_email) {
                console.log("Email found: " + user_email);
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "success",
                    results: user_email
                })
            }
            // user email not found
            else {
                console.log("user email `" + email + "` not found")
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "email not found",
                    results: {}
                });
            }
        });
}

// User Login 
const Login = async (req, res) => {
    const { email, Password } = req.body
    const pool = await poolPromise()
    pool.query(`SELECT * FROM ment.users WHERE email='${email}'`).then(result => {
        //    Email found in database table
        let user = result.recordset[0]
        if (user) {
            const pass = user.password
            // user password matches the user email
            if (Password === pass) {
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "Logged in successfully",
                    results: user
                })
            }
            // user password does not match the user email
            // error status 401 for invalid authentication credentials
            else {
                return res.status(401).json({
                    status: 401,
                    success: false,
                    message: "Wrong password",
                    results: {}
                })
            }
        }
        // user email not in the database table
        res.status(404).json({
            status: 404,
            success: false,
            message: "The email provided is wrong",
            results: {}
        })
    })
}

const createUser = async (req, res) => {
    let pool = await poolPromise();

    let { id, first_name, last_name, email, gender, Password } = req.body

    pool.query("insert into ment.Users ([id],[first_name],[last_name],[email],[gender],[password]) values ('" + id + "','" + first_name + "','" + last_name + "','" + email + "','" + gender + "','" + Password + "')")
        .then(results => {
            console.log(results.rowsAffected + " added successfully")
        });
}

module.exports = { singleUser, allUsers, Login, createUser }

