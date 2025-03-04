export const mockTasks = [
  {
    id: 1,
    title: "Complete React project - Final Version",
    dueDate: "2025-03-01",
    priority: "High",
    status: "In Progress",
    hasAttachment: true,
    details: "This task involves completing the final version of the React project, including polishing UI, fixing bugs, and finalizing features.",
    dateCreated: "2025-02-01",  // New property
    dateCompleted: null,  // New property (null means it hasn't been completed yet)
    subTasks: [
      {
        id: 1,
        title: "Create project structure",
        status: "Complete"
      },
      {
        id: 2,
        title: "Implement components",
        status: "In Progress"
      },
      {
        id: 3,
        title: "Write tests",
        status: "Not Started"
      }
    ]
  },
  {
    id: 2,
    title: "Write blog post on React Hooks and Functional Components",
    dueDate: "2025-03-05",
    priority: "Low",
    status: "Cancelled",
    hasAttachment: false,
    details: "The task is to write a detailed blog post explaining React Hooks and Functional Components with examples.",
    dateCreated: "2025-02-20",  // New property
    dateCompleted: "2025-02-25",
    subTasks: [
      {
        id: 1,
        title: "Research topic",
        status: "Complete"
      },
      {
        id: 2,
        title: "Write introduction",
        status: "In Progress"
      }
    ]
  },
  {
    id: 3,
    title: "Plan team meeting - Discuss project timeline and tasks",
    dueDate: "2025-02-28",
    priority: "Critical",
    status: "Complete",
    hasAttachment: true,
    details: "This task is for scheduling and organizing a team meeting to discuss the project timeline and task assignments.",
    dateCreated: "2025-02-10",
    dateCompleted: "2025-02-25",
    subTasks: [
      {
        id: 1,
        title: "Create meeting agenda",
        status: "Complete"
      },
      {
        id: 2,
        title: "Schedule meeting",
        status: "Complete"
      }
    ]
  },
  {
    id: 4,
    title: "Review and merge pull requests",
    dueDate: "2025-03-02",
    priority: "Low",
    status: "In Progress",
    hasAttachment: false,
    details: "This task is to review and merge the pull requests from team members to keep the repository up-to-date.",
    dateCreated: "2025-02-15",
    dateCompleted: null,
    subTasks: [
      {
        id: 1,
        title: "Review pull request from John",
        status: "In Progress"
      },
      {
        id: 2,
        title: "Merge pull request from Jane",
        status: "Not Started"
      }
    ]
  },
  {
    id: 5,
    title: "Prepare documentation for new features",
    dueDate: "2025-03-10",
    priority: "Low",
    status: "Not Started",
    hasAttachment: true,
    details: "The task involves creating documentation for the newly implemented features, focusing on the user guide and API references.",
    dateCreated: "2025-02-18",
    dateCompleted: null,
    subTasks: [
      {
        id: 1,
        title: "Outline documentation structure",
        status: "Not Started"
      },
      {
        id: 2,
        title: "Write introduction",
        status: "Not Started"
      }
    ]
  }
];
