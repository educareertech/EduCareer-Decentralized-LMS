import { SignUpTab } from '../models/newUserSchema.js';

const signUp = async (req, res) => {
  try {
    const password = req.body.password;
    const confirm_password = req.body.confirmPassword;
    if (password === confirm_password) {
      console.log(req.body);
      // const addUser = new SignUpTab(req.body)
      const addUser = new SignUpTab({
        full_name: req.body.name,
        father_name: req.body.fatherName,
        surname: req.body.surname,
        email: req.body.email,
        city: req.body.city,
        zip: req.body.zip,
        postal_address: req.body.postalAddress,
        password: req.body.password,
        confirm_password: req.body.confirmPassword
      })
      const saveUser = await addUser.save()
      res.send(saveUser)
    } else {
      res.status(201).json("Backend: Confirm Password Different than password");
    }
  } catch (error) {
    console.log("Error While SignUp", error.message)
  }
}

export { signUp }