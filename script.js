// Update your existing code here...

async function getAnswer() {
    // Display the progress bar and hide the answer container
    document.getElementById("progressBar").style.width = "0%";
    document.getElementById("answerContainer").style.display = "none";

    // Display random interview tip while waiting
    const interviewTips = [
        "Tip: Research the company before the interview.",
        "Tip: Practice your answers to common interview questions.",
        "Tip: Prepare questions to ask the interviewer.",
        // Add more tips as needed
    ];
    const tipText = document.getElementById("tipText");
    const tipContainer = document.getElementById("tipContainer");

    tipContainer.style.display = "block";

    // Simulate waiting time with a progress bar
    const progressBar = document.getElementById("progressBar");
    let progress = 0;

    const interval = setInterval(async () => {
        progress += Math.random() * 5;
        if (progress >= 100) {
            progress = 0;
            const randomIndex = Math.floor(Math.random() * interviewTips.length);
            tipText.textContent = interviewTips[randomIndex];

        } else {
            progressBar.style.width = `${progress}%`;
        }
    }, 500); // Interval for updating progress bar
    // Send the question to the backend Python server
    const question = document.getElementById("question").value;
    const response = await fetch('/ask_question', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'question': question })

    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    else {
        progressBar.style.width = "100%";
        clearInterval(interval);
    }

    const data = await response.json();
    const answer = data.answer;

    // Display the answer with syntax highlighting in the code editor-like box
    document.getElementById("answerText").innerHTML = syntaxHighlight(answer);
    document.getElementById("panswerText").style.display = "none";
    document.getElementById("answerContainer").style.display = "block";
}

// Function to apply syntax highlighting to the answer using JavaScript Prism library
function syntaxHighlight(json) {
    const highlighted = Prism.highlight(json, Prism.languages.javascript, 'json');
    return `<code>${highlighted}</code>`;
}
