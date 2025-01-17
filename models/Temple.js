import mariadb from './MariaDB'

// 지금은 like 검색이지만, 프로그램 관련 테이블을 다시 만들때는 꼭! 사찰이름을 넣어야 한다.
let templeSql ={
    selectTemple :`select * from TEMPLE2 where T_NAME = ?`,
    selectTemplePic : `select * from TEMPLEPIC2 where T_NAME = ?`,
    selectTempleProPic : `select * from PROGRAMPIC2 where T_NAME = ?`
}

async function selectTemple(id) {  // 템플 정보 출력
    let conn = null;
    let params = [id];
    let templeData = ''; // 결과 저장용
    let templePicData = '';
    let templeProPicData = '';

    try {
        conn = await mariadb.makeConn();

        templeData = await conn.query(templeSql.selectTemple, params);
        templePicData = await conn.query(templeSql.selectTemplePic, params);
        templeProPicData = await conn.query(templeSql.selectTempleProPic,params)


    } catch (e) {
        console.log(e);
    } finally {
        await mariadb.closeConn(conn)
    }
    return {temple:templeData,templePic:templePicData, templeProPic :templeProPicData}
}

export default selectTemple;