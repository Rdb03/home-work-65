import React, {useCallback, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import './BodyApp.css';
import {IPages} from "../../type";
import axiosApi from "../../axiosApi";
import Spinner from "../../components/Spinner/Spinner";

const BodyApp = () => {
    const url = useLocation().pathname;
    const [page, setPages] = useState<IPages>();
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async (url: string) => {
        try {
            setLoading(true);
            const pagesResponse = await axiosApi.get<IPages>(`${url}.json`);
            setPages(pagesResponse.data);
            setLoading(false);
        } catch (error) {
            console.log('Произошла ошибка при получении данных.', error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchData(url);
    }, [fetchData, url]);

    const renderPage = () => {
        if (page) {
            return (
                loading ? <Spinner/> : (
                    <div>
                        <h1>{page.title}</h1>
                        <p>{page.content}</p>
                    </div>
                )
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
            {loading   ? <Spinner/> : renderPage()}
        </div>
    );
};

export default BodyApp;