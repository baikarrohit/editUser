
function saveToLocalStorage(event){
    event.preventDefault();

    const name = event.target.username.value;
    const email = event.target.emailid.value;

    const userData = {
        name,
        email
    }

    // ********** Save Data to Cloud using CrudCrud and POSTMAN **********//

    axios.post("https://crudcrud.com/api/aa8f2b000ff64805807d531351c22151/appointmentdata",userData)
    .then((response) => {
        //console.log(response);
        showUserOnScreen(response.data);
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Ooops! Something Went Wrong.</h4>"
        console.log(err);
    })
}




//*********get the data from crudcrud *******//

window.addEventListener("DOMContentLoaded", ()=> {
    axios.get("https://crudcrud.com/api/aa8f2b000ff64805807d531351c22151/appointmentdata")
        .then((response) => {
            console.log(response)
            for(var i=0; i<response.data.length; i++){
                showUserOnScreen(response.data[i])
            }
        })
        .catch((error) => {
            console.log(error);
        })
    
})

function showUserOnScreen(userData){
   document.getElementById('emailid').value = '';
   document.getElementById('username').value = '';
   if(localStorage.getItem(userData.emailid)!== null){
       removeFromScreen(userData.emailid)
   }
   const parentNode = document.getElementById('items');
   const childHTML =`<li id=${userData._id}> ${userData.name} - ${userData.email}
                       <button onclick=deleteUser('${userData._id}')>Delete User <button>
                       <button onclick=editUserDetails('${userData._id}','${userData.email}','${userData.name}')> Edit</button>                 
                   </li>`
   parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

   //edit user
   function editUserDetails(userId,email,name){
       
       document.getElementById('emailid').value = email;
       document.getElementById('username').value = name;
       deleteUser(userId)
   }

   //delete user
   function deleteUser(userId){
       axios.delete(`https://crudcrud.com/api/aa8f2b000ff64805807d531351c22151/appointmentdata/${userId}`)
           .then((response) => {
               removeFromScreen(userId)
           })
           .catch((error) => {
               console.log(error)
           })
   }
   function removeFromScreen(userId){
       const parentNode = document.getElementById('items');
       const childNodeToBeDeleted = document.getElementById(userId);
       if(childNodeToBeDeleted){
           parentNode.removeChild(childNodeToBeDeleted)
       }
   }
    
    
    
