namespace ResumeBuilderService.Domain.ValueObjects;

public class Skills
{
    public Skills()
    {
        Items = new List<SkillItems>();
    }
    
    public string Title { get; set; }
    public List<SkillItems> Items { get; set; }
}

public class SkillItems
{
    public string Name { get; set; }
    public int Level { get; set; }
}