import React, { useState } from 'react';
import axios from 'axios';

const PromotionForm = ({ onClose }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [discountType, setDiscountType] = useState('');
    const [discountAmount, setDiscountAmount] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure both dates are valid
        if (!startDate || !endDate) {
            alert('Please provide both start and end dates.');
            return;
        }

        const formData = new FormData();
        formData.append('startDate', new Date(startDate).toISOString());
        formData.append('endDate', new Date(endDate).toISOString());
        formData.append('discountType', discountType);
        formData.append('discountAmount', discountAmount);
        formData.append('description', description);

        if (image) {
            formData.append('image', image);
        }

        console.log("Form Data to be sent:");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            await axios.post('http://localhost:8080/api/promotions/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Promocja została dodana!');
            onClose(); // Zamknięcie formularza po dodaniu promocji
        } catch (error) {
            console.error('Błąd podczas dodawania promocji:', error);
            alert('Wystąpił błąd podczas dodawania promocji!');
        }
    };

    return (
        <div className="promotion-form">
            <h2>Dodaj nową promocję</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Data rozpoczęcia:</label>
                    <input 
                        type="date" 
                        value={startDate} 
                        onChange={e => setStartDate(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Data zakończenia:</label>
                    <input 
                        type="date" 
                        value={endDate} 
                        onChange={e => setEndDate(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Rodzaj zniżki:</label>
                    <input 
                        type="text" 
                        value={discountType} 
                        onChange={e => setDiscountType(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Wysokość zniżki (%):</label>
                    <input 
                        type="number" 
                        value={discountAmount} 
                        onChange={e => setDiscountAmount(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Opis promocji:</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={4}
                    />
                </div>
                <div className="form-group">
                    <label>Załaduj zdjęcie:</label>
                    <input type="file" onChange={e => setImage(e.target.files[0])} />
                </div>
                <div className="form-actions">
                    <button type="submit">Dodaj promocję</button>
                    <button type="button" onClick={onClose}>Anuluj</button>
                </div>
            </form>
        </div>
    );
};

export default PromotionForm;


