const questions = [
    {
        text: "Wat is de hoofdstad van Frankrijk? A) Parijs, B) Londen, C) Berlijn, D) Madrid.",
        correct: "A"
    },
    {
        text: "Wat is de grootste planeet in ons zonnestelsel? A) Mars, B) Jupiter, C) Aarde, D) Saturnus.",
        correct: "B"
    },
    {
        text: "Welke taal wordt voornamelijk gesproken in Brazilië? A) Spaans, B) Engels, C) Portugees, D) Frans.",
        correct: "C"
    },
    {
        text: "Wie schilderde de Mona Lisa? A) Vincent van Gogh, B) Pablo Picasso, C) Leonardo da Vinci, D) Rembrandt.",
        correct: "C"
    },
    {
        text: "Wat is het chemische symbool voor water? A) O2, B) H2O, C) CO2, D) NaCl.",
        correct: "B"
    }
];

let currentQuestionIndex = 0;

document.getElementById('start').addEventListener('click', askQuestion);

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

function listen() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'nl-NL';
    recognition.start();
    return new Promise((resolve) => {
        recognition.onresult = (event) => resolve(event.results[0][0].transcript);
        recognition.onerror = () => resolve(null);
    });
}

async function askQuestion() {
    if (currentQuestionIndex >= questions.length) {
        document.getElementById('feedback').textContent = "Je hebt alle vragen beantwoord!";
        speak("Je hebt alle vragen beantwoord!");
        return;
    }

    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.text;
    speak(question.text);

    
    setTimeout(async () => {
        const userAnswer = await listen();

        // Normaliseer het antwoord om vergelijkingen te vereenvoudigen
        const normalizedAnswer = userAnswer ? userAnswer.trim().toLowerCase() : "";

        if (normalizedAnswer.includes(question.correct.toLowerCase())) {
            document.getElementById('feedback').textContent = "Juist!";
            speak("Juist!");
        } else {
            document.getElementById('feedback').textContent = `Fout, het juiste antwoord is ${question.correct}.`;
            speak(`Fout, het juiste antwoord is ${question.correct}.`);
        }

        // Ga naar de volgende vraag
        currentQuestionIndex++;
        setTimeout(askQuestion, 3000); 
    }, 5000); 
}
