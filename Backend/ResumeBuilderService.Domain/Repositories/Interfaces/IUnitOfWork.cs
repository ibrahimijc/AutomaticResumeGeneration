namespace ResumeBuilderService.Domain.Repositories.Interfaces;

public interface IUnitOfWork
{ 
    IBasicDetailsRepository BasicDetailsRepository { get; }
    IGeneratedResumeRepository GeneratedResumeRepository { get; }
}