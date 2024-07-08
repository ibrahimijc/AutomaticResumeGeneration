using ResumeBuilderService.API.Constants;

namespace ResumeBuilderService.API.Utility;

public class StopWordsRemover
{
    private StopWordsConstants _stopWordsConstants;

    public StopWordsRemover()
    {
        _stopWordsConstants = new StopWordsConstants();
    }

    public string RemoveStopWords(string input)
    {
        // Split the input string into words
        string[] words = input.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

        // Remove stop words
        IEnumerable<string> filteredWords = words.Where(word => !_stopWordsConstants.StopWords.Contains(word.ToLower()));

        // Join the filtered words back into a string
        string result = string.Join(" ", filteredWords);

        return result;
    }
}
