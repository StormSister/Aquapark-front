import React, { useState } from 'react';
import axios from 'axios';
import QrReader from 'react-qr-scanner';

const CheckTickets = () => {
    const [message, setMessage] = useState('');
    const [scannerEnabled, setScannerEnabled] = useState(false);

    const handleScan = async (data) => {
        if (data) {
            console.log('Detected QR code data:', data);
            console.log('Data text:', data.text);

            try {
                // Wyłącz skaner od razu po odczytaniu kodu QR
                setScannerEnabled(false);

                const response = await axios.post('http://localhost:8080/api/tickets/check-qr', { qrCode: data.text });
                console.log('Response from server:', response);
                setMessage(response.data);
            } catch (error) {
                console.error('Failed to send QR code to server:', error);
                setMessage('Failed to scan QR code. Please try again.');
            }
        }
    };

    const handleError = (error) => {
        console.error('Error scanning QR code:', error);
        setMessage('Failed to scan QR code. Please try again.');
        // Zawsze wyłącz skaner po błędzie
        setScannerEnabled(false);
    };

    const startScanner = () => {
        setScannerEnabled(true);
    };

    const stopScanner = () => {
        setScannerEnabled(false);
    };

    return (
        <div>
            <h2>Check Tickets</h2>
            {!scannerEnabled && <button onClick={startScanner}>Start Scan</button>}
            {scannerEnabled && <button onClick={stopScanner}>Stop Scan</button>}
            {scannerEnabled && (
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                />
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default CheckTickets;




