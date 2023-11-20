// Sample documents array
const documents = [];

// Function to calculate TF-IDF (you can use a library for more accurate calculations)
// Function to calculate term frequency (TF) in a document
function calculateTF(word, document) {
    const words = document.split(' ');
    const wordCount = words.length;
    let wordFrequency = 0;

    for (let w of words) {
        if (w === word) {
            wordFrequency++;
        }
    }

    return wordFrequency / wordCount;
}

// Function to calculate inverse document frequency (IDF) in all documents
function calculateIDF(word, documents) {
    const documentCount = documents.length;
    let wordInDocumentsCount = 0;

    for (let document of documents) {
        if (document.includes(word)) {
            wordInDocumentsCount++;
        }
    }

    return Math.log(documentCount / wordInDocumentsCount);
}

// Function to calculate TF-IDF
// function calculateTFIDFVectors(document) {
//     const words = document.split(' ');
//     let tfidfScores = {};

//     for (let word of words) {
//         const tf = calculateTF(word, document);
//         const idf = calculateIDF(word, documents);
//         tfidfScores[word] = tf * idf; // Store the TF-IDF score for each word
//     }

//     return tfidfScores;
// }
// Function to calculate TF-IDF
function calculateTFIDF(document) {
    const words = document.split(' ');
    let tfidfScore = 0;
    let tfidfScores = {};

    for (let word of words) {
        const tf = calculateTF(word, document);
        const idf = calculateIDF(word, documents);
        tfidfScore += tf * idf;
        tfidfScores[word] = tf * idf;
    }

    return [tfidfScore, tfidfScores];
}

// Function to update the document list
function updateDocumentList() {
    const documentsContainer = document.querySelector('.documents');
    documentsContainer.innerHTML = '';

    documents.forEach((doc, index) => {
        const [tfidfScore,vector] = calculateTFIDF(doc);
        const documentItem = document.createElement('div');
        documentItem.classList.add('document-item');
        documentItem.innerHTML = `
            <p>Document ${index + 1}</p>
            <p>TF-IDF Score: ${tfidfScore.toFixed(4)}</p>
            <button class="vector-btn">Show Vector</button>
            <div class="vector-content" style="display: none; overflow-wrap: break-word;"">${JSON.stringify(vector)}</div>
        `;
        documentsContainer.appendChild(documentItem);
    });

    // Add event listeners to the vector buttons
    const vectorButtons = document.querySelectorAll('.vector-btn');
    vectorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const vectorContent = btn.nextElementSibling;
            vectorContent.style.display = vectorContent.style.display === 'none' ? 'block' : 'none';
        });
    });
}

// Add document button click event
const addDocumentButton = document.getElementById('add-document');
addDocumentButton.addEventListener('click', () => {
    const documentInput = document.getElementById('document-input');
    const newDocument = documentInput.value.trim();

    if (newDocument !== '') {
        documents.push(newDocument);
        documentInput.value = '';
        updateDocumentList();
    }
});
