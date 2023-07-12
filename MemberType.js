import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import birthImage from '../img/birth.png';

const MemberType = () => {
    const [pickedYear, setPickedYear] = useState('');
    const [pickedMonth, setPickedMonth] = useState('');
    const [pickedDay, setPickedDay] = useState('');
    const [pickedMBTI, setPickedMBTI] = useState('');
    
    
    const YEAR = [];

    const nowYear = new Date().getFullYear();
        for (let i = 1980; i <= nowYear; i++) {
        YEAR.push(i);
    }

    // 월
    const MONTH = [];

    for (let i = 1; i <= 12; i++) {
        let m = String(i).padStart(2, '0');
        MONTH.push(m);
    }

    // 일
    const DAY = [];

    for (let i = 1; i <= 31; i++) {
        let d = String(i).padStart(2, '0');
        DAY.push(d);
    }

    const MBTI = [
        'ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP',
        'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
    ];

    const HOBBY = [
        '악기연주', '보드게임', '노래', '등산', '축구', '헬스', '맛집탐방', '공부',
        '자전거', '뮤지컬', '여행', '캠핑', '게임', '카페', '창업', '봉사활동'
    ];
    const [pickedHobby, setPickedHobby] = useState([]);

    const [clicked, setClicked] = useState(Array(HOBBY.length).fill(false));

    const hobbyClickHandler = (h, index) => {
        const clickedValue = clicked[index];    // index에 해당하는 버튼이 click인지 아닌지 안눌러져있으면 false 눌러있으면 true
        const updatedClicked = [...clicked];    // 맨처음엔 다 안눌러져있으니 모두 false이다.
        updatedClicked[index] = !clickedValue;
        setClicked(updatedClicked);
        
        if (updatedClicked[index]) {    // true(눌렸을 떄)
            setPickedHobby((prevPickedHobby) => {
                const selectedHobby = HOBBY[index];
                return [...prevPickedHobby, selectedHobby];
            });
        }   else {
            setPickedHobby((prevPickedHobby) => {
                return prevPickedHobby.filter(h => h !== HOBBY[index]);
            });
        }
    }
    
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInputChange = (event) => {  // 해당 선택된 파일을 selectedFile 안에 집어넣음
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const navigate = useNavigate();

    const pickedYearIsValid = pickedYear.trim() !== '';
    const pickedMonthIsValid = pickedMonth.trim() !== '';
    const pickedDayIsValid = pickedDay.trim() !== '';
    const pickedMBTIIsValid = pickedMBTI.trim() !== '';
    const pickedHobbyIsValid = pickedHobby.length !== 0;

    let formIsValid = false;
    
    // let formIsValid = false;
    if (pickedYearIsValid && pickedMonthIsValid && pickedDayIsValid
        && pickedMBTIIsValid && pickedHobbyIsValid) {
            formIsValid = true;
        }

    const submissionHandler = (e) => {
        e.preventDefault();
        if (formIsValid) {
            if (selectedFile) {
                console.log(selectedFile);
            }
            navigate('../../');
        }
    }

    return (
        <Wrapper>
            <FormWrapper>
                <form onSubmit={submissionHandler}>
                    <Label>
                        <img src={birthImage} className="rounded-circle" width={50} height={50} alt="kakao"/>
                        <p>생일 추가</p>
                    </Label>
                    <Input>
                        <select className="select" name="year" value={pickedYear} onChange={(e) => {setPickedYear(e.target.value)}}>
                            {YEAR.map(y => {
                                return <option key={y}>{y}년</option>;
                            })}
                        </select>
                        <select className="select" name="month" value={pickedMonth} onChange={(e) => {setPickedMonth(e.target.value)}}>
                            {MONTH.map(m => {
                                return <option key={m}>{m}월</option>;
                            })}
                        </select>
                        <select className="select" name="day" value={pickedDay} onChange={(e) => {setPickedDay(e.target.value)}}>
                            {DAY.map(d => {
                                return <option key={d}>{d}일</option>;
                            })}
                        </select>
                    </Input>
                    <Label>
                        <p>MBTI</p>
                    </Label>
                    <Input>
                        <select className="select" name="mbti" value={pickedMBTI} onChange={(e) => {setPickedMBTI(e.target.value)}}>
                            {MBTI.map(d => {
                                return <option key={d}>{d}</option>;
                            })}
                        </select>
                    </Input>
                    <Label>
                        <p>취미를 선택해주세요</p>
                    </Label>
                    <Input>
                        <ButtonGroup>
                        {HOBBY.map((h, index) => (
                        <button
                            className={clicked[index] ? "button click" : "button"}
                            key={h}
                            onClick={() => hobbyClickHandler(h, index)}
                        >
                            {h}
                        </button>
                        ))}
                        </ButtonGroup>
                    </Input>
                    <Label>
                        <p>프로필 사진을 등록해 주세요</p>
                    </Label>
                    <Input>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept="image/png, image/jpeg"
                            onChange={handleFileInputChange}
                        />
                    </Input>
                    <button 
                        className={formIsValid ? "button abled" : "button disabled"}
                        disabled={!formIsValid}
                        style={{ marginTop: "10rem" }}
                    >
                        가입완료
                    </button>
                </form>
            </FormWrapper>
        </Wrapper>
        );
}

export default MemberType;

const Wrapper = styled.div`
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    margin: 5rem auto;
    height: 140vh;
    width: 25rem;
`
const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    font-family: 'KyoboHandwriting';
    .select {
        margin-top: 0.5rem;
        margin-right: 0.5rem;
        border-radius: 8px;
        font-size: 10pt;
    }
    .button {
        background-color: #C5DFF8;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        margin-bottom: 0.5rem;
        font-size: 18pt;
    }
    .button.click {
        background-color: #00C4FF;
    }
    .button.abled {
        width: 15rem;
        background-color: #5A96E3;
    }
    .button.disabled {
        width: 15rem;
        background-color: #C5DFF8;
    }
`
const Label = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 30pt;
    margin-top: 2rem;
`
const Input = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-top: -1rem;
`
const ButtonGroup = styled.div`
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0.5rem;
    justify-items: center;
`