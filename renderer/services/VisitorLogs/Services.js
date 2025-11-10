//TODO: storing visitor logs
export async function store(data) {
    try {
        const response = await fetch('http://localhost:3001/visitor-logs/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create visitor log');
        }

        return await response.json();
    } catch (error) {
        console.error('[visitor logs] Error :', error);
        throw error;
    }
}

//TODO: listing visitor logs
export async function list() {
    try {
        const response = await fetch('http://localhost:3001/visitor-logs/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch visitor logs');
        }

        return await response.json();
    } catch (error) {
        console.error('[visitor logs] Error :', error);
        throw error;
    }
}

export async function updateStatus(id, data) { 
    try {
        const response = await fetch(`http://localhost:3001/visitor-logs/update-status/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update visitor log status');
        }

        return await response.json();
    } catch (error) {
        console.error('[visitor logs] Error :', error);
        throw error;
    }
}

export async function latest() {
    try {
        const response = await fetch('http://localhost:3001/visitor-logs/latest', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch latest visitor logs');
        }

        return await response.json();
    } catch (error) {
        console.error('[visitor logs] Error :', error);
        throw error;
    }
}

export async function updateRemarks(id, data) { 
    try {
        const response = await fetch(`http://localhost:3001/visitor-logs/update-remarks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update visitor log remarks');
        }

        return await response.json();
    } catch (error) {
        console.error('[visitor logs] Error :', error);
        throw error;
    }
}