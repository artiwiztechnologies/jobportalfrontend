import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Range, getTrackBackground } from "react-range";
import Checkbox from "../../../node_modules/@material-ui/core/Checkbox";
import { FormGroup } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import GlobalContext from "../../context/GlobalContext";
import { printRes } from "../../helper2";


const STEP = 1;
const MIN = 50;
const MAX = 180;

const CheckStyled = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #2b3940 !important;
  font-size: 16px;
  color: inherit;
  &::before {
    content: "\f0c8";
    font-weight: 400;
    font-family: "Font Awesome 5 Free";
    display: inline-block;
    color: #7e8989;
    margin-right: 11px;
    margin-top: 2px;
  }
  &.active {
    color: #2b3940 !important;
    font-weight: 600;
    &::before {
      content: "\f14a";
      font-weight: 900;
      color: #00b074;
    }
  }
`;

const Check = ({ children }) => {
  const [active, setActive] = useState(false);

  return (
    <CheckStyled
      className={`toggle-item ${active ? "active" : ""}`}
      onClick={() => {
        setActive(!active);
      }}
    >
      {children}
    </CheckStyled>
  );
};

const Sidebar = () => {
  const [rangeValues, setRangeValues] = useState([70, 150]);

  const [val, setVal] = useState("");
  const gContext = useContext(GlobalContext);

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  const [fullTime, setFullTime] = useState("");
  const [partTime, setPartTime] = useState("");
  const [intern, setIntern] = useState("");
  const [arr, setArr] = useState([]);

  const handleChange = (e) => {
    // setVal(e.target.val);
    // gContext.toggleFilterJobType1(e.target.value);
  };

  const handleFull = (e) => {
    setChecked1(e.target.checked);
    if (!checked1) {
      setFullTime(e.target.value);
      gContext.toggleFilterJobType1(e.target.value);
    } else {
      setFullTime("");
      gContext.toggleFilterJobType1("");
    }
  };
  const handlePart = (e) => {
    setChecked2(e.target.checked);
    if (!checked2) {
      gContext.toggleFilterJobType2(e.target.value);
      setPartTime(e.target.value);
    } else {
      gContext.toggleFilterJobType2("");
      setPartTime("");
    }
  };
  const handleIntern = (e) => {
    setChecked3(e.target.checked);
    if (!checked3) {
      gContext.toggleFilterJobType3(e.target.value);
      setIntern(e.target.value);
    } else {
      gContext.toggleFilterJobType3("");
      setIntern("");
    }
  };
  // printRes(
  //   `${gContext.filterJobType1} ${gContext.filterJobType2} ${gContext.filterJobType3}`
  // );

  return (
    <>
      {/* <!-- Sidebar Start --> */}
      <div className="widgets mb-11">
        <h4 className="font-size-6 font-weight-semibold mb-6">Job Type</h4>
        <ul className="list-unstyled filter-check-list">
          <li className="mb-2">
            <div style={{}} class="form-check">
              <input
                style={{ transform: "scale(1.5)" }}
                class="form-check-input"
                type="checkbox"
                value="Full Time"
                checked={checked1}
                onChange={handleFull}
                id="flexCheckDefault"
              />
              <label
                style={{ marginTop: "-5px" }}
                class="form-check-label"
                for="flexCheckDefault"
              >
                Full Time
              </label>
            </div>
            <div class="form-check">
              <input
                style={{ transform: "scale(1.5)" }}
                class="form-check-input"
                type="checkbox"
                value="Part Time"
                checked={checked2}
                onChange={handlePart}
                id="flexCheckChecked"
              />
              <label class="form-check-label" for="flexCheckChecked">
                Part Time
              </label>
            </div>
            <div class="form-check">
              <input
                style={{ transform: "scale(1.5)" }}
                class="form-check-input"
                type="checkbox"
                value="Intern"
                checked={checked3}
                onChange={handleIntern}
                id="flexCheckChecked"
              />
              <label class="form-check-label" for="flexCheckChecked">
                Intern
              </label>
            </div>
            {/* <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={gContext.filterJobType}
                onChange={handleChange}
                value="Full Time"
                checked={gContext.filterJobType == "Full Time"}
                // checked
              />
              <label class="form-check-label" for="exampleRadios1">
                Full Time
              </label>
            </div> */}
            {/* <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={gContext.filterJobType}
                onChange={handleChange}
                value="Part Time"
                checked={gContext.filterJobType == "Part Time"}
              />
              <label class="form-check-label" for="exampleRadios2">
                Part Time
              </label>
            </div> */}
            {/* <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={gContext.filterJobType}
                onChange={handleChange}
                value="Intern"
                checked={gContext.filterJobType == "Intern"}
              />
              <label class="form-check-label" for="exampleRadios2">
                Intern
              </label>
            </div> */}
          </li>
        </ul>
      </div>
      <div className="widgets mb-11 ">
        <div className="d-flex align-items-center pr-15 pr-xs-0 pr-md-0 pr-xl-22">
          <h4 className="font-size-6 font-weight-semibold mb-6 w-75">
            Salary Range
          </h4>
          {/* <!-- Range Slider --> */}

          <div className="slider-price w-25 text-right mr-7">
            <p className="font-weight-bold">
              <span
                className="text-primary font-weight-semibold font-size-4 "
                css={`
                  white-space: nowrap;
                `}
              >
                ${rangeValues[0].toFixed()} - {rangeValues[1].toFixed()}K
              </span>
            </p>
          </div>
        </div>
        <div className="graph text-center mx-0 mt-5 position-relative chart-postion">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="range-slider">
          <>
            <Range
              values={rangeValues}
              step={STEP}
              min={MIN}
              max={MAX}
              onChange={(values) => {
                setRangeValues(values);
              }}
              renderTrack={({ props, children }) => (
                <div
                  role="button"
                  tabIndex={0}
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: "15px",
                    display: "flex",
                    width: "290px",
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: "5px",
                      width: "100%",
                      borderRadius: "4px",
                      background: getTrackBackground({
                        values: rangeValues,
                        colors: ["#ccc", "#00b074", "#ccc"],
                        min: MIN,
                        max: MAX,
                      }),
                      alignSelf: "center",
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "24px",
                    width: "24px",
                    borderRadius: "50%",
                    backgroundColor: "#FFF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "none !important",
                    outline: "none !important",
                  }}
                  css={`
                    &:focus {
                      outline: none !important;
                    }
                  `}
                ></div>
              )}
            />
          </>
        </div>
      </div>
      
    </>
  );
};

export default Sidebar;