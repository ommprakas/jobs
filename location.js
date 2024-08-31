// import React from "react";
// export default class Cities extends React.Component {
//   state = {
//     loading: true,
//     cities: []
//   };

//   async componentDidMount() {
//     const url = "http://localhost:5000/cities/all";
//     const response = await fetch(url);
//     const data = await response.json();
//     this.setState({ cities: data, loading: false });
//     //console.log(data);
//   }
//   constructor() {
//     super();
//     this.state = {
//       search: ""
//     };
//   }

//   updateSearch(event) {
//     this.setState({ search: event.target.value.substr(0, 10) });
//   }

//   render() {
//     // FILTER
//     let filteredCities = this.state.cities.filter(city => {
//       return (
//         cities.city.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
//         -1
//       );
//     });

//     return (
//       <div>
//         <input
//           type="text"
//           value={this.state.search}
//           onChange={this.updateSearch.bind(this)}
//         />

//         {this.state.loading ? (
//           <div> loading... </div>
//         ) : (
//           <div>
//             {this.state.cities &&
//               filteredCities.map(places => (
//                 <div key={places._id}>
//                   {places.city}, {places.country}{" "}
//                   <div>
//                     <img src={places.url} />
//                   </div>
//                 </div>
//               ))}
//           </div>
//         )}
//       </div>
//     );
//   }
// }