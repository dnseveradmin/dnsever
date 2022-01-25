import { getHeader, _transformXML, _request } from "./http-option.js";

const END_POINT = {
  GET_HOST_URL: "http://172.20.0.5:5000/record/getrecord.php",
  ADD_HOST_URL: "http://172.20.0.5:5000/record/addtxt.php",
  UPDATE_HOST_URL: "http://172.20.0.5:5000/record/updatetxt.php",
  DELETE_HOST_URL: "http://172.20.0.5:5000/record/deletetxt.php",
};

/**
 * @description 사용자에게 등록된 레코드 정보 조회
 * @param {string} CLIENT_ID
 * @param {string} CLIENT_SECRET
 * @param {string} zone  dnsever.com
 * @param {string} type  A, AAAA, CNAME, MX, TXT
 * @returns {Object} _request(option)
 */
export const getDNSRecord = async (CLIENT_ID, CLIENT_SECRET, zone, type) => {
  const option = {
    method: "POST",
    url: END_POINT.GET_HOST_URL,
    params: {
      zone,
      type,
    },
    headers: getHeader(CLIENT_ID, CLIENT_SECRET),
  };
  return _request(option);
};

/**
 * @description DNS 레코드후 결과값을 받아옴.
 * @param {string} CLIENT_ID
 * @param {string} CLIENT_SECRET
 * @param {string} host add.dnsever.com
 * @param {string} value
 * @param {string} type A, AAAA, CNAME, MX, TXT
 * @returns {Object | {}} _request(option)
 */
export const addDNSRecord = async (
  CLIENT_ID,
  CLIENT_SECRET,
  host,
  value,
  type
) => {
  const option = {
    method: "POST",
    url: END_POINT.ADD_HOST_URL,
    params: {
      host,
      value,
      type,
    },
    headers: getHeader(CLIENT_ID, CLIENT_SECRET),
  };
  return _request(option);
};

/**
 * @description DNS 레코드후 결과값을 받아옴.
 * @param {string} CLIENT_ID
 * @param {string} CLIENT_SECRET
 * @param {string} id 46800296
 * @param {string} value v=spf1 include:_spf.dnsever.com ~all, 127.0.0.1
 * @param {string} type A, AAAA, CNAME, MX, TXT
 * @returns {object} result_data
 */
export const updateDNSRecord = async (
  CLIENT_ID,
  CLIENT_SECRET,
  id,
  value,
  type
) => {
  const option = {
    method: "POST",
    url: END_POINT.UPDATE_HOST_URL,
    params: {
      id,
      value,
      type,
    },
    headers: getHeader(CLIENT_ID, CLIENT_SECRET),
  };
  return _request(option);
};

/**
 * @description DNS 레코드 삭제 후 결과를 리턴
 * @param {string} CLIENT_ID
 * @param {string} CLIENT_SECRET
 * @param {string} id 46800296
 * @returns {Object | {}} result_data
 */
export const deleteDNSRecord = async (CLIENT_ID, CLIENT_SECRET, id) => {
  const option = {
    method: "POST",
    url: END_POINT.DELETE_HOST_URL,
    params: { id },
    headers: getHeader(CLIENT_ID, CLIENT_SECRET),
  };
  return _request(option);
};
