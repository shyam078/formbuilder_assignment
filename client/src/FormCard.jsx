import React from 'react';

const FormCard = ({ form, onView, onEdit, onDelete }) => {
    return (
        <div style={styles.card}>
            <h3>{form.FormTitle}</h3>
            <div style={styles.buttons}>
                <button className='' onClick={() => onView(form)}>View</button>
                <button onClick={() => onEdit(form)}>Edit</button>
                <button onClick={() => onDelete(form._id)}>Delete</button>
            </div>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
        marginBottom: '15px',
        textAlign: 'center',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
    },
};

export default FormCard;
