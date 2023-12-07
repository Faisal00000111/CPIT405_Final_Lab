import './Form.css';
import Result from './Result';
import { useState, useEffect } from 'react';

const Form = () => {
    const [title, setTitle] = useState('');
    const [URL, setURL] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) {
            alert('Please enter a title');
            return;
        }
        if (!URL) {
            alert('Please enter a URL');
            return;
        }
        const raw = JSON.stringify({
            title: title,
            URL: URL
        });

        const response = await fetch('http://localhost:3000/api/create.php', {
            method: 'POST',
            body: raw,
        });

        const data = await response.json();
        console.log(data);

        // Reset the text boxes after a successful submission
        setTitle('');
        setURL('');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        placeholder="type the URL title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>URL:</label>
                    <input
                        type="text"
                        placeholder="enter the URL"
                        value={URL}
                        onChange={(e) => setURL(e.target.value)}
                    />
                </div>

                <button type="submit">
                    Submit
                </button>
            </form>
        </>
    );
};

export default Form;