import axios from "axios";

let url = "https://burger-queenn.herokuapp.com/auth"; //endpoint
let urlOrder = 'https://burger-queenn.herokuapp.com/orders/'

const body = {
    email: "admin@localhost",
    password: "changeme",
};



/* Login Authentication */
export const loginAuth = async (body) => {
    try {
        const apiResponse = await axios.post(url, body);
        const tokenData = apiResponse.data.token;
        localStorage.setItem("token", tokenData);
        return tokenData;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message)
        }
    }
};



//get data of user with email.
export const getUserEmail = async (email) => {
    //console.log(token);
    const token = localStorage.getItem("token");
    const concatPath = `https://burger-queenn.herokuapp.com/users/${email}`;
    const response = await axios.get(concatPath, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    return response.data;
};




//get data of users

export const getUser = async (path) => {
    const apiResponse = await axios.post(url, body);
    const tokenN = apiResponse.data.token;
    return await axios
        .get(path, { headers: { Authorization: `Bearer ${tokenN}` } })
        .then((data) => {
            //console.log(data);
            return data;
        })
        .catch((err) => console.log(err));
};


// get data of products and orders 

export const getDataApi = async (urlPO) => {
    const token = localStorage.getItem("token");

    return await axios.get(`${urlPO}?limit=0`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
}



//add new user or product or orders 

export const petitionPostAdd = async (urlUP, data) => {
    const token = localStorage.getItem("token");

    return axios({
        url: urlUP,
        method: "POST",
        data: data,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    })


}

//delete user or product 

export const petitionDelete = async (urlUser, id) => {
    const token = localStorage.getItem("token");

    return axios({
        url: urlUser + id,
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    })
}



//edit user or product 
export const petitionPutEdit = async (urlUP, idUP, newData) => {
    const token = localStorage.getItem("token");

    return axios({
        url: urlUP + idUP,
        method: "PUT",
        data: newData,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    })
}

/* mostrar todas las ordenes de la Api*/

export const getAllOrders = async () => {
    //const token = localStorage.getItem("token");
    try {
        const token = localStorage.getItem("token");
        const apiCallTogetOrders = await axios.get(`${urlOrder}?limit=0`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        console.log(apiCallTogetOrders);
        return apiCallTogetOrders
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.message)
        }
    }
}

