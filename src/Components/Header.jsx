import React, { Fragment, useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBed, faCar, faCalendarDays, faPerson, faPlane, faTaxi} from '@fortawesome/free-solid-svg-icons';
import {DateRange} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {format} from "date-fns";
import {useNavigate} from 'react-router-dom'

const Header = ({list}) => {
    const [destination, setDestination] = useState("")
    const [openDate, setOpenDate] = useState(false);
    const navigate = useNavigate();
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])

    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1 
    })


    const handleOption = (name, operation) => {
        setOptions (prev => {return {
            ...prev, [name]: operation === "i" ? options[name]++ : options[name]--
        }})
        console.log("hh",options.adult)
    }

    const handleSearch = () => {
        navigate("/hotels", {state: {destination, date, options}})
    }
  return (
    <div className="header">
        <div className={list === true ? "headerContainer listMode" : "headerContainer"}>
            <div className="headerList">
                <div className="headerListItem active">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stays</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car Rentals</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Attractions</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Taxi</span>
                </div>
            </div>
            {!list &&   
                <Fragment>
                    <h1 className="headerTitle">A lifetime of discounts for your travels.</h1>
                    <p className="headerDescription">Get Rewarded for your travels</p>
                    <button className="headerBtn">Sign in/Register</button>
                    <div className="headerSearch">
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faBed} className="headerIcon"/>
                            <input type="text" placeholder="Find place" className="headerSearchInput" onChange={(e) => setDestination(e.target.value)}/>
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                            <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                            {openDate && 
                                <DateRange className="date" editableDateInputs={true} onChange={item => setDate([item.selection])} moveRangeOFirstSelection={false} ranges={date} />
                            }
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                            <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{options.adult} adult | {options.children} children | {options.room} room(s)</span>
                            {openOptions && 
                                <div className="options">
                                    <div className="optionItem">
                                        <span className="optionText">Adult</span>
                                        <div className="optionCounter">
                                            <button disabled={options.adult <= 1} className="optionCounterButton" onClick={() => handleOption("adult", "d")}>-</button>
                                            <span className="optionCounterNumber">{options.adult}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Children</span>
                                        <div className="optionCounter">
                                            <button disabled={options.children <= 0} className="optionCounterButton" onClick={() => handleOption("children", "d")}>-</button>
                                            <span className="optionCounterNumber">{options.children}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Rooms</span>
                                        <div className="optionCounter">
                                            <button disabled={options.room <= 1} className="optionCounterButton" onClick={() => handleOption("room", "d")}>-</button>
                                            <span className="optionCounterNumber">{options.room}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="headerSearchItem">
                            <button className="headerBtn" onClick={handleSearch}>Search</button>
                        </div>
                    </div>
            </Fragment>
            }
        </div>
    </div>
  )
}

export default Header