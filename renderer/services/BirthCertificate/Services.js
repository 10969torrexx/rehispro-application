/**
 * TODO: insert birth certificate data
 * @params {Object} formData - The form data to insert
 */
export async function insertBirthCertificate (formData) {
    console.log("📤 Sending formData:", formData);
    try {
        const response = await fetch('http://localhost:3001/birth/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            throw new Error('Failed to insert birth certificate data');
        }

        return await response.json();
    } catch (error) {
        console.error('[birth form] Error inserting birth certificate data:', error);
        throw error;
    }
};


export async function listBirthCertificate() {
    try {
        const response = await fetch('http://localhost:3001/birth/list', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || `HTTP error: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('[birth form] Error fetching birth certificates:', error);
        throw error;
    }
}

/**
 * TODO: this will handle the uploading process of the files
 * @params {FormData} formData - The form data containing files to upload
 */
export async function uploadFiles(formData) {
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

/**
 * View birth certificate data
 * @param {string|number} id - The ID of the birth certificate
 */
export async function viewBirthCertificate(id) {
    try {
        const response = await fetch(`http://localhost:3001/birth/view/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include' 
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || `HTTP error: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('[birth form] Error fetching birth certificate:', error);
        throw error;
    }
}

export async function download(id) {
    try {
        const response = await fetch(`http://localhost:3001/birth/extract-pdf/${id}`, {
            method: 'GET',
            headers: {
               'Accept': 'application/pdf' 
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to download file: ${response.status}`);
        }

        const data = await response.blob();
        const url = window.URL.createObjectURL(data); 
        const link = document.createElement('a');
        link.href = url;
        const filename = `birth_certificate_${id}.pdf`;
        link.download = filename.split('/').pop();
        document.body.appendChild(link);
        link.click();
        link.remove();      
        window.URL.revokeObjectURL(url); 
    } catch(error) {
        console.error(error);
        throw error;
    }
}

export async function latest() {
    try {
        const response = await fetch('http://localhost:3001/birth/latest', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || `HTTP error: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('[birth form] Error fetching latest birth certificates:', error);
        throw error;
    }
}

export async function search(queryParams) {
    try {
        const response = await fetch(`http://localhost:3001/birth/search`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(queryParams)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || `HTTP error: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('[birth form] Error searching birth certificates:', error);
        throw error;
    }
}

export async function createFile(formData) {
    try {
        const response = await fetch('http://localhost:3001/birth/create-file', { 
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Failed to upload files');
        }
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (error) {
        console.error('[birth form] Error searching birth certificates:', error);
        throw error;
    }
}