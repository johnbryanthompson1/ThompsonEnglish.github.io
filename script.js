const form = document.getElementById('chat-form');
const mytextInput = document.getElementById('mytext');
const responseTextarea = document.getElementById('response');

const API_KEY = 'sk-proj-aHMvQkxX8GC2vymuxpetT3BlbkFJ5c9gLjV8NKWTOnjdGPot';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mytext = mytextInput.value.trim();

    if (mytext) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: mytext }],
                    temperature: 1.0,
                    top_p: 0.7,
                    n: 1,
                    stream: false,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // Access the assistant's response correctly
                responseTextarea.value = data.choices[0].message.content;
            } else {
                responseTextarea.value = 'Error: Unable to process your request.';
            }
        } catch (error) {
            console.error(error);
            responseTextarea.value = 'Error: Unable to process your request.';
        }
    }
});
