using ExpensePilot.API.Data;
using ExpensePilot.API.Models;
using ExpensePilot.API.Services;
using ExpensePilot.API.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ---------------------------------------------------------
// Controllers
// ---------------------------------------------------------

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

// ---------------------------------------------------------
// Swagger
// ---------------------------------------------------------

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter JWT token like: Bearer {your token}"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// ---------------------------------------------------------
// Database
// ---------------------------------------------------------

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// ---------------------------------------------------------
// Identity
// ---------------------------------------------------------

builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 8;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// ---------------------------------------------------------
// Token Service
// ---------------------------------------------------------

builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<EmailService>();

// ---------------------------------------------------------
// Authentication - JWT
// ---------------------------------------------------------

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme =
        JwtBearerDefaults.AuthenticationScheme;

    options.DefaultChallengeScheme =
        JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = builder.Configuration["Jwt:Issuer"],

        ValidAudience = builder.Configuration["Jwt:Audience"],

        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
                builder.Configuration["Jwt:Key"]!
            )
        )
    };
});

// ---------------------------------------------------------
// AI Document Service
// ---------------------------------------------------------
builder.Services.AddHttpClient<IAiDocumentService, AiDocumentService>(client =>
{
    client.BaseAddress = new Uri(
        builder.Configuration["FastApi:BaseUrl"]!
    );
});

builder.Services.AddHttpClient<IUserDocumentService, UserDocumentService>(client =>
{
    client.BaseAddress = new Uri(
        builder.Configuration["FastApi:BaseUrl"]!
    );
});

// ---------------------------------------------------------
// CORS
// ---------------------------------------------------------

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ---------------------------------------------------------
// Build application
// ---------------------------------------------------------

var app = builder.Build();

// ---------------------------------------------------------
// Seed Roles / Admin
// ---------------------------------------------------------

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    await RoleSeeder.SeedRolesAndAdminAsync(services);
}

// ---------------------------------------------------------
// Development tools
// ---------------------------------------------------------

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ---------------------------------------------------------
// Middleware
// ---------------------------------------------------------

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthentication();

app.UseAuthorization();

// ---------------------------------------------------------
// Controllers
// ---------------------------------------------------------

app.MapControllers();

app.Run();