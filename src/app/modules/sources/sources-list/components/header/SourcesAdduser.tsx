/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CreateSource,
  getcampaigns,
  getcompanies,
  getsource,
  getsourceStatuses,
  SourcesLoading,
} from "../../_redux/sourceAction";

export default function SourceAdduser() {


  const navigation = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state?.auth?.authToken);

  useEffect(() => {
    dispatch(getsource(token));
    dispatch(getcampaigns(token));
    dispatch(getcompanies(token));
    dispatch(getsourceStatuses(token));
  }, []);

  const [data, setData] = useState({
    SourceName: " ",
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(data, "EDIT_PROFILE");

    dispatch(CreateSource(data, token));

    setData({
      SourceName: " ",
    });
    dispatch(SourcesLoading(true));
    navigation("/sources/source");
  };

  return (
    <>
      <div className="content d-flex flex-column flex-column-fluid">
        <div id="kt_content_container" className="container-xxl">
          <div className="form d-flex flex-column flex-lg-row">
            <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
              <div className="tab-content">
                <div className="tab-pane fade show active">
                  <div className="d-flex flex-column gap-7 gap-lg-10">
                    <div className="card card-flush py-4">
                      <div className="card-header">
                        <div className="card-title">
                          <h2>Source Details</h2>
                        </div>
                      </div>

                      <div className="card-body pt-0">
                        <form className="form">
                          <div className="form-group row mb-2">
                            <div className="col-lg-6 ">
                              <label> Source Name:</label>
                              <input
                                type="text"
                                placeholder="Enter Your Name"
                                value={data.SourceName}
                                onChange={handleChange}
                                name="SourceName"
                                className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-dark me-5"
                  onClick={() => {
                    navigation("/sources/source");
                  }}
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    handleSubmit();
                    // navigation("users");
                  }}
                  className="btn btn-primary"
                >
                  <span className="indicator-label">Save Changes</span>
                  <span className="indicator-progress">
                    Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                </button>
              </div>
            </div>
          </div>
          {/*end::Form*/}
        </div>
      </div>
    </>
  );
}
