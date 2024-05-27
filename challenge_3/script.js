const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const resultDiv = document.getElementById('result');
const webcam = new Webcam(webcamElement, 'user', canvasElement);
let classifier;

webcam.start()
    .then(result => {
        console.log("Webcam started");
    })
    .catch(err => {
        console.error(err);
    });

ml5.imageClassifier('MobileNet')
    .then(loadedModel => {
        classifier = loadedModel;
        console.log('Model Loaded!');
    });

document.getElementById('capture').addEventListener('click', () => {
    const picture = webcam.snap();
    classifyImage();
});

function classifyImage() {
    const image = document.getElementById('canvas');
    classifier.classify(image)
        .then(results => {
            displayResults(results);
        })
        .catch(err => {
            console.error(err);
            resultDiv.innerHTML = `Error: ${err}`;
        });
}

function displayResults(results) {
    resultDiv.innerHTML = '';
    results.forEach(result => {
        const label = result.label;
        const confidence = result.confidence;
        resultDiv.innerHTML += `
            <div class="result-item">
                <strong>Label:</strong> ${label}<br>
                <strong>Confidence:</strong> ${confidence.toFixed(2)}
            </div>
        `;
    });
}
