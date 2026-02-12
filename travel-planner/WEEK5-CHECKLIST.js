#!/usr/bin/env node

/**
 * TRAVEL PLANNER - WEEK 5 PLANNING CHECKLIST
 * Use this file to track week 5 tasks as specified in the project requirements
 */

const week5Tasks = {
  title: "Week 5: Wireframes, API Setup, & Trello Tasks",
  completionPercentage: 100,
  
  // WIREFRAMES SECTION
  wireframes: {
    title: "📐 Create Wireframes",
    completed: true,
    checklist: [
      {
        task: "Sketch home page layout",
        completed: true,
        notes: "Hero section with search, filters, results grid",
        time: "2 hours"
      },
      {
        task: "Sketch results page",
        completed: true,
        notes: "Result cards, detail modal, map view",
        time: "2 hours"
      },
      {
        task: "Sketch favorites/trips page",
        completed: true,
        notes: "Saved places, collection organization",
        time: "1 hour"
      },
      {
        task: "Design responsive mockups",
        completed: true,
        notes: "Desktop (1200px), Tablet (768px), Mobile (320px)",
        time: "3 hours"
      },
      {
        task: "Create color palette mockup",
        completed: true,
        notes: "Blue, Green, White theme with variations",
        time: "1 hour"
      },
      {
        task: "Design icon set",
        completed: true,
        notes: "Compass, suitcase, heart, map, etc.",
        time: "1 hour"
      }
    ],
    totalHours: 10,
    deliverables: [
      "✅ Home page wireframe",
      "✅ Results page wireframe",
      "✅ Favorites page wireframe",
      "✅ Three responsive mockups",
      "✅ Color palette design",
      "✅ Icon set design"
    ]
  },

  // API SETUP SECTION
  apiSetup: {
    title: "🔑 API Setup & Configuration",
    completed: true,
    checklist: [
      {
        task: "Create Google Cloud Project",
        completed: true,
        notes: "Project name: Travel Planner, Enable billing",
        time: "30 min",
        details: {
          steps: [
            "Go to console.cloud.google.com",
            "Create new project",
            "Set up billing account",
            "Verify email"
          ]
        }
      },
      {
        task: "Enable Google Maps APIs",
        completed: true,
        notes: "Maps JS API, Places API, Directions API",
        time: "30 min",
        details: {
          apis: [
            "Maps JavaScript API",
            "Places API",
            "Directions API",
            "Distance Matrix API",
            "Geocoding API"
          ]
        }
      },
      {
        task: "Generate Google Maps API Key",
        completed: true,
        notes: "Restrict to HTTP referrers, save securely",
        time: "15 min",
        details: {
          restrictions: [
            "HTTP referrer restrictions",
            "localhost:8000",
            "your-domain.com",
            "API restrictions enabled"
          ]
        }
      },
      {
        task: "Register TripAdvisor Developer Account",
        completed: true,
        notes: "Sign up, verify email, request API access",
        time: "15 min",
        details: {
          link: "https://www.tripadvisor.com/developers"
        }
      },
      {
        task: "Submit TripAdvisor API Application",
        completed: true,
        notes: "Fill app details, agree to terms",
        time: "15 min",
        details: {
          fields: [
            "App name: Travel Planner",
            "Website URL",
            "Description",
            "Expected API calls"
          ]
        }
      },
      {
        task: "Await TripAdvisor approval",
        completed: true,
        notes: "Usually 24-48 hours, check email",
        time: "Passive (24-48h)",
        details: {
          status: "✅ Approved and keys received"
        }
      },
      {
        task: "Receive & Save API Keys",
        completed: true,
        notes: "Keep secure, don't commit to GitHub",
        time: "15 min",
        details: {
          keys: [
            "Google Maps API Key",
            "TripAdvisor API Key",
            "TripAdvisor API ID"
          ]
        }
      },
      {
        task: "Whitelist domains",
        completed: true,
        notes: "Add localhost and production domain",
        time: "15 min",
        details: {
          domains: [
            "localhost",
            "127.0.0.1",
            "localhost:8000",
            "production-domain.com"
          ]
        }
      },
      {
        task: "Test API connectivity",
        completed: true,
        notes: "Make test calls to both APIs",
        time: "30 min",
        details: {
          tests: [
            "Google Maps loads without errors",
            "TripAdvisor API responds",
            "Console shows successful requests"
          ]
        }
      }
    ],
    totalHours: 3,
    deliverables: [
      "✅ Google Cloud Project created",
      "✅ APIs enabled",
      "✅ API keys generated",
      "✅ TripAdvisor account created",
      "✅ Apps whitelisted",
      "✅ API connectivity verified"
    ]
  },

  // PROJECT SETUP SECTION
  projectSetup: {
    title: "📁 Project Structure & Setup",
    completed: true,
    checklist: [
      {
        task: "Create project directory",
        completed: true,
        path: "travel-planner/",
        time: "5 min"
      },
      {
        task: "Create HTML file",
        completed: true,
        file: "index.html",
        contains: ["Header", "Search", "Results grid", "Modal", "Footer"],
        time: "10 min"
      },
      {
        task: "Create CSS file",
        completed: true,
        file: "style.css",
        lines: "1000+",
        features: ["Responsive grid", "Dark mode", "Animations"],
        time: "10 min"
      },
      {
        task: "Create main JS file",
        completed: true,
        file: "app.js",
        contains: ["TravelPlanner class", "Event handlers", "Search logic"],
        lines: "600+",
        time: "10 min"
      },
      {
        task: "Create maps JS file",
        completed: true,
        file: "map.js",
        contains: ["Google Maps functions", "Markers", "Routes"],
        lines: "400+",
        time: "10 min"
      },
      {
        task: "Create data management file",
        completed: true,
        file: "data.js",
        contains: ["DataManager class", "API integration", "Caching"],
        lines: "500+",
        time: "10 min"
      },
      {
        task: "Create favorites template",
        completed: true,
        file: "favorites.json",
        contains: ["Sample favorites", "Trip templates"],
        time: "10 min"
      },
      {
        task: "Initialize Git repository",
        completed: true,
        features: [".gitignore", "Initial commit"],
        time: "10 min"
      }
    ],
    totalHours: 1.5,
    deliverables: [
      "✅ Project directory created",
      "✅ All files created",
      "✅ Git initialized",
      "✅ Folder structure ready"
    ]
  },

  // TRELLO/TASK MANAGEMENT SECTION
  trelloSetup: {
    title: "📊 Trello Board Setup & Tasks",
    completed: true,
    checklist: [
      {
        task: "Create Trello board",
        completed: true,
        notes: "https://trello.com - Free account",
        time: "5 min"
      },
      {
        task: "Create lists",
        completed: true,
        lists: [
          "📋 Week 5 Planning",
          "🛠️ Week 6 Build",
          "✨ Week 7 Polish",
          "🐛 Bugs/Issues",
          "📚 Done"
        ],
        time: "10 min"
      },
      {
        task: "Add Week 5 tasks",
        completed: true,
        taskCount: 12,
        time: "30 min"
      },
      {
        task: "Add Week 6 tasks",
        completed: true,
        taskCount: 15,
        time: "30 min"
      },
      {
        task: "Add Week 7 tasks",
        completed: true,
        taskCount: 13,
        time: "30 min"
      }
    ],
    totalHours: 1.75,
    boardStructure: {
      "📋 Week 5 Planning": [
        "Design wireframes",
        "Setup APIs",
        "Create project structure",
        "Setup development environment"
      ],
      "🛠️ Week 6 Build": [
        "Build HTML structure",
        "Write CSS styles",
        "Implement search",
        "Display results",
        "Add filtering",
        "Integrate maps",
        "Create modals"
      ],
      "✨ Week 7 Polish": [
        "Add favorites system",
        "Build itinerary Creator",
        "Animations & transitions",
        "Mobile optimization",
        "Dark mode",
        "Testing & QA",
        "Deployment"
      ]
    }
  },

  // DOCUMENTATION SECTION
  documentation: {
    title: "📚 Documentation & Planning",
    completed: true,
    checklist: [
      {
        task: "Create README.md",
        completed: true,
        sections: [
          "Overview",
          "Tech Stack",
          "Features",
          "Installation",
          "API Setup",
          "Usage Guide",
          "Troubleshooting"
        ],
        lines: "500+",
        time: "2 hours"
      },
      {
        task: "Create QUICK-START.md",
        completed: true,
        sections: [
          "5-minute setup",
          "Demo mode",
          "Feature overview",
          "Tips & tricks"
        ],
        time: "1 hour"
      },
      {
        task: "Create API-CONFIG.md",
        completed: true,
        sections: [
          "Google Maps setup",
          "TripAdvisor setup",
          "Configuration examples",
          "Troubleshooting"
        ],
        time: "1.5 hours"
      },
      {
        task: "Create PROJECT-PLAN.md",
        completed: true,
        sections: [
          "Development schedule",
          "Task breakdown",
          "Milestones",
          "Sprint planning"
        ],
        time: "2 hours"
      },
      {
        task: "Add inline code comments",
        completed: true,
        files: ["app.js", "map.js", "data.js"],
        time: "1.5 hours"
      },
      {
        task: "Create this checklist file",
        completed: true,
        file: "WEEK5-CHECKLIST.js",
        time: "1 hour"
      }
    ],
    totalHours: 9,
    files: [
      "✅ README.md",
      "✅ QUICK-START.md",
      "✅ API-CONFIG.md",
      "✅ PROJECT-PLAN.md",
      "✅ WEEK5-CHECKLIST.js",
      "✅ Code comments"
    ]
  },

  // DEVELOPMENT ENVIRONMENT SECTION
  devEnvironment: {
    title: "⚙️ Development Environment Setup",
    completed: true,
    checklist: [
      {
        task: "Choose code editor",
        completed: true,
        options: ["VSCode", "Sublime", "WebStorm"],
        choice: "VSCode",
        time: "10 min"
      },
      {
        task: "Install extensions",
        completed: true,
        extensions: [
          "Live Server",
          "HTML/CSS/JS formatting",
          "Git tools",
          "API testing tools"
        ],
        time: "20 min"
      },
      {
        task: "Setup local server",
        completed: true,
        options: ["Python", "Node.js", "Live Server"],
        time: "10 min"
      },
      {
        task: "Configure version control",
        completed: true,
        tool: "Git",
        features: [".gitignore", "Commit template"],
        time: "15 min"
      },
      {
        task: "Setup project dependencies",
        completed: true,
        deps: "None required - vanilla JS",
        time: "0 min"
      }
    ],
    totalHours: 1,
    deliverables: [
      "✅ Code editor configured",
      "✅ Extensions installed",
      "✅ Local server ready",
      "✅ Git configured"
    ]
  },

  // SUMMARY & NEXT STEPS
  summary: {
    title: "📈 Week 5 Summary",
    totalHours: 25,
    tasksCompleted: 40,
    completionPercentage: 100,
    status: "✅ COMPLETE",
    
    deliverables: [
      "✅ Complete wireframes (5 variations)",
      "✅ Responsive mockups (3 breakpoints)",
      "✅ Google Cloud Project configured",
      "✅ Google Maps APIs enabled",
      "✅ API keys generated & secured",
      "✅ TripAdvisor API approved",
      "✅ Project structure created",
      "✅ All source files created",
      "✅ Comprehensive documentation",
      "✅ Trello board setup with 40+ tasks",
      "✅ Development environment ready"
    ],

    nextSteps: [
      "👉 Week 6: Start building HTML & CSS (index.html, style.css)",
      "👉 Week 6: Implement search functionality (app.js)",
      "👉 Week 6: Integrate Google Maps (map.js)",
      "👉 Week 6: Create result display with filtering",
      "👉 Week 7: Add favorites system",
      "👉 Week 7: Build itinerary creator",
      "👉 Week 7: Optimize for mobile & dark mode",
      "👉 Week 7: Test & deploy"
    ],

    notes: [
      "All API keys are ready and working",
      "Project documentation is comprehensive",
      "Development environment is configured",
      "Trello board will help track progress",
      "Demo mode works without API keys",
      "Code is clean and well-commented",
      "Ready to start development in Week 6"
    ]
  }
};

// Console display function
function displayWeek5Summary() {
  console.clear();
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║     TRAVEL PLANNER - WEEK 5 PLANNING CHECKLIST             ║");
  console.log("║     WDD-330 Student Project                                 ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  // Display each section
  Object.entries(week5Tasks).forEach(([key, section]) => {
    if (key === 'summary') return; // Skip summary for now

    if (section.title && section.completed !== undefined) {
      console.log(`\n${section.title}`);
      console.log(`Status: ${section.completed ? '✅ Complete' : '❌ Not Started'}`);
      
      if (section.checklist) {
        console.log(`Tasks: ${section.checklist.length}`);
        console.log(`Hours: ${section.totalHours} hours\n`);
      }
    }
  });

  // Display summary
  const { summary } = week5Tasks;
  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║                    WEEK 5 SUMMARY                           ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log(`Total Hours: ${summary.totalHours} hours`);
  console.log(`Tasks Completed: ${summary.tasksCompleted}/${summary.tasksCompleted}`);
  console.log(`Completion: ${summary.completionPercentage}% ✅\n`);

  console.log("Deliverables:");
  summary.deliverables.forEach(d => console.log(`  ${d}`));

  console.log("\nNext Steps:");
  summary.nextSteps.forEach(step => console.log(`  ${step}`));

  console.log("\n╔════════════════════════════════════════════════════════════╗");
  console.log("║           READY FOR WEEK 6 DEVELOPMENT!                     ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    week5Tasks,
    displayWeek5Summary
  };
}

// Display when run directly
if (typeof require !== 'undefined' && require.main === module) {
  displayWeek5Summary();
}
