using MongoDB.Driver;
using ResumeBuilderService.Domain.Entities;
using ResumeBuilderService.Domain.Models;
using ResumeBuilderService.Domain.Repositories.Interfaces;

namespace ResumeBuilderService.Domain.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private IBasicDetailsRepository _basicDetailsRepository;
    private IGeneratedResumeRepository _generatedResumeRepository;
    
    private IMongoDatabase _database;

    public UnitOfWork(IMongoDatabase database)
    {
        _database = database;
    }
    
    public IBasicDetailsRepository BasicDetailsRepository
    {
        get
        {
            return _basicDetailsRepository ??= new BasicDetailsRepository(new Repository<BasicDetails>(_database));
        }
    }

    public IGeneratedResumeRepository GeneratedResumeRepository
    {
        get
        {
            return _generatedResumeRepository ??= new GeneratedResumeRepository(new Repository<GeneratedResume>(_database));
        }
    }
}