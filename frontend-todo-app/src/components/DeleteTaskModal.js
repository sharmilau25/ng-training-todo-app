import React, { useEffect, useState } from 'react';


const DeleteTaskModal = ({ isOpen, onClose }) => {

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
                    <div className="slds-modal__header deleteHeader">
                        <h2 className="slds-text-heading_medium ">Delete Task</h2>
                    </div>

                    {/* Modal Body */}
                    <div className="slds-modal__content slds-p-around_large">
                      <p>Do you want to delete task?</p>
                    </div>

                    {/* Modal Footer */}
                    <div className="slds-modal__footer">
                        <button className="slds-button slds-button_neutral" >No</button>
                        <button className="slds-button slds-button_brand" >Yes</button>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && <div className="slds-backdrop slds-backdrop_open"></div>}
        </>
    );
};
export default DeleteTaskModal;
