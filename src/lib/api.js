import axios from "axios";
import { dataHeader } from "./helper";

// START OF USER API
export const register = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/register`, data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
};
export const login = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/login`, data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
};
export const getUsers = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/users`, 
        {
          params: data,
          ...dataHeader()
        })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// END OF USER API
// START OF USER API
export const createAttendance = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/attendance`, data, dataHeader())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const getAttendance = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/attendances/${data.attendanceId}`, dataHeader())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const getAllAttendance = (data) => {
  return new Promise((resolve, reject) => {
    axios
    .get(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/attendances`, 
    {
      params: data,
      ...dataHeader()
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const deleteAttendance = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/attendances/${data.attendanceId}`, 
        {
          data,
          ...dataHeader()
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// END OF ATTENDANCE API


// START OF USER API
export const createClockInRecord = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/record/clock-in`, data, dataHeader())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const getAttendanceRecord = (attendanceId,data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/records/${attendanceId}`,
      {
        params: data,
        ...dataHeader()
      }) 
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getRecords = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/records-date`,
      {
        params: data,
        ...dataHeader()
      }) 
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// END OF ATTENDANCE API