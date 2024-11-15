

const getALLCustomers = () =>{
    const customers = [
        {
          name: "RB",
          mobile: "555-1234"
        },
        {
          name: "NT",
          mobile: "555-5678"
        },
        {
          name: "GD",
          mobile: "555-8765"
        },
        {
          name: "GP",
          mobile: "555-4321"
        },
        {
          name: "rb",
          mobile: "999999999"
        },
        {
            name: "NT",
            mobile: "77777777"
          }
    ]; 
     return customers;
}

module.exports = getALLCustomers; //this function can be imported in other files

const getALLUsers = ()=>{
  const users =[
      {
        name: "rb",
        mobile: "999999999"
      },
      {
          name: "NT",
          mobile: "77777777"
        },

  ]; 
  return users
}
module.exports = getALLUsers;