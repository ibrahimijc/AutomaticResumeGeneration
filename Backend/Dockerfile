FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["ResumeBuilderService.API/ResumeBuilderService.API.csproj", "ResumeBuilderService.API/"]
RUN dotnet restore "ResumeBuilderService.API/ResumeBuilderService.API.csproj"
COPY . .
WORKDIR "/src/ResumeBuilderService.API"
RUN dotnet build "ResumeBuilderService.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ResumeBuilderService.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ResumeBuilderService.API.dll"]
