import React, { useState, useEffect } from 'react';
import NewTaskModal from './NewTaskModal';
import EditTaskModal from './EditTaskModal';
import DeleteTaskModal from './DeleteTaskModal';

const TaskList = () => {
    const [search, setSearch] = useState('');
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [modalType, setModalType] = useState(null);  // State to track which modal is open

      // Functions to open each modal
      const openNewTaskModal = () => {
        setModalType('newTask');  // Set modal type to New Task
        setSelectedTask(null);     // Reset selected task
    };

    const openEditTaskModal = (task) => {
        setModalType('editTask');  // Set modal type to Edit Task
        setSelectedTask(task);      // Set the selected task
    };

    const openDeleteTaskModal = (task) => {
        setModalType('deleteTask'); // Set modal type to Delete Task
        setSelectedTask(task);       // Set the selected task
    };

    const closeModal = () => {
        setModalType(null);          // Close any modal
        setSelectedTask(null);       // Reset selected task
    };

    useEffect(() => {
        // Get tasks from the backend using fetch
        fetch('http://localhost:5000/api/tasks')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse JSON response
            })
            .then(data => {
                setTasks(data);  // Set the tasks in the state
            })
            .catch(error => {
                console.error('There was a problem fetching the tasks:', error);
            });
    }, []);

    //Display records on page
    useEffect(() => {
    const fetchTasks = async () => {
        const response = await fetch(`/api/tasks?page=${currentPage}&limit=${recordsPerPage}`);
        const data = await response.json();
        setTasks(data.tasks);
        setTotalRecords(data.total);
    };
    fetchTasks();
    }, [currentPage, recordsPerPage]);


    //Display edited date as per dd/mm/yyyy format
    function formatDate(dateString) {
        // Convert the string to a Date object
        const date = new Date(dateString); 
        // Add leading zero if needed here not needed
        //const day = String(date.getDate()).padStart(2, '0'); 
        const day = String(date.getDate());
        // Months start from  zero  so add 1
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        // Get Year 
        const year = date.getFullYear();
        //return formatted date
        return `${day}/${month}/${year}`;
    }  
    //Dropdown display  
        const toggleDropdown = () => {
            setIsDropdownOpen(!isDropdownOpen);
        };

    // Handle new tasks modal
    const handleNewTask = () => {
         setIsModalOpen(true); // Open the modal
    };
    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };
    // Search Code for task list
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };
// Function to open the delete modal and set the selected task
const openDeleteModal = (task) => {
    setSelectedTask(task);  // Set the task to be deleted
    setIsModalOpen(true);   // Open the modal
  };
    // handle delete action
    const handleDelete = async (taskId) => {
            
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete the task');
            }
            // Remove the task from the state
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    
            console.log('Task deleted successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    // handle edit action
    const handleEdit = (taskId) => {
         // Fetch the task by taskId (you can either get it from `tasks` state or fetch from backend)
         const taskToEdit = tasks.find(task => task.id === taskId);
        
         // Set the selected task to be edited
         setSelectedTask(taskToEdit);
         
         // Open the modal
         setIsModalOpen(true);
    }; 
    return (  
        <div className="slds-grid slds-wrap boxPad">
            <div className='slds-col slds-medium-size slds-size_3-of-12'></div>
            <div className='slds-col slds-medium-size slds-size_6-of-12 border'>
                <div className='slds-grid boxPad sections'>
                <div className="slds-grid">
                     {/* Render the appropriate modal based on modalType */}
            {modalType === 'newTask' && <NewTaskModal isOpen={modalType === 'newTask'} onClose={closeModal} />}
            {modalType === 'editTask' && <EditTaskModal isOpen={modalType === 'editTask'} onClose={closeModal} task={selectedTask} />}
            {modalType === 'deleteTask' && <DeleteTaskModal isOpen={modalType === 'deleteTask'} onClose={closeModal} task={selectedTask} />}
                    {/* Task Icon start */}
                    <div className="slds-col slds-m-top_x-small">
                    <div className="slds-icon_container slds-icon-standard-task myIcon">
                    <svg className="slds-icon slds-icon_small" aria-hidden="true">
                        <use xlinkHref="/assets/icons/symbols.svg#task"></use>
                    </svg>
                    <span className="slds-assistive-text">Task Icon</span>
                    </div>
               
                </div>
                 {/* Task Icon end */}
                <div className="slds-col slds-m-left_x-small">
                    <span className="slds-text-heading_small">Tasks</span><br></br>
                    <span className="slds-text-body_small">All tasks</span>
                    <p style={{marginLeft:"-30px",fontSize: "smaller",color: "gray"}}>{totalRecords} records</p>
                </div>
                </div>
                <div className="slds-col_bump-left">
                    {/* New task Refresh buttons start*/}
                    <div> 
                        <button className="slds-button slds-button_neutral yellowButton" onClick={openNewTaskModal}>New Task</button>
                        <NewTaskModal isOpen={isModalOpen} onClose={handleCloseModal} />
                        <button className="slds-button slds-button_neutral yellowButton slds-m-left_none" onClick={() => setCurrentPage(currentPage)}>Refresh</button>
                    </div>
               {/* New task Refresh buttons end*/}
               {/* search button start */}
               <div className="slds-m-top_xx-small">
               <div className="slds-form-element">
                    <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon_right">
                    <svg className="slds-icon slds-input__icon slds-icon_large slds-input__icon_right" style={{height: "20px", width: "20px",marginTop:"-9px"}} aria-hidden="true">
                    <use xlinkHref="/assets/icons/symbols.svg#search"></use>
                    </svg>
                    <input type="search" id="text-input-id-46" 
                    placeholder="Search" 
                    className="slds-input whiteSpace" value={search}
                     onChange={handleSearch}/>
                    </div>
                </div>
               </div>
               {/* search button ends */}
                </div>
                </div>
                {/* <hr className="line"></hr> */}
                {/* 
                        Table to display Todo List 
                */}
                <div>
                <table className="slds-table slds-table_cell-buffer slds-table_bordered">
                 <thead>
                     <tr className="slds-text-body_regular">
                         <th scope="col"><input type="checkbox" /></th>
                         <th scope="col">Assigned To</th>
                         <th scope="col">Status</th>
                         <th scope="col">Due Date</th>
                         <th scope="col">Priority</th>
                         <th scope="col">Comments</th>
                         <th scope="col"></th>
                     </tr>
                 </thead>
                 <tbody>
                     {tasks.map(task => (
                        <tr key={task.id}>
                            <td><input type="checkbox" /></td>
                            <td>{task.assigned_to}</td>
                            <td>{task.status}</td>
                            <td>{formatDate(task.due_date)}</td>
                            <td>{task.priority}</td>
                            <td>{task.comments}</td>
                            <td>
                                {/* Down button for dropdown menu */}
                                <div className="slds-dropdown-trigger slds-dropdown-trigger_click">
                                    <button className="slds-button slds-button_icon slds-button_icon-inverse myDown" onClick={toggleDropdown}>
                                        <svg className="slds-button__icon slds-button__icon_inverse" aria-hidden="true">
                                            <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#down" />
                                        </svg>
                                    </button>
                                    {/* Dropdown menu */}
                                    {isDropdownOpen && (
                                        <div className="slds-dropdown slds-dropdown_left downMenu">
                                            <ul className="slds-dropdown__list" role="menu">
                                                <li className="slds-dropdown__item" role="presentation">
                                                    <button className="slds-dropdown__link" onClick={() => openEditTaskModal(task)}>Edit</button>
                                                    {/* Pass the selected task to modal */}
                                                    <EditTaskModal isOpen={isModalOpen} onClose={handleCloseModal} task={selectedTask} /> 
                                                </li>
                                                <li className="slds-dropdown__item" role="presentation">
                                                    <button className="slds-dropdown__link" onClick={() => openDeleteTaskModal(task)}>Delete</button>
                                                    {/* Render the DeleteTaskModal conditionally */}
                                                    {isModalOpen && (
                                                        <DeleteTaskModal
                                                        isOpen={isModalOpen}
                                                        onClose={handleCloseModal}
                                                        task={selectedTask}
                                                        handleDelete={() => handleDelete(selectedTask.id)} // Call delete with the selected task's ID
                                                        />
                                                    )}
                                                </li>
                                            </ul>
                                            
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
                </div>
                {/* Table ends */}
                <hr></hr>
                {/* pagination starts */}
                <div className="slds-grid slds-p-around_medium sections">
                    <input
                        className="slds-input"
                        type="number"
                        value={recordsPerPage}
                        onChange={(e) => setRecordsPerPage(e.target.value)}
                        placeholder="Items per page"
                    />
                    <div className='slds-col_bump-left'>
                        <button className="slds-button slds-button_neutral paginate" onClick={() => setCurrentPage(1)}>First</button>
                        <button className="slds-button slds-button_neutral paginate" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>&lt;Prev</button>
                        <span>{currentPage}</span>
                        <button className="slds-button slds-button_neutral paginate" onClick={() => setCurrentPage(prev => prev + 1)}>&gt;Next</button>
                        <button className="slds-button slds-button_neutral paginate" onClick={() => setCurrentPage(Math.ceil(totalRecords / recordsPerPage))}>Last</button>
                    </div>
                </div>
                {/* pagination ends */}
            </div>
            <div className='slds-col slds-medium-size slds-size_3-of-12'></div>
        </div>
       
           );
};

export default TaskList;
