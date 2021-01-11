const getMovies = async (url, data) => {
    console.log('getmovies works')
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: data})
    });
    try {
        return await response.json();
    } catch(error) {
        console.log('Network Error:', error);
    };
};

export {
    getMovies
}