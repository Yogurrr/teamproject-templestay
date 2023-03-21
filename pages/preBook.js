import axios from "axios";
import {Button, Table} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export async function getServerSideProps(ctx) {

    let {userid} = ctx.query

    let param = `?userid=${userid}`
    let url = `http://localhost:3000/api/preBookCheck${param}`

    const res = await axios.get(url)
    let preBookInfo = res.data[0][0]

    return {props:{preBookInfo}}
}



export default function preBook ({preBookInfo}) {

    const handleBook = async () => {

        // Book테이블에 데이터를 삽입하는 과정
        preBookInfo.TOTAL = preBookInfo.ADULT[0]*preBookInfo.ADULT[1] + preBookInfo.MIDDLE[0]*preBookInfo.MIDDLE[1] + preBookInfo.YOUNG[0]*preBookInfo.YOUNG[1] + preBookInfo.PRESCHOOL[0]*preBookInfo.PRESCHOOL[1];
        let bookInsert = [preBookInfo]
            let cnt = await fetch('/api/bookInsert', {
            method: 'POST', mode: 'cors',
            body: JSON.stringify(bookInsert),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json());

        let param = `?userid=${preBookInfo.userid}`
        // preBook테이블에 데이터를 삭제하는 과정
        let del = await fetch('api/preBookDelete'+param)

        location.href = '/'
    };

    const cancelBook = async () => {
        let param = `?userid=${preBookInfo.userid}`
        let del = await fetch('api/preBookDelete'+param)
        console.log(del)

        location.href = '/'
    };
    return(
        <div className={'container mt-5'} >
            <h1>hi! 예약페이지!</h1>
            <p>{preBookInfo.userid}님의 예약정보!</p>

            <Table>
                <thead>
                <tr><th style={{background:'#F2F2F2'}}><p className={'mb-0'}>절</p></th><th><p className={'mb-0'}>{preBookInfo.T_NAME}</p></th></tr>
                </thead>
                <tbody>
                <tr><td style={{background:'#F2F2F2'}}><p className={'mb-0'}>프로그램 이름</p></td><td><p className={'mb-0'}>{preBookInfo.P_NAME}</p></td></tr>
                <tr><td style={{background:'#F2F2F2'}}><p className={'mb-0'}>분 류</p></td><td><p className={'mb-0'}>{preBookInfo.P_CLASS}</p></td></tr>
                <tr><td style={{background:'#F2F2F2'}}><p className={'mb-0'}>기 간</p></td><td><p className={'mb-0'}>{preBookInfo.B_STRDATE.substring(0, 10)} ~ {preBookInfo.B_ENDDATE.substring(0, 10)}</p></td></tr>
                <tr><td style={{background:'#F2F2F2'}}><p className={'mb-0'}>인 원</p></td><td><p className={'mb-0'}>성인 : {preBookInfo.ADULT[0]}명, 중고생 : {preBookInfo.MIDDLE[0]}명, 초등생 : {preBookInfo.YOUNG[0]}명, 미취학 : {preBookInfo.PRESCHOOL[0]}명</p></td></tr>
                <tr><td style={{background:'#F2F2F2'}}><p className={'mb-0'}>합 계</p></td><td><p className={'mb-0'}>{preBookInfo.ADULT[0]*preBookInfo.ADULT[1] + preBookInfo.MIDDLE[0]*preBookInfo.MIDDLE[1] + preBookInfo.YOUNG[0]*preBookInfo.YOUNG[1] + preBookInfo.PRESCHOOL[0]*preBookInfo.PRESCHOOL[1]}원</p></td></tr>
                </tbody>
            </Table>
            <Row>
                <Col className={'d-flex justify-content-end'}><Button variant="danger" onClick={cancelBook}>취소하기</Button></Col>
                <Col><Button variant="success" onClick={handleBook}>예약하기</Button></Col>
            </Row>
        </div>

        )
}