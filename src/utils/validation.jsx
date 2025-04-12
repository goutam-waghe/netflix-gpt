const nameRegex = /^[a-zA-Z ]{2,30}$/;
const emailRegex = /^[\w.-]+@[a-zA-Z_-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


export function checkLogin(email , password)
{
  const isEmail = emailRegex.test(email)
 
 

  if(!isEmail)
  {
    return "email should contain @"
  }
 
  return null;
}
export function CheckSignup(name, email , password)
{
  const isName = nameRegex.test(name)
  const isEmail = emailRegex.test(email)
  const isPassword = passwordRegex.test(password)

 if(!isName)
 {
    return "Enter valid name"
 }
  if(!isEmail)
  {
    return "email should contain @"
  }
  if(!isPassword)
  {
    return "passowrd should min 8 legnth contain 1 uppercase ,1 lowercase , 1 spacial char"
  }

  return null;
}