let model;

async function loadModel() {
    model = await mobilenet.load();
    console.log("Model loaded");
}

async function classifyImageBack() {
    const image = document.getElementById('selectedImageBack');
    await loadModel();
    const predictions = await model.classify(image);
    const topPrediction = predictions[0];
    const Tingkat = 100 - (topPrediction.probability * 100).toFixed(2);
    let category = '';
    let TingkatKerusakan = '';
    if (topPrediction.probability >= 0.7) {
        category = 'Good';
    } else {
        category = 'Bad';
    }
    if (Tingkat >= 50) {
        TingkatKerusakan = 'Tinggi';
    } else {
        TingkatKerusakan = 'Rendah';
    }
    const resultElement = document.getElementById('resultBack');
    resultElement.innerHTML = `Tingkat Pengenalan Mesin :${category}: ${topPrediction.className} (${(topPrediction.probability * 100).toFixed(2)}%)`;
    const resultElements = document.getElementById('resultback2');
    resultElements.innerHTML = `'Tingkat Kerusakan: ${TingkatKerusakan}(${(100-topPrediction.probability * 100).toFixed(2)}%)`;
}

document.getElementById('imageUploadBack').addEventListener('change', function (e) {
    const reader = new FileReader();
    reader.onload = function () {
        const img = new Image();
        img.onload = function () {
            document.getElementById('selectedImageBack').src = img.src;
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});
