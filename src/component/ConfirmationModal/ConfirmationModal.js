import React from 'react';

const ConfirmationModal = ({action, actionDataId, title, setIsConfirmModalOpen, isConfirmModalOpen}) => {

    const handleCancel = () => {
        setIsConfirmModalOpen(false);
    };

    return (
        <div>
            <input type="checkbox"  id="confirmation-modal" className="modal-toggle" checked={isConfirmModalOpen}
            onChange={() => setIsConfirmModalOpen(!isConfirmModalOpen)} />
            <div className="modal w-auto max-w-none">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>

                    <div className="modal-action">

                        <label onClick={() => action(actionDataId)}   htmlFor="confirmation-modal" className="btn">Yes</label>
                        <button onClick={handleCancel}  className="btn">Cancel</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;