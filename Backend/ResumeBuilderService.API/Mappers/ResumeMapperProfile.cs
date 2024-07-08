using ResumeBuilderService.API.Contracts.Request;
using ResumeBuilderService.Domain.Models;
using ResumeBuilderService.Domain.ValueObjects;
using Profile = AutoMapper.Profile;

namespace ResumeBuilderService.API.Mappers;

public class ResumeMapperProfile: Profile
{
    public ResumeMapperProfile()
    {
        CreateMap<CreateBasicDetailsRequestModel, BasicDetails>();
        CreateMap<BasicsRequestModel, Basics>();
        CreateMap<BasicDetails, ResumeModificationRequest>()
            .ForMember(x => x.ProfessionTitle, opt => opt.MapFrom(src => src.Basics.Label))
            .ForMember(x => x.CareerObjective, opt => opt.MapFrom(src => src.Basics.Objective))
            .ForMember(x => x.CareerSummary, opt => opt.MapFrom(src => src.Basics.Summary))
            .ForMember(x => x.Work, opt => opt.MapFrom(src => src.Work))
            .ForMember(x => x.Skills, opt => opt.MapFrom(src => src.Skills));
        
        CreateMap<Work, Experience>()
            .ForMember(x=>x.CompanyName, opt => opt.MapFrom(src => src.Name))
            .ForMember(x=>x.Position, opt => opt.MapFrom(src => src.Position))
            .ForMember(x=>x.Highlights, opt => opt.MapFrom(src => src.Highlights))
            .ForMember(x=>x.Summary, opt => opt.MapFrom(src => src.Summary));
        
        CreateMap<Experience, Work>()
            .ForMember(x=>x.Name, opt => opt.MapFrom(src => src.CompanyName))
            .ForMember(x=>x.Position, opt => opt.MapFrom(src => src.Position))
            .ForMember(x=>x.Highlights, opt => opt.MapFrom(src => src.Highlights))
            .ForMember(x=>x.Summary, opt => opt.MapFrom(src => src.Summary))
            .ForMember(x=>x.StartDate, opt => opt.Ignore())
            .ForMember(x=>x.IsWorkingHere, opt => opt.Ignore())
            .ForMember(x=>x.EndDate, opt => opt.Ignore())
            .ForMember(x=>x.Years, opt => opt.Ignore());
    }
}