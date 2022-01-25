/**
 * @author Kyungseo.Park
 * @description TXT 레코드 정규식
 * @param {string} value
 * @returns {boolean | Function} true | process.exit(1)
 */
export const txtValidated = (value, type) => {
  // Value 또는 Type 업음
  if (!value || !type) {
    process.exit(1);
  }
  const txtRex = /^[\w !"#$%&'()*+,\/:;<=>?@[\]^`{|}~.\\-]+$/;
  const ipv6Rex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  const ipv4Rex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const hostRex = /^[a-zA-Z][a-zA-Z0-9]{4,19}$/;

  switch (type) {
    case "TXT":
      if (!txtRex.test(value)) {
        console.log("TXT 레코드에 대한 정규식 조건에 부합하지 않습니다.");
        process.exit(1);
      }
      break;
    case "AAAA":
      if (!ipv6Rex.test(value)) {
        console.log("AAAA 레코드에 대한 정규식 조건에 부합하지 않습니다.");
        process.exit(1);
      }
      break;
    case "A":
      if (!ipv4Rex.test(value)) {
        console.log("A 레코드에 대한 정규식 조건에 부합하지 않습니다.");
        process.exit(1);
      }
      break;
    case "CNAME":
      if (!hostRex.test(value)) {
        console.log("CNAME 레코드에 대한 정규식 조건에 부합하지 않습니다.");
        process.exit(1);
      }
      break;
    default:
  }
  return true;
};

/**
 * @author Kyungseo.Park
 * @description 도메인에 대한 정규식
 * @param {string} value 도메인 정보
 * @returns {boolean | Function} true | process.exit(1)
 */
export const domainValidated = (value) => {
  if (!value) {
    return true;
  }
  const domainRex =
    /^([@_가-힣0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
  // 정규식 검사
  if (!domainRex.test(value)) {
    if (value !== "ALL") {
      console.log(
        "도메인정보가 정규식에 부합하지 않습니다. 다시 확인해주세요."
      );
      process.exit(1);
    }
  }

  return true;
};

/**
 * @author Kyungseo.Park
 * @description DNS Record 타입에 대한 정규식 (기본값은 TXT)
 * @param {string} value "A", "AAAA", "CNAME", "MX", "TXT"
 * @returns {boolean | Function} true | process.exit(1)
 */
export const dnsTypeValidated = (value) => {
  if (!value) {
    console.log("value is not found");
    return true;
  }
  const recordTypeRex = ["A", "AAAA", "CNAME", "MX", "TXT", "ALL"];
  if (recordTypeRex.indexOf(value) == -1) {
    console.log(
      "DNSRecord 타입이 정규식에 부합하지 않습니다. 다시 확인해주세요."
    );
    process.exit(1);
  }

  return true;
};

/**
 * @author Kyungseo.Park
 * @description DNSEver SEQ에 대한 정규식 (필수)
 * @param {number} value
 * @returns {boolean | Function} true | process.exit(1)
 */
export const seqValidated = (value) => {
  const seqRex = /^[0-9]*$/;
  if (!seqRex.test(value)) {
    console.log("SEQ는 숫자로 구성되어 있습니다. 다시 확인해주세요.");
    process.exit(1);
  }

  return true;
};
