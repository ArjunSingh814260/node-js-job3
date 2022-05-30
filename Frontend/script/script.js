async function getRequest() {
  const info = await fetch("http://localhost:8000/getRequest");
  const data = await info.json();

  var container = document.getElementById("main-container");
  console.log(data);
  // data.map((result) => {
  //   getresult(result);
  // });

  for (var key in data) {
    container.innerHTML += ` <div class="container-box-2">
          <div class="profile-name">
          <img src=".${data[key].imgPath}" id="img" />
          <h5 id="firtName"> ${data[key].firstName}</h5>
        </div>
        <h5 class="lastName"> ${data[key].lastName}</h5>
        <h5 class="Number">${data[key].email}</h5>
        <h5 class="age">${data[key].age}</h5>
        <h5 class="city">${data[key].city}</h5>
         <h5 class="gender">${data[key].gender}</h5>
          
           </div>`;
  }
}

// function getresult(result) {
//   const container = document.getElementById("main-container");
//   const add = `
//   <p>${result.firstName}</p>
//    <p>${result.lastName}</p>
//     <p>${result.age}</p>
//      <p>${result.city}</p>

//   `;
//   container.innerHTML += add;
// }
