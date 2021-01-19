import bcrypt from 'bcryptjs'

const user = [
    {
        "first_name": "John",
        "last_name": "carter",
        "image": "https://www.pinterest.com/pin/718113103059412741/",
        "age": 23,
        "gender": "male",
        "email": "info@feedbyme.com",
        "mobile": "0000000000",
        "password": bcrypt.hashSync('pass123', 10),
        "user_type": "user"
    }

]

export default user;