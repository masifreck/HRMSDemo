// export const myFetchGetRequest = async (mobileNumber) => {
//     const response = await fetch(`https://api.tranzol.com/apiv1/MobilePayReport?m=${mobileNumber}`, {
//         method: 'GET',
//         headers: {
//             clientsecret: "TRANZOLMOBILEREPORT",
//             clientid: "TRANZOL",
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//     })
//     const resjson = await response.json();
//     return resjson;
// }

// const apiUrl = 'https://exim.tranzol.com/api/Test/APILogin?';

// export const myFetchPostRequest = async (Data) => {
//     const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(Data),
//       })
//     return response;
// }



// export const myFetchGetRequest = async (username,password) => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch(`https://hrexim.tranzol.com/api/apilogin/login?username=${username}&password=${password}`);
//       const jsonData = await response.json();
//       setData(jsonData);
//     } catch (error) {
//       console.error(error);
//     }
//   };



// }
