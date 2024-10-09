import React, {useEffect, useState } from 'react';

function FindByStore() {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        const fetchStores = async() =>{
            const response = await fetch('http://localhost:3000/stores');
            const data = await response.json();
            setStores(data);

        };

        fetchStores();
    }, []);


    return(
        <div>
            <h1>Find Products by Store</h1>
            <ul>
                {stores.map((store) => (<lil key={store._id}>   
                    {store.name} - {store.address}
                </lil>
            ))}
            </ul>
        </div>
    );
}

export default FindByStore;