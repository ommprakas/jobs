import React from "react";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { Button } from "react-bootstrap";
// import {
//   editEducation,
//   deleteEducation,
//   editedValueUpdateEducation,
//   togglePreview,
//   loader,
//   updateScreenShotIcon,
//   educationFormToggle,
//   sortEducationList
// } from "../../../../../actions/index";
// import { fieldEnums } from "../../../../../enums";
// import {
//   deleteFromObject,
//   editObjectToSend,
// } from "../shared/updatingObjectsToSend";
// import { htmltoCanvas } from "../shared/htmlToCanvas";
// import { formScroll } from "../shared/scrollIntoViewHelper";
// import SortableContainer from "../../../common/SortableComponents/sortableContainer";
// import DragHandle from "../../../common/SortableComponents/dragHandle";

class EducationList extends React.Component {
  constructor(props) {
    super(props);
    // this.onSortEnd = this.onSortEnd.bind(this);
  }
  componentDidMount() { }
  // checkBoxChanged = async (education) => {
  //   this.props.loader(true);
  //   let educationData = { ...education };
  //   educationData.isVisible = !educationData.isVisible;
  //   let educationList = [...this.props.educationList];
  //   let educationDataPut = editObjectToSend(
  //     educationList,
  //     educationData,
  //     education._id
  //   );
  //   await this.props.editedValueUpdateEducation({
  //     field: fieldEnums.education,
  //     valueToSend: educationDataPut,
  //   });
  //   await this.props.togglePreview("2");
  //   let html2canvasbase64 = await htmltoCanvas(
  //     document.getElementsByClassName("capture")[0]
  //   );
  //   if (
  //     html2canvasbase64 !== null &&
  //     typeof html2canvasbase64 !== "undefined"
  //   ) {
  //     this.props.updateScreenShotIcon(html2canvasbase64);
  //   }
  //   this.props.loader(false);
  // };
  async editEducation(objectToEdit) {
    // await this.props.educationFormToggle(true);
    this.props.editEducation(objectToEdit);
    // formScroll("educationFormScroll");
  }
  // async deleteEducationKey(id) {
  //   this.props.editEducation({});
  //   let educationList = [...this.props.educationList];
  //   let valueToSend = deleteFromObject(educationList, id);
  //   await this.props.deleteEducation({
  //     field: fieldEnums.education,
  //     valueToSend: valueToSend,
  //   });

  // }

  render() {
    // //console.log("educationListGootRendecr", this.props.educationList);
    const educationList = this.props.educationList
      ? this.props.educationList
      : [];
    return (
      <React.Fragment>
        <h6>{educationList.length} Records Added</h6>

        {educationList
          ?.map((education) => {
            let objectToEdit = { values: education, key: education._id };
            return (
              <div
                key={education._id}
                className={
                  education.isVisible
                    ? "record_section"
                    : " record_section section_disabled"
                }
              >

                <div className="record_section_header_wrapper">
                  <h5 className="headerTitle">{typeof education?.schoolName == "object" ? education?.schoolName?.name : education?.schoolName}</h5>

                </div>
                <p className="textDescription">
                  {education.startDate &&
                    dateFormat(education.startDate, "mm/yyyy")}{" "}
                  -{" "}
                  {education.currentlyPursuing
                    ? "Currently Pursuing"
                    : dateFormat(education.endDate, "mm/yyyy")}
                </p>
                <p className="textDescription">{education.name}</p>
                <p className="textDescription">{typeof education?.fieldOfStudy == "object" ? education?.fieldOfStudy?.name : education?.fieldOfStudy}</p>
                <p className="textDescription">
                  {education.mark && `Percentage: ${education.mark} %`}
                </p>
              </div>
            );
          })
        }
      </React.Fragment>
    );
  }
}



export default connect(null, {
  // editEducation,
  // deleteEducation,
  // editedValueUpdateEducation,
  // togglePreview,
  // loader,
  // updateScreenShotIcon,
  // educationFormToggle,
  // sortEducationList,
})(EducationList);
