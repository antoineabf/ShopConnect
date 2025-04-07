import { SERVER_URL_USER, SERVER_URL_AUTH } from "../config";

const fetchTermsAndPolicies = (setTerms) => {
    fetch(`${SERVER_URL_USER}/seller_terms`)
    .then((response) => response.json())
    .then((data) => {
        setTerms(data.terms);
    })
    .catch((error) => console.error("Error fetching terms and policies:", error));
};

const uploadIdentification = (file, token) => {
    const formData = new FormData();
    formData.append("id_pic", file);
    return fetch(`${SERVER_URL_USER}/uploadID`, {
        method:'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    })
    .catch((error) => console.error("Error uploaded identification image:", error));
};

const agreeSellerTerms = (token) => {
    return fetch(`${SERVER_URL_USER}/seller_terms`, {
        method:'POST',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .catch((error) => console.error("Error confirming request:", error));
}

const requestMakeSeller = (token) => {
    return fetch(`${SERVER_URL_USER}/request-make-seller`, {
        method:'POST',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .catch((error) => console.error("Error sending request:", error));
}

const getRequests = (token) => {
    return fetch(`${SERVER_URL_USER}/get_seller_requests`, {
        method:"GET",
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((resp) => {
        if (!resp.ok) return null;
        return resp.json();
    });
};

const getBuyerIDimg = (token, buyer_id) => {
    return fetch(`${SERVER_URL_USER}/get_identification/${buyer_id}`, {
        method:"GET",
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((resp) => {
        if (!resp.ok) return null;
        return resp.blob();
    });
}

const make_seller_api = (token, buyer_id) => {
    return fetch(`${SERVER_URL_AUTH}/make-seller/${buyer_id}`, {
        method:"POST",
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}

const dismiss_request_api = (token, buyer_id) => {
    return fetch(`${SERVER_URL_USER}/dismiss-request/${buyer_id}`, {
        method:"POST",
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}

export {fetchTermsAndPolicies, uploadIdentification, agreeSellerTerms, requestMakeSeller, getRequests, getBuyerIDimg, make_seller_api, dismiss_request_api};