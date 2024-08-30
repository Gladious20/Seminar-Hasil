let model;

async function loadModel() {
    model = await mobilenet.load();
    console.log("Model loaded");
}

async function classifyImage() {
    const image = document.getElementById('selectedImage');
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
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `'Tingkat Pengenalan Mesin : ${category}: ${topPrediction.className} (${(topPrediction.probability * 100).toFixed(2)}%)`;
    const resultElements = document.getElementById('result2');
    resultElements.innerHTML = `'Tingkat Kerusakan: ${TingkatKerusakan}(${(100-topPrediction.probability * 100).toFixed(2)}%)`;
    document.getElementById('nextButton').style.display = 'inline-block';
}
function goToBackView() {
    window.location.href = 'back-index.html';
}
document.getElementById('imageUpload').addEventListener('change', function (e) {
    const reader = new FileReader();
    reader.onload = function () {
        const img = new Image();
        img.onload = function () {
            document.getElementById('selectedImage').src = img.src;
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});
