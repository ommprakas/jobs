import React, { useState, useEffect } from 'react';
import {  Button } from "reactstrap";
import { useDispatch, useSelector, connect } from 'react-redux';
import { getJobDetailThunk } from '../../redux/jobSlice';
import { useParams } from "react-router";
import _ from "lodash";
import {  useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import CompanyFormComponent from './CompanyFormComponent';
export const EditCompany = (props) => {
  const { id } = useParams();
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  return (
    <div className="mainContentWrapper">
     <CompanyFormComponent navigate={navigate} companyId={id} edit={true} />
    </div>
  );
};
