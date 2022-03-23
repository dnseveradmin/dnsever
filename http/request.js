const {getHeader, _request} = require("./http-option.js");

const END_POINT = {
    GET_HOST_URL: "https://api.dnsever.com/record/getrecord.php",
    ADD_HOST_URL: "https://api.dnsever.com/record/add.php",
    UPDATE_HOST_URL: "https://api.dnsever.com/record/update.php",
    DELETE_HOST_URL: "https://api.dnsever.com/record/delete.php",
};

/**
 * @description 사용자에게 등록된 레코드 정보 조회
 * @param {string} CLIENT_ID
 * @param {string} CLIENT_SECRET
 * @param {string} zone  dnsever.com
 * @param {string} type  A, AAAA, CNAME, MX, TXT
 * @returns {Object} _request(option)
 */
const getDNSRecord = async (CLIENT_ID, CLIENT_SECRET, zone, type) => {
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
const addDNSRecord = async (CLIENT_ID, CLIENT_SECRET, host, value, type, rank, memo) => {
    const option = {
        method: "POST",
        url: END_POINT.ADD_HOST_URL,
        params: {
            name: host,
            value,
            type,
            rank,
            memo
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
const updateDNSRecord = async (CLIENT_ID, CLIENT_SECRET, id, value, type, rank, memo) => {
    const option = {
        method: "POST",
        url: END_POINT.UPDATE_HOST_URL,
        params: {
            id,
            value,
            type,
            rank,
            memo,
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
const deleteDNSRecord = async (CLIENT_ID, CLIENT_SECRET, id, type) => {
    const option = {
        method: "POST",
        url: END_POINT.DELETE_HOST_URL,
        params: {id, type},
        headers: getHeader(CLIENT_ID, CLIENT_SECRET),
    };
    return _request(option);
};

exports.getDNSRecord = getDNSRecord;
exports.addDNSRecord = addDNSRecord;
exports.updateDNSRecord = updateDNSRecord;
exports.deleteDNSRecord = deleteDNSRecord;
