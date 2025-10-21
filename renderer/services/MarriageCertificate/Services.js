export async function insertMarriageCertificate(formData) {
    try {
        const response = await fetch('http://localhost:3001/marriage/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            throw new Error('Failed to insert marriage certificate data');
        }

        return await response.json();
    } catch (error) {
        console.error('[marriage form] Error inserting marriage certificate data:', error);
        throw error;
    }
};


export async function listMarriageCertificate() {
    try {
        const response = await fetch('http://localhost:3001/marriage/list', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include' // include cookies/session if needed
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || `HTTP error: ${response.status}`);
        }

        return data; // { success, message, data }
    } catch (error) {
        console.error('[marriage form] Error fetching marriage certificates:', error);
        throw error;
    }
}

/**
 * View marriage certificate data
 * @param {string|number} id - The ID of the marriage certificate
 */
export async function viewMarriageCertificate(id) {
    try {
        const response = await fetch(`http://localhost:3001/marriage/view/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || `HTTP error: ${response.status}`);
        }

        return data; // { success, message, data }
    } catch (error) {
        console.error('[death form] Error viewing death certificate:', error);
        throw error;
    }
}

export async function upload(formData) {
    try {
        const response = await fetch('http://localhost:3001/birth/upload-and-scan', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to upload files');
        }
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (error) {
        console.error(error);
        throw new Error(JSON.stringify({
            'error': error
        }))
    }
}