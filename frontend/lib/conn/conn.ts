export async function query(url = '', access: string | null = null, method = 'GET', body: Record<string, string | number | null> = {}) {
    try{
        const headers:Record<string, string> = {};;
        const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
        // Solo agrega la cabecera de autorización si el access token está presente
        if (access) {
            headers['Authorization'] = `Bearer ${access}`;
        }
    
        if (method !== 'GET') {
            headers['Content-Type'] = 'application/json';
        }
        const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/${url}`, {
            headers: headers,
            method: method,
            body: method != "GET" ? JSON.stringify(body) : null
        })
    
        if (res.status === 401){
            window.location.href = '/auth/login';
        }
    
        return await res.json()
    }catch (error) {
    console.error("Fetch error:", error);
    return null; // O cualquier valor por defecto
  }
}