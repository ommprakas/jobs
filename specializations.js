// import React, { useState, useEffect } from "react";
// import { Chip, IconButton } from "@material-ui/core";

// import { useDispatch, useSelector } from "react-redux";
// import {
//   getProfileThunk,
//   getspecializationsThunk
// //   UpdateSkillsThunk,
// } from "../../../redux";
// import { ReactSearchAutocomplete } from "react-search-autocomplete";
// import CancelIcon from "@material-ui/icons/Cancel";
// import Form from "react-bootstrap/Form";
// import { Button } from "bootstrap";
// import { addSkill } from "../../../apis/CommonService/commonApi";
// import commonServices from "../../../helper/commonServices";
// export const Specializations = () => {
//   const dispatch = useDispatch();
    
//   const specializationDataResponse = useSelector(
//     (state) => state.SpecializationSlice.specializationData
//   );

//   const profileData = useSelector((state) => state.profileSlice.userProfile);
//   // const [show, setShow] = useState(false);

//   // const handleClose = () => setShow(false);
//   // const handleShow = () => setShow(true);
//   const [stringToAdd,setStringToAdd]=useState(null);
// //   const [selectedSkills, setSelectedSkills] = useState([]);

//   useEffect(() => {
//     dispatch(getspecializationsThunk());
//   }, []);

// //   useEffect(() => {
// //     const alreadySelectedSkills =
// //       profileData &&
// //       profileData.response &&
// //       profileData.response &&
// //       profileData.response.resumeObjData &&
// //       profileData.response.resumeObjData &&
// //       profileData.response.resumeObjData.skills
// //         ? profileData.response.resumeObjData.skills
// //         : null;

// //     setSelectedSkills(alreadySelectedSkills);
// //   }, [profileData]);


//   const formatResult = (item) => {
//     return (
//       <>
//         <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
//       </>
//     );
//   };

// //   const handleOnSelectSkills = async (item) => {
//     // the item selected

// //     const newItem = selectedSkills.filter((item2) => {
// //       if (item2.skillId === item._id) {
// //         return item2;
// //       }
// //     });
// //     if (newItem.length === 0) {
// //       setSelectedSkills([
// //         ...selectedSkills,
// //         { skillId: item._id, name: item.name, skillLevel: "" },
// //       ]);
// //       await dispatch(
// //         UpdateSkillsThunk([
// //           ...selectedSkills,
// //           { skillId: item._id, name: item.name, skillLevel: "" },
// //         ])
// //       );
// //       dispatch(getProfileThunk({}));
// //     }
// //   };

// //   const handleSkillDelete = (chipToDelete) => async () => {
// //     setSelectedSkills((item) =>
// //       item.filter((chip) => chip.skillId !== chipToDelete.skillId)
// //     );
// //     const updatedSkills = selectedSkills.filter(
// //       (chip) => chip.skillId !== chipToDelete.skillId
// //     );
// //     await dispatch(UpdateSkillsThunk(updatedSkills));
// //     dispatch(getProfileThunk({}));
// //   };
// //   const handleOnSearch = (string, results) => {
// //     // onSearch will have as the first callback parameter
// //     // the string searched and for the second the results.
// //    if(results?.length==0){
// //      setStringToAdd(string)
// //     }
// //     if(results?.length>0){
// //      setStringToAdd(null)
// //     }
    
// //   }

// //   async function addCustomSkill(){
// //     await addSkill(stringToAdd)
// //     await handleOnSelectSkills({   _id: commonServices.skillObjData._id, name: stringToAdd, skillLevel: "" })
// //   }
//   return (
//     <div>
//       {/* {show && <AddCustomData show={show} handleClose={handleClose} handleShow={handleShow} />} */}
//       <p>Specializations</p>
//       <div>
//       {/* {stringToAdd && <button onClick={()=>addCustomSkill()}>Add Skills</button>} */}
//       </div>
//       <div className="autoCompleteDropdown">
//         <ReactSearchAutocomplete
//           items={
//             specializationDataResponse &&
//             specializationDataResponse.response &&
//             specializationDataResponse.response.result &&
//             specializationDataResponse.response.result
//           }
//         //   onSearch={handleOnSearch}
//         //   onSelect={handleOnSelectSkills}
//           autoFocus
//           placeholder="Search skills"
//           formatResult={formatResult}

          
//         />
//       </div>
      
//       {/* <div className="chipWrapper">
//         {selectedSkills &&
//           selectedSkills
//             .map((item) => {
//               return (
//                 <div key={item.skillId} className="cusChip">
//                   {item.name}
                 

//                   <IconButton
//                     onClick={handleSkillDelete(item)}
//                     aria-label="delete"
//                     size="small"
//                   >
//                     <CancelIcon fontSize="inherit" />
//                   </IconButton>
//                 </div>
//               );
//             })
//             .reverse()}
//       </div> */}
//     </div>
//   );
// };
