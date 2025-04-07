import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import Modal from 'react-modal';
import { NavBar } from '../components/NavBar';

import { getRequests, getBuyerIDimg, make_seller_api, dismiss_request_api } from '../apis/make_seller_apis';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const Admin = () => {
    let { token, role } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [idImg, setIdImg] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getRequests(token)
            .then((data) => {
                if (!data) return toast.error("Unable to load requests!");
                setRequests(data);
            })
            .catch((error) => {
                console.error('Error fetching requests:', error);
            });
    }, []);

    const handleViewID = (user_id) => {
        getBuyerIDimg(token, user_id)
        .then((img) => {
            if (!img) {
                setIdImg("https://marketplace.control-webpanel.com/assets/corals/images/default_product_image.png");
                setShowModal(true);
                return;
            }
            const url = URL.createObjectURL(img);
            setIdImg(url);
            setShowModal(true);
        })
    }

    const handleApprove = (user_id) => {
        make_seller_api(token, user_id).then((resp) => {
            if (resp.ok) toast.success("Approval Sent!");
            else toast.error("Failed to accept request!");
        });
        dismiss_request_api(token, user_id);
        window.location.reload();
    };

    const handleReject = (user_id) => {
        dismiss_request_api(token, user_id).then((resp) => {
            if (resp.ok) toast.success("Rejection Sent!");
            else toast.error("Failed to reject request!");
        });
        window.location.reload();
    };

    return (
        <>
            {!!token && (role === "admin") && (
                <div className="admin-page">
                    <NavBar />
                    <h1 className="admin-heading">Admin Page</h1>
                    <p style={{textAlign:"center"}}>Incoming Seller Promotion Requests ...</p><br/>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>BuyerID</th>
                                <th>Username</th>
                                <th>Identification Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((buyer) => (
                                <tr key={buyer.user_id} className="admin-row">
                                    <td className="admin-info-cell">
                                        <div className="admin-username">{buyer.user_id}</div>
                                    </td>
                                    <td className="admin-info-cell">
                                        <div className="admin-username">{buyer.username}</div>
                                    </td>
                                    <td className="admin-info-cell">
                                        <button onClick={() => handleViewID(buyer.user_id)}>View Image</button>
                                        <Modal
                                          isOpen={showModal}
                                          onRequestClose={() => setShowModal(false)}
                                          style={customStyles}
                                        >
                                          <img src={idImg} alt="Identification" />
                                        </Modal>
                                    </td>
                                    <td className="admin-action-cell">
                                        <button onClick={() => handleApprove(buyer.user_id)} className="admin-action-button approve">Accept</button>
                                        <button onClick={() => handleReject(buyer.user_id)} className="admin-action-button reject">Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default Admin;
