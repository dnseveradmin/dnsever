/**
 * @description 상태코드를 확인하여 문제 있을 시 프로세스를 종료함
 * @param {string} cord
 * @returns {void}
 */
export const handleError = (cord) => {
  // Error
  switch (cord) {
    case "103":
      console.log("ID 또는 PW가 잘못 됬습니다.");
      process.exit(1);
  }

  // Error
  switch (cord) {
    case "211":
      console.log("추가 실패 ( DB 오류 )");
      process.exit(1);
    case "307":
      console.log("호스트 네임이 비어있음");
      process.exit(1);
    case "339":
      console.log("레코드의 value 값이 비어있음");
      process.exit(1);
    case "302":
      console.log("도메인 형식 오류");
      process.exit(1);
    case "340":
      console.log("도메인 소유자가 요청자와 다름");
      process.exit(1);
    case "341":
      console.log("요청 호스트가 CNAME 으로 등록되어 있음");
      process.exit(1);
    case "342":
      console.log(
        "요청 호스트가 NS 로 등록되어 있음 (아마 DNSEver 도메인만 영향이 갈 것으로 보임)"
      );
      process.exit(1);
  }

  // Error
  switch (cord) {
    case "310":
      console.log("id (seq) 값이 없음");
      process.exit(1);
    case "339":
      console.log("value(text value) 값이 없음");
      process.exit(1);
    case "343":
      console.log("도메인 소유자가 요청자와 다름");
      process.exit(1);
    case "210":
      console.log("업데이트 실패");
      process.exit(1);
  }
};
