/** TODO: 출력 옵션을 여러개로 두어 테이블 출력 외에 excel export 기능도 있으면 좋을 것으로 보임. */
const {table} = require("table");

/**
 * @author Kyungseo.Park
 * @description 계정 정보에 대한 초기 설정
 * @param {Array} element API response 의 Array 가 넘어옴
 */
const printTable = (element) => {
    const elements = [];
    if (!element) {
        console.log("Empty Data");
        process.exit(1);
    }
    elements.push(Object.keys(element[0].attributes));
    for (const [_, value] of Object.entries(element)) {
        elements.push(Object.values(value.attributes));
    }

    const config = {
        singleLine: true,
    };

    console.log(table(elements, config));
};

exports.printTable = printTable;
