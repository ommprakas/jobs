// import React, { useEffect, useState } from 'react';
// import { Card,CardBody,CardImg,CardTitle,CardText } from "reactstrap";
// import {useDispatch} from 'react-redux';
// import { getMyListing } from '../../redux/jobSlice';

// import { createJob } from '../../apis';
// import _ from "lodash";

// export const MyListing = () => {
//   const dispatch = useDispatch();
//     useEffect(() => {
//         const fetchData = async () => {
//           await dispatch(getMyListing({ skip:0,limit:20,firstTime:true }));
//         };
//         fetchData()
//           // make sure to catch any error
//           .catch(console.error);
//       }, []);
    
//   return (
//     <div className="mainContentWrapper">
//       {/* <EditJob/> */}
      
//       Card image cap

//       <>
//         <Card className="my-2">
//           <CardImg
//             alt="Card image cap"
//             src="https://picsum.photos/900/180"
//             style={{
//               height: 180
//             }}
//             top
//             width="100%"
//           />
//           <CardBody>
//             <CardTitle tag="h5">
//               Card Title
//             </CardTitle>
//             <CardText>
//               This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
//             </CardText>
//             <CardText>
//               <small className="text-muted">
//                 Last updated 3 mins ago
//               </small>
//             </CardText>
//           </CardBody>
//         </Card>
        
//       </>
//     </div>
//   );
// };
