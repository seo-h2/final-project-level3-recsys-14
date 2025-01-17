import React, {useCallback, useEffect, useRef, useState} from 'react';
import Slick from 'react-slick';
import styled, {css} from 'styled-components';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Nav} from "react-bootstrap"

// import ProblemItemContatiner from '../container/problemItemContainer';
import RivalProblemContatiner from '../container/rivalProblemContainer';

import { height } from '@mui/system';

const Wrap = styled.div`
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    & > div + div{
        margin-top: 20px;
    }
    .slick-slide {
        display: inline-block;
    }
    &::before,
    &::after {
        background: linear-gradient(to right, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
        content: "";
        height: 100%;
        position: absolute;
        width: 100px;
        z-index: 20;
    }

    &::before {
        left: 0;
        top: 0;
    }

    &::after {
        right: 0;
        top: 0;
        transform: rotateZ(180deg);
    }
`;
const Inner = styled.div`
    position: relative;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    ${({property}) => {
        return (property === "mainInner") ? 
        (css`
        width : 100%;
        height : 100%;    
        `) : 
        (css`
        width : 100%;
        height : 30%;`);
    }}
    /* width: 100%;
    height: 100%; */
    .paging_items{
        filter: grayscale(1);
        &:hover {
            filter: none;
        }
    }
    .slick-current .paging_items {
        filter: none;
    }
    .slick-slide{
        padding: 1.2rem;
        margin: 10px 0px 50px;
    }
`;
const defaultItemStyle = css`
    width: 100%;
    text-align: center;

    .item{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 200px;
        vertical-align: top;
    }
`;
const MainSlickItems = styled.div`
    ${defaultItemStyle}
    
    height: 100%;
    border-radius: 1rem;
    transition: transform 0.3s ease-out;

    &:hover {
        transform: scale(1.1);
    }

    .item{
        max-width: 100%;
        padding: 20px;
        box-shadow: 0px 15px 35px -5px rgb(50 88 130 / 32%);
    }
`;

const defaultButtonStyle = css`
    position: absolute;
    z-index: 100;
    padding: 0;
    width: 30px;
    height: 30px;
    line-height: 1;
    border: none;
    border-radius: 50%;
    background: none;
    outline : none;
    transform: translateY(-50%);
    cursor: pointer;
    background: rgb(255 255 255 / 70%);
    box-shadow:
        1px 2px 8px -3px rgb(50 88 130 / 32%);
`;
const PrevButton = styled.button`
    ${defaultButtonStyle}
    ${({property}) => {
        return (property === "mainButton") ? 
        `
        top : 42%;    
        `
        : 
        `
        top : 80%;
        `;
    }}
    left: 0;
`;
const NextButton = styled.button`
    ${defaultButtonStyle}
    ${({property}) => {
        return (property === "mainButton") ? 
        `
        top : 42%;  
        `
        :
        `
        top : 0%;
        `;
    }}
    right: 0;
`;
const defaultIconStyle = css`
    color: #9c9c9c;;

    &:focus,
    &:hover{
        color: #666;
    }
`;
const PrevIcon = styled(ArrowBackIosIcon)`
    ${defaultIconStyle}
`;
const NextIcon = styled(ArrowForwardIosIcon)`
    ${defaultIconStyle}
`;

const ErrorBox = styled.div`
    position: relative;
    background: white;
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.04);

    min-height: 150px;

    margin: 0 auto;
    border-radius: 1rem;

    /* cursor: pointer; */
    transition: all 0.6s cubic-bezier(.25,.8,.25,1) 0.3s;
`;

const RivalItemSlide = (children : any) => {

    const mainSlickRef = useRef(null);

    const mainSettings = {
        infinite: children.rivalprobs.length > 3.5,
        centerMode: true,
        swipeToSlide: true,
        slidesToShow: 3.68,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    infinite: children.rivalprobs.length > 2.5,
                    slidesToShow: 2.34,
                    slidesToScroll: 1,
                }
              },
            {
              breakpoint: 800,
              settings: {
                infinite: children.rivalprobs.length > 1.5,                
                slidesToShow: 1.67,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 480,
              settings: {
                infinite: children.rivalprobs.length > 1,                
                autoplay: false,
                pauseOnHover: false,
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
        ]
    };

    const onClickPrev = useCallback((ref : any) => () => ref.current.slickPrev(), []);
    const onClickNext = useCallback((ref : any) => () => ref.current.slickNext(), []);

    return(
        <Wrap className='wrap'>
            <Inner property='mainInner'>
                <Slick
                    ref = {mainSlickRef}
                    {...mainSettings}
                    >
                        {children.validAPI ? children.rivalprobs.map((item : any, i : number)=>{
                            return(
                                <MainSlickItems key={i}>
                                    <RivalProblemContatiner key = {i} item = {item}/>
                                </MainSlickItems>
                            )
                        }) :
                            <ErrorBox>
                                사용자님의 추천을 도와줄 라이벌이 없거나, 현재 데이터가 업데이트 중입니다.
                            </ErrorBox>
                        }
                </Slick>
                <>
                        <PrevButton onClick={onClickPrev(mainSlickRef)} property='mainButton'>
                            <PrevIcon />
                        </PrevButton>
                        <NextButton onClick={onClickNext(mainSlickRef)} property='mainButton'>
                            <NextIcon />
                        </NextButton>
                </>
            </Inner>
        </Wrap>
    );
};

export default RivalItemSlide;