import React, { useEffect, useState } from 'react';

function GoogleAuthButton() {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Optionally fetch contacts on mount
        fetchContacts();
    }, []);

    const handleLogin = () => {
        const clientId = 'google-client-id'; // Google OAuth 2.0 client ID
        const redirectUri = 'http://localhost:8001/google-oauth-callback/'; // OAS redirect endpoint
        const scope = 'https://www.googleapis.com/auth/contacts.readonly';
        const responseType = 'code';  // Request authorization code
        const accessType = 'offline'; // Request refresh token

        // Redirect to Google's OAuth 2.0 authorization server
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}`;
    };

    const fetchContacts = () => {
        fetch('http://localhost:8001/google-contacts/')
            .then(response => response.json())
            .then(data => {
                if (data.contacts) {
                    // Set contacts if available
                    setContacts(data.contacts);
                } else {
                    setError('Please sync contacts');
                    console.error('Error: Contacts not available');
                }
            })
            .catch(error => {
                setError('Error fetching contacts');
                console.error('Error fetching contacts:', error);
            });
    };

    return (
        <div>
            <h1>Google Contact Sync</h1>
            {contacts.length > 0 ? (
                <div>
                    <h2>Contacts:</h2>
                    <ul>
                        {contacts.map((contact, index) => (
                            <li key={index}>
                                <strong>{contact.name}</strong>: {contact.emails.join(', ')}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    {error ? (
                        <p>{error}</p>
                    ) : (
                        <p>No contacts available. Please sync your Google Contacts.</p>
                    )}
                    <button onClick={handleLogin}>Sync Google Contacts</button>
                </div>
            )}
        </div>
    );
}

export default GoogleAuthButton;
