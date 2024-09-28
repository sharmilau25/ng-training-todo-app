import React, { useEffect, useState } from 'react';
import DatePicker from './DatePicker';

const NewTaskModal = ({ isOpen, onClose }) => {

    const [assignedToOptions, setAssignedToOptions] = useState([]); // State to store fetched data
    const [selectedAssignedTo, setSelectedAssignedTo] = useState(''); // State to track selected option
    const [status, setStatus] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [description, setDescription] = useState('');

    const handleSave = async () => {
        try {
            // Check if dueDate is valid
            if (!dueDate || isNaN(new Date(dueDate).getTime())) {
                throw new Error('Invalid due date');
            }
    
            // Assuming dueDate is in mm/dd/yyyy format, convert it to yyyy-mm-dd
            const [month, day, year] = dueDate.split('/'); // Split mm/dd/yyyy
            const formattedDueDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; // Format to yyyy-mm-dd
            
        const taskData = {
            assigned_to: selectedAssignedTo,
            status,
            due_date: formattedDueDate,//formatted due date to be passed
            priority,
            description
        };
        console.log('Task Data:', taskData);

        // try {
            const response = await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });

            if (!response.ok) {
                throw new Error('Error saving task');
            }

            const data = await response.json();
            console.log('Task saved:', data);
            onClose();  // Close the modal after saving
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Fetch 'Assigned To' data from the API
    useEffect(() => {
        // Fetch assigned_to values from the backend
        fetch('http://localhost:5000/api/assigned-to')
            .then((response) => response.json())
            .then((data) => {
                setAssignedToOptions(data); // Set the options for the dropdown
            })
            .catch((error) => {
                console.error('Error fetching assigned_to options:', error);
            });
    }, []);

    // Handle selection change
    const handleAssignedToChange = (event) => {
        setSelectedAssignedTo(event.target.value);
    };
    return (
        <>
            {/* Modal */}
            <div className={`slds-modal ${isOpen ? 'slds-fade-in-open' : ''}`} role="dialog">
                <div className="slds-modal__container">
                    {/* Modal/Close Button */}
                    <button className="slds-button slds-button_icon slds-modal__close" onClick={onClose}>
                        <svg className="slds-button__icon" aria-hidden="true">
                            <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
                        </svg>
                        <span className="slds-assistive-text">Close</span>
                    </button>

                    {/* Modal Header */}
                    <div className="slds-modal__header">
                        <h2 className="slds-text-heading_medium ">New Task</h2>
                    </div>

                    {/* Modal Body */}
                    <div className="slds-modal__content slds-p-around_large">
                        <div className='slds-grid'>
                            <div className='slds-col'>
                            <div className="slds-form-element">
                                <label className="slds-form-element__label" htmlFor="form-element-03">
                                <abbr className="slds-required" title="required">* </abbr>Assigned To</label>
                                <div className="slds-form-element__control">
                                <div className="slds-select_container">
            <select
                className="slds-select"
                id="assignedToSelect"
                value={selectedAssignedTo}
                onChange={handleAssignedToChange}
                required
            >
                <option value="" disabled>Select a person</option>
                {assignedToOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
                                </div>
                                </div>
                            </div>
                            <div className='slds-col slds-m-left_small'>
                            <div className="slds-form-element">
                                <label className="slds-form-element__label" htmlFor="form-element-03">
                                <abbr className="slds-required" title="required">* </abbr>Status</label>
                                <div className="slds-form-element__control">
                                <div className="slds-select_container">
                                    <select className="slds-select" id="defaultStatus_select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option>Not Started</option>
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                    <option>On Hold</option>
                                    </select>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className='slds-grid'>
                            <div className='slds-col'>
                            <div className="slds-form-element">
                                <label className="slds-form-element__label" htmlFor="form-element-03">Due Date</label>
                                <div className="slds-form-element__control">
                                    <DatePicker/>
                                {/* <input type="text" id="form-element-03" placeholder="Placeholder text…" required="" className="slds-input" /> */}
                                </div>
                                </div>
                            </div>
                            <div className='slds-col slds-m-left_small'>
                            <div className="slds-form-element">
                                <label className="slds-form-element__label" htmlFor="form-element-03">
                                <abbr className="slds-required" title="required">* </abbr>Priority</label>
                                <div className="slds-form-element__control">
                                <div className="slds-select_container">
                                    <select className="slds-select" id="defaultStatus_select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                                    <option>Normal</option>
                                    <option>Low</option>
                                    <option>High</option>
                                    </select>
                                </div>
                                {/* <input type="text" id="priority" placeholder="Placeholder text…" required="" className="slds-input" /> */}
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className='slds-grid'>
                            <div className='slds-col'>
                            <div className="slds-form-element">
                                <label className="slds-form-element__label" htmlFor="form-element-03">Description</label>
                                <div className="slds-form-element__control">
                                <textarea  id="form-element-05" className="slds-input" rows={4} cols={30}  value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="slds-modal__footer">
                        <button className="slds-button slds-button_neutral" onClick={onClose}>Cancel</button>
                        <button className="slds-button slds-button_brand" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && <div className="slds-backdrop slds-backdrop_open"></div>}
        </>
    );
};
export default NewTaskModal;
