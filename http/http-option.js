import dom from "xmldom";
import axios from "axios";
import convert from "xml-js";
import { handleError } from "../utils/handles.js";
import { VERSION } from "../utils/config.js";

/**
 * @author Kyungseo.Park
 * @description HTTP요청 시 Basic Auth에 포함되어야 하는 Header를 생성
 * @param {string}} id
 * @param {string}} auth_code
 * @returns {Headers} header
 */
export const getHeader = (id, auth_code) => {
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
export const _transformXML = (body) => {
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
export const _request = async (option) => {
  const res = await axios(option).then(({ data }) => {
    return data;
  });
  const xmlToJson = JSON.parse(convert.xml2json(res)).elements[0].elements;
  handleError(xmlToJson[0].attributes.code);
  return xmlToJson[0].elements;
};
