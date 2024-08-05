## Stage 0: Build React app
#FROM node:18 AS frontend-build
#WORKDIR /app
#COPY bookstore-frontend/package*.json ./
#RUN npm install
#COPY bookstore-frontend/ ./
#RUN npm run build

# Stage 1: Build the .NET application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the project file and restore dependencies
COPY BookStoreClean2.csproj ./
RUN dotnet restore

# Copy the rest of the application source code
COPY . .

# Install EF Core tools (adjust the version as necessary)
#RUN dotnet tool install --global dotnet-ef

# Ensure that the dotnet tools are available on the PATH
ENV PATH="$PATH:/root/.dotnet/tools"

# Publish the application
RUN dotnet publish -c Release -o out

# Apply database migrations
#RUN dotnet ef database update

# Stage 2: Serve the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the published application from the build stage
COPY --from=build /app/out .

# Expose ports
EXPOSE 3000

# Set environment variables
ENV ASPNETCORE_URLS="http://*:3000"
ENV ASPNETCORE_ENVIRONMENT="Docker"

# Run the application
ENTRYPOINT ["dotnet", "BookStoreClean2.dll"]
