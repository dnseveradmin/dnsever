const dom = require("xmldom");
const axios = require("axios");
const convert = require("xml-js");
const {handleError} = require("../utils/handles.js");
const {VERSION} = require("../utils/config.js");

/**
 * @author Kyungseo.Park
 * @description HTTP요청 시 Basic Auth에 포함되어야 하는 Header를 생성
 * @param {string}} id
 * @param {string}} auth_code
 * @returns {Headers} header
 */
const getHeader = (id, auth_code) => {
    const auth = new Buffer.from(id + ":" + auth_code).toString("base64");
    const header = {
        Authorization: "Basic " + auth,
        "User-Agent": `DNSEver-Client/${VERSION}`,
    };
    return header;
};

/**
 * @author Kyungseo.Park
 * @description XML을 파싱할 수 있게 해주는 역할을 함.
 * @param {XMLDocument}} body
 * @returns {object} body
 */
const _transformXML = (body) => {
    const DOMparsers = dom.DOMParser;

    return new DOMparsers().parseFromString(body);
};

/**
 * @author Kyungseo.Park
 * @description API 요청 후 결과 리턴
 * @param {string}} url
 * @param {object}} option
 * @returns {object} xmlToJson[0].elements
 */
const _request = async (option) => {
    const {data} = await axios(option);
    const xmlToJson = JSON.parse(convert.xml2json(data)).elements[0].elements;

    if (xmlToJson) {
        handleError(xmlToJson[0].attributes.code, xmlToJson[0].attributes.msg);
    }
    return xmlToJson[0].elements;
};

exports.getHeader = getHeader;
exports._transformXML = _transformXML;
exports._request = _request;
