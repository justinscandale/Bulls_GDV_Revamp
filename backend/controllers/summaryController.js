const { GoogleGenerativeAI } = require("@google/generative-ai");

//controller to get all courses
const getSummary = async (req,res) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const prompt = `
        Analyze professor ${req.professorName}'s fairness based on:
        - Grading consistency
        Provide a balanced summary focused on fairness metrics.
        - Grading consistency:
        ${req.fairnessData}
    `;
        const result = await model.generateContent(prompt);
        const response = await result.response;

        res.status(200).json(response);

    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'Failed to get summary'});
    }
};

module.exports = {
    getSummary
}