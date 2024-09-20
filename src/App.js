import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleContactSync() {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            // Get access token from response
            const { access_token } = tokenResponse;
            console.log('Access Token:', access_token);

            // Send token to OAS for further processing
            await axios.post('http://localhost:8001/google-contacts-sync', { access_token });
        },
        redirect_uri: 'http://localhost:3002/oauth2callback', // Change this as needed
        scope: 'https://www.googleapis.com/auth/contacts.readonly',

    });

    return (
        <div>
            <h1>Google Contact Sync</h1>
            <button onClick={() => login()}>Sync Contacts</button>
        </div>
    );
}

export default GoogleContactSync;
