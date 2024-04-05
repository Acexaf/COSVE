const fetch = require('node-fetch'); // Import the 'node-fetch' library to make HTTP requests
const { JSDOM } = require('jsdom'); // Import the 'jsdom' library to parse HTML

// Function to extract links from a given URL
async function extractLinks(url) {
    try {
        const response = await fetch(url); // Fetch the HTML content of the URL
        const html = await response.text(); // Extract the text content from the response
        const dom = new JSDOM(html); // Create a DOM object from the HTML content
        const links = Array.from(dom.window.document.querySelectorAll('a[href]')).map(link => link.href); // Extract all links from the DOM
        return links; // Return the array of links
    } catch (error) {
        console.error(`Error fetching links from ${url}:`, error); // Log any errors that occur during fetching
        throw new Error('Failed to fetch links.'); // Throw an error if fetching links fails
    }
}

// Function to analyze links for potential vulnerabilities
function analyzeLinks(links) {
    const vulnerableLinks = [];
    links.forEach(link => {
        // Example checks for vulnerabilities (expand based on your needs)
        if (link.toLowerCase().includes('admin')) {
            vulnerableLinks.push(link);
        } else if (link.toLowerCase().includes('phpmyadmin')) {
            vulnerableLinks.push(link);
        }
        // Add more checks here for other vulnerabilities (e.g., SQL injection, sensitive endpoints, etc.)
    });
    return vulnerableLinks; // Return the array of vulnerable links
}

// Export the serverless function
module.exports = async (req, res) => {
    try {
        const { url } = req.body; // Extract the URL from the request body
        if (!url) {
            return res.status(400).json({ message: 'URL not provided.' }); // Return a 400 error if URL is not provided
        }
        const allLinks = await extractLinks(url); // Extract all links from the provided URL
        const vulnerabilities = analyzeLinks(allLinks); // Analyze the links for potential vulnerabilities
        if (vulnerabilities.length > 0) {
            const message = 'Potential vulnerabilities found:\n' + vulnerabilities.join('\n'); // Create a message with the list of vulnerable links
            return res.st
