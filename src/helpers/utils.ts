export function extractJsonFromResponse(responseText: string): string {
    // First, try to match the content within ```json``` markers
    let jsonMatch = responseText.match(/```json([\s\S]*?)```/);

    if (jsonMatch) {
        const jsonString = jsonMatch[1].trim();
        const firstCurlyIndex = jsonString.indexOf('{');
        const lastCurlyIndex = jsonString.lastIndexOf('}');

        if (firstCurlyIndex !== -1 && lastCurlyIndex !== -1 && lastCurlyIndex > firstCurlyIndex) {
            return jsonString.substring(firstCurlyIndex, lastCurlyIndex + 1);
        }
    }

    // If no ```json``` markers found or valid JSON block not found, search for JSON without markers
    const firstCurlyIndex = responseText.indexOf('{');
    const lastCurlyIndex = responseText.lastIndexOf('}');

    if (firstCurlyIndex === -1 || lastCurlyIndex === -1 || lastCurlyIndex <= firstCurlyIndex) {
        throw new Error('No valid JSON content found in the response text.');
    }

    const jsonString = responseText.substring(firstCurlyIndex, lastCurlyIndex + 1).trim();

    // Optional: Validate if the extracted string is a valid JSON
    try {
        JSON.parse(jsonString);
    } catch {
        throw new Error('Extracted content is not valid JSON.');
    }

    return jsonString;
}