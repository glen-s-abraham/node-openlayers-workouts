
class ApiService{
    async postData(url,data){
        const res= await fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })      
        const feature = await res.json();
        return feature;
    }

    async getData(url){
        const res =  await fetch(url);
        const data = await res.json();
        return data;
    }
}

export default ApiService;