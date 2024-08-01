import React, { createContext, useState, useEffect } from "react";
import { getToken, getEmplyeeId } from './authApi';
import axios from "axios";

export const AuthContext = createContext();
// This context provider is passed to any component requiring the context
export const AuthProvider = ({ children }) => {
  const [brokerId, setBrokerId] = useState(localStorage.getItem('brokerId'));
  const [authToken, setAuthToken] = useState(localStorage.getItem('luxuri_token'));
  const [employeeId, setEmployeeId] = useState(localStorage.getItem('employeeId'));

  const authenticate = () => {
    // localStorage.removeItem('luxuri_token')
    // getToken().then(resp => {
    //   console.log(resp, 'resp')
    //   localStorage.setItem('luxuri_token', resp.data.access_token);
    //   localStorage.setItem('brokerId', resp.data.brokerID);
    //   localStorage.setItem('expired', resp.data['.expires']);
    //   setBrokerId(resp.data.brokerID);
    //   setAuthToken(resp.data.access_token);
    // })

    let data = new URLSearchParams();
    data.append('username', "guestUserLU17a@woodendoorpm.com");
    data.append('password', "Agent123@luxuri");
    data.append('grant_type', "password");
    const { REACT_APP_API_URL } = process.env;

    axios.post(`${REACT_APP_API_URL}/oauth/token`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((resp) => {
      localStorage.setItem('luxuri_token', resp.data.access_token);
      localStorage.setItem('brokerId', resp.data.brokerID);
      localStorage.setItem('expired', resp.data['.expires']);
      setBrokerId(resp.data.brokerID);
      setAuthToken(resp.data.access_token);
    }).catch((err) => {
      console.log(err, 'token api');
    })
  }

  useEffect(() => {
    authenticate()
  }, []);

  useEffect(() => {
    if (brokerId != null && employeeId === null) {
      getEmplyeeId(brokerId)
        .then(empResp => {
          setEmployeeId(empResp.data.Data);
          localStorage.setItem('employeeId', empResp.data.Data);
        })
    }
  }, [brokerId, employeeId]);

  return (
    <AuthContext.Provider
      value={{
        brokerId,
        authToken,
        employeeId,
        setBrokerId,
        setAuthToken,
        setEmployeeId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
