import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './Admin.css';
import axiosApi from '../../axiosApi';
import { IPages } from '../../type';
import Spinner from '../Spinner/Spinner';
import {useNavigate} from "react-router-dom";

const Admin = () => {
    const [page, setPage] = useState<IPages | null>(null);
    const [selectedPage, setSelectedPage] = useState('home');
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const fetchPage = useCallback(async () => {
        try {
            const pageResponse = await axiosApi.get<IPages | null>(`/pages/${selectedPage}.json`);
            setPage(pageResponse.data);
            setTitle(pageResponse.data?.title || '');
            setContent(pageResponse.data?.content || '');
        } finally {
            setLoading(false);
        }
    }, [selectedPage]);

    useEffect(() => {
        void fetchPage();
    }, [fetchPage]);

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedPage(event.target.value);
    };

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const refactorPage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert('Пожалуйста,  заполните все поля.');
            return;
        }

        try {
            setLoading(true);
            await axiosApi.put(`/pages/${selectedPage}.json`, { title, content });
            setLoading(false);
            alert('Изменение прошло успешно!');
            navigate(`/pages/${selectedPage}`);
        } catch (error) {
            console.error('Error saving page:', error);
            alert('Произошла ошибка при попытки изменения.');
        }
    };

    return (
        <div>
            {loading && <Spinner />}
            {!loading && page && (
                <>
                    <h1 className="admin-title">Edit Pages</h1>
                    <form className="admin-div" onSubmit={refactorPage}>
                        <select className="select-page" value={selectedPage} onChange={handleSelectChange}>
                            <option value="home">Home</option>
                            <option value="about">About</option>
                            <option value="contacts">Contacts</option>
                            <option value="division">Division</option>
                        </select>
                        <label className="label" htmlFor="Title">
                            Title:
                        </label>
                        <input className="admin-input" id="Title" value={title} onChange={handleTitleChange} />
                        <label className="label" htmlFor="Content">
                            Content:
                        </label>
                        <textarea className="admin-textarea" id="Content" value={content} onChange={handleContentChange} />
                        <button className="save-btn">
                            Save
                        </button>
                    </form>
                </>
            )}
            {!loading && !page && <h1>Not Found</h1>}
        </div>
    );
};

export default Admin;
