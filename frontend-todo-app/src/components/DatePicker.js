import React, { useState } from 'react';

function DatePicker() {
    // State to manage the visibility of the date picker (calendar)
    const [isOpen, setIsOpen] = useState(false);
    const [dueDate, setDueDate] = useState('');
    
    // Function to toggle the date picker
    const toggleDatePicker = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="slds-form-element slds-dropdown-trigger slds-dropdown-trigger_click">
                <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon_right">
                    <input
                        type="text"
                        id="date-input-id-dropdown-closed"
                        placeholder=" "
                        className="slds-input"
                        // Optionally add onFocus to open datepicker when the input is focused
                        onFocus={toggleDatePicker}
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <button
                        className="slds-button slds-button_icon slds-input__icon slds-input__icon_right"
                        title="Select a date"
                        onClick={toggleDatePicker}
                    >
                        <svg className="slds-button__icon" aria-hidden="true">
                            <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#event"></use>
                        </svg>
                        <span className="slds-assistive-text">Select a date</span>
                    </button>
                </div>

                {/* Conditionally render the date picker (calendar) */}
                {isOpen && (
                    <div
                        aria-hidden="false"
                        aria-label="Date picker: June"
                        className="slds-datepicker slds-dropdown slds-dropdown_left"
                        role="dialog"
                    >
                        <div className="slds-datepicker__filter slds-grid">
                            {/* Header with previous/next buttons */}
                            <div className="slds-datepicker__filter_month slds-grid slds-grid_align-spread slds-grow">
                                <div className="slds-align-middle">
                                    <button
                                        className="slds-button slds-button_icon slds-button_icon-container"
                                        title="Previous Month"
                                    >
                                        <svg className="slds-button__icon" aria-hidden="true">
                                            <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#left"></use>
                                        </svg>
                                        <span className="slds-assistive-text">Previous Month</span>
                                    </button>
                                </div>
                                <h2 aria-atomic="false" aria-live="polite" className="slds-align-middle" id="defaultPicker-month">
                                    June
                                </h2>
                                <div className="slds-align-middle">
                                    <button
                                        className="slds-button slds-button_icon slds-button_icon-container"
                                        title="Next Month"
                                    >
                                        <svg className="slds-button__icon" aria-hidden="true">
                                            <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#right"></use>
                                        </svg>
                                        <span className="slds-assistive-text">Next Month</span>
                                    </button>
                                </div>
                            </div>
                            <div className="slds-shrink-none">
                                <label className="slds-assistive-text" htmlFor="defaultPicker_select">Pick a Year</label>
                                <div className="slds-select_container">
                                    <select className="slds-select" id="defaultPicker_select">
                                        <option>2021</option>
                                        <option>2022</option>
                                        <option>2023</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Date table */}
                        <table aria-multiselectable="true" className="slds-datepicker__month" role="grid">
                            <thead>
                                <tr id="defaultPicker-weekdays">
                                    <th id="defaultPicker-Sunday" scope="col">
                                        <abbr title="Sunday">Sun</abbr>
                                    </th>
                                    <th id="defaultPicker-Monday" scope="col">
                                        <abbr title="Monday">Mon</abbr>
                                    </th>
                                    <th id="defaultPicker-Tuesday" scope="col">
                                        <abbr title="Tuesday">Tue</abbr>
                                    </th>
                                    <th id="defaultPicker-Wednesday" scope="col">
                                        <abbr title="Wednesday">Wed</abbr>
                                    </th>
                                    <th id="defaultPicker-Thursday" scope="col">
                                        <abbr title="Thursday">Thu</abbr>
                                    </th>
                                    <th id="defaultPicker-Friday" scope="col">
                                        <abbr title="Friday">Fri</abbr>
                                    </th>
                                    <th id="defaultPicker-Saturday" scope="col">
                                        <abbr title="Saturday">Sat</abbr>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Date rows */}
                                <tr>
                                    <td className="slds-day_adjacent-month" role="gridcell" aria-label="31 May 2020">
                                        <span className="slds-day">31</span>
                                    </td>
                                    <td role="gridcell" aria-label="1 June 2020">
                                        <span className="slds-day">1</span>
                                    </td>
                                    <td role="gridcell" aria-label="2 June 2020">
                                        <span className="slds-day">2</span>
                                    </td>
                                    {/* More dates... */}
                                </tr>
                                {/* More rows... */}
                            </tbody>
                        </table>

                        <button className="slds-button slds-align_absolute-center slds-text-link">Today</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DatePicker;
