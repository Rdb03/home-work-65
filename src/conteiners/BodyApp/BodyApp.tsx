import React, {useCallback, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import './BodyApp.css';
import {IPages} from "../../type";
import axiosApi from "../../axiosApi";

const BodyApp = () => {
    const url = useLocation().pathname;

    const [page, setPages] = useState<IPages>();

    const fetchData = useCallback(async (url:  string) => {
        try {
            const pagesResponse = await axiosApi.get<IPages>(`${url}.json`);
            setPages(pagesResponse.data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }, []);

    useEffect(() => {
        void fetchData(url);
    }, [fetchData, url]);

    const renderPage = () => {
        if (page) {
            return (
                <div>
                    <h1>{page.title}</h1>
                    <p>{page.content}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Not Found!</h1>
                </div>
            );
        }
    };

    return (
        <div className='body-app'>
            {renderPage()}
        </div>
    );
};

export default BodyApp;