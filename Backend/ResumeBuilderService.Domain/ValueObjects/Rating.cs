namespace ResumeBuilderService.Domain.ValueObjects;

public class Feedback
{
    public double Rating { get; set; }
    public string Comment { get; set; }

    public Feedback(int rating, string comment)
    {
        Rating = rating;
        Comment = comment;
    }
}